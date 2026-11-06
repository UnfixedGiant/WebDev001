-- CreateEnum
CREATE TYPE "NewsletterStatus" AS ENUM ('Draft', 'Schedule', 'Sent');

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "status" "NewsletterStatus" NOT NULL DEFAULT 'Draft',
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Newsletter" ADD CONSTRAINT "Newsletter_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
