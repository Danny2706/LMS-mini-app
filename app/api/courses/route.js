import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { parseForm } from "@/lib/parseForm";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

function bufferToStream(buffer) {
  return Readable.from(buffer);
}

export async function POST(request) {
  try {
    const { fields, files } = await parseForm(request);

    console.log(fields, files);

    const { title, description, status, category, trainerId, userId } = fields;
    const modules = JSON.parse(fields.modules || "[]");
    const thumbnailFile = files?.thumbnail;

    let thumbnailPath = null;
    if (thumbnailFile) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "thumbnails" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        bufferToStream(thumbnailFile.buffer).pipe(uploadStream);
      });

      thumbnailPath = result.secure_url;
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail: thumbnailPath,
        status,
        category,
        trainerId,
        modules: {
          create: modules.map((module) => {
            const { quiz, ...moduleData } = module;
            return {
              ...moduleData,
              resources: module.resources
                ? module.resources.split(",").map((r) => r.trim())
                : [],
              quizzes: quiz?.title
                ? {
                    create: {
                      title: quiz.title,
                      trainerId,
                      questions: {
                        create: quiz.questions.map((question) => ({
                          text: question.text,
                          options: question.options,
                          correct: question.correct,
                        })),
                      },
                    },
                  }
                : undefined,
            };
          }),
        },
      },
      include: {
        modules: {
          include: {
            quizzes: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    await prisma.notification.create({
      data: {
        message: `Course "${course.title}" has been created successfully!`,
        type: "SUCCESS",
        userId,
      },
    });

    await prisma.notification.create({
      data: {
        message: `Course "${course.title}" has been created and assigned to you!`,
        type: "SUCCESS",
        userId: trainerId,
      },
    });

    return NextResponse.json({ course, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create course", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
        modules: {
          select: {
            duration: true,
            title: true,
          },
        },
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ courses, success: true }, { status: 200 });
  } catch (err) {
    console.error("Error fetching courses:", err);
    return NextResponse.json(
      { error: "Failed to fetch courses", success: false },
      { status: 500 }
    );
  }
}
