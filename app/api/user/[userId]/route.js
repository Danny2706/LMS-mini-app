import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { parseForm } from "@/lib/parseForm";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

function bufferToStream(buffer) {
  return Readable.from(buffer);
}

export async function PUT(request, context) {
  const params = await context.params;
  const { userId } = params;

  try {
    // Parse form data from fetch-style request
    const { fields, files } = await parseForm(request);

    const { name, email, gender } = fields;
    const file = files?.profilePic;

    if (!name || !gender) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let profilePicUrl = null;
    if (file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        bufferToStream(file.buffer).pipe(uploadStream);
      });

      profilePicUrl = result.secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        gender,
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        profilePic: true,
        role: true,
      },
    });

    console.log("Updated user:", updatedUser);
    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("[USER_UPDATE_ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
