-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePic" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "CompletedModule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quizScore" DOUBLE PRECISION,
    "quizPassed" BOOLEAN,

    CONSTRAINT "CompletedModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletedModule_userId_moduleId_key" ON "CompletedModule"("userId", "moduleId");

-- AddForeignKey
ALTER TABLE "CompletedModule" ADD CONSTRAINT "CompletedModule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedModule" ADD CONSTRAINT "CompletedModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
