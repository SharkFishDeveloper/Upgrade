/*
  Warnings:

  - You are about to drop the column `date` on the `Date` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dateId]` on the table `DateObject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskName` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `DateObject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Date" DROP COLUMN "date",
ADD COLUMN     "taskName" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DateObject" ADD COLUMN     "dateId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DateObject_dateId_key" ON "DateObject"("dateId");
