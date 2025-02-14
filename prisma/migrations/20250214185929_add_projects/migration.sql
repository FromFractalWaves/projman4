/*
  Warnings:

  - You are about to drop the `objectives` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "objectives";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'todo',
    "dueDate" TIMESTAMP(3),
    "priority" "priority" NOT NULL DEFAULT 'medium',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
