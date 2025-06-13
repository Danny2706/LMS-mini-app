import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/prisma"
import { parseForm } from "@/lib/parseForm"
import { Readable } from "stream"

export const dynamic = "force-dynamic"

function bufferToStream(buffer) {
  return Readable.from(buffer)
}

// Get a single course
export async function GET(req, context) {
  const params = await context.params
  const { id } = params

  try {
    const course = await prisma.course.findUnique({
      where: { id },
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
        certifications: true,
        createdBy: true,
        trainer: true,
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ course, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching course" + err, success: false },
      { status: 500 }
    )
  }
}

// Update a single course
export async function PUT(req, context) {
  const params = await context.params
  const { id } = params

  try {
    const { fields, files } = await parseForm(req)

    const { title, description, status, category, trainerId, userId } = fields

    const modules = JSON.parse(fields.modules || "[]")
    const thumbnailFile = files?.thumbnail

    let thumbnailPath = fields.thumbnail

    if (thumbnailFile) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "thumbnails" },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        bufferToStream(thumbnailFile.buffer).pipe(uploadStream)
      })

      thumbnailPath = uploadResult.secure_url
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail: thumbnailPath,
        status,
        category,
        trainerId,
      },
    })

    for (const mod of modules) {
      if (mod.id) {
        // Update existing module
        await prisma.module.update({
          where: { id: mod.id },
          data: {
            title: mod.title,
            description: mod.description,
            order: Number(mod.order),
            content: mod.content,
            contentType: mod.contentType,
            duration: parseInt(mod.duration),
            resources: Array.isArray(mod.resources)
              ? mod.resources
              : (mod.resources ?? "").split(",").map((r) => r.trim()),
          },
        })

        if (mod.quiz?.id) {
          // Update existing quiz
          await prisma.question.deleteMany({
            where: { quizId: mod.quiz.id },
          })

          await prisma.quiz.update({
            where: { id: mod.quiz.id },
            data: {
              title: mod.quiz.title,
              questions: {
                create: mod.quiz.questions.map((q) => ({
                  text: q.text,
                  options: q.options,
                  correct: q.correct,
                })),
              },
            },
          })
        } else if (mod.quiz?.title) {
          // Create quiz if new
          await prisma.quiz.create({
            data: {
              title: mod.quiz.title,
              moduleId: mod.id,
              trainerId,
              questions: {
                create: mod.quiz.questions.map((q) => ({
                  text: q.text,
                  options: q.options,
                  correct: q.correct,
                })),
              },
            },
          })
        }
      } else {
        // Create new module
        const createdModule = await prisma.module.create({
          data: {
            title: mod.title,
            description: mod.description,
            order: Number(mod.order),
            content: mod.content,
            contentType: mod.contentType,
            duration: parseInt(mod.duration),
            courseId: id,
            resources: Array.isArray(mod.resources)
              ? mod.resources
              : (mod.resources ?? "").split(",").map((r) => r.trim()),
          },
        })

        if (mod.quiz?.title) {
          await prisma.quiz.create({
            data: {
              title: mod.quiz.title,
              moduleId: createdModule.id,
              trainerId,
              questions: {
                create: mod.quiz.questions.map((q) => ({
                  text: q.text,
                  options: q.options,
                  correct: q.correct,
                })),
              },
            },
          })
        }
      }
    }

    await prisma.notification.create({
      data: {
        message: `Course "${title}" has been updated successfully!`,
        type: "SUCCESS",
        userId,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      updated: updatedCourse,
    })
  } catch (err) {
    console.error("Error updating course:", err)
    return NextResponse.json(
      { success: false, error: "Failed to update course" },
      { status: 500 }
    )
  }
}

// Delete a single course
export async function DELETE(req, context) {
  const { id } = context.params

  try {
    // Step 1: Delete quizzes and questions
    const modules = await prisma.module.findMany({ where: { courseId: id } })

    for (const mod of modules) {
      const quizzes = await prisma.quiz.findMany({
        where: { moduleId: mod.id },
      })

      for (const quiz of quizzes) {
        await prisma.question.deleteMany({ where: { quizId: quiz.id } })
      }

      await prisma.quiz.deleteMany({ where: { moduleId: mod.id } })
    }

    // Step 2: Delete modules
    await prisma.module.deleteMany({ where: { courseId: id } })

    // Step 3: Delete other relations
    await prisma.favorite.deleteMany({ where: { courseId: id } })
    await prisma.enrollment.deleteMany({ where: { courseId: id } })
    await prisma.certification.deleteMany({ where: { courseId: id } })
    await prisma.assessment.deleteMany({ where: { courseId: id } })

    // Step 4: Finally delete the course
    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (err) {
    console.error("Error deleting course:", err)
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    )
  }
}
