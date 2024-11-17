/*
  Warnings:

  - You are about to drop the column `totalPoints` on the `SkillArea` table. All the data in the column will be lost.
  - You are about to drop the column `week` on the `SkillArea` table. All the data in the column will be lost.
  - Added the required column `dailyPoints` to the `SkillArea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SkillArea" DROP COLUMN "totalPoints",
DROP COLUMN "week",
ADD COLUMN     "dailyPoints" INTEGER NOT NULL,
ADD COLUMN     "days" INTEGER NOT NULL DEFAULT 0;
