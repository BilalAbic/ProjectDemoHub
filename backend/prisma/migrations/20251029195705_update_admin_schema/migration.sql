/*
  Warnings:

  - You are about to drop the column `password_hash` on the `admins` table. All the data in the column will be lost.
  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "password_hash",
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "role" VARCHAR(50) NOT NULL DEFAULT 'admin';
