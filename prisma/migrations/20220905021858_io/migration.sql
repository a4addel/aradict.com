/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "joiningDate" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
