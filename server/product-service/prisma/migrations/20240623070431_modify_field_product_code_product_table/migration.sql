/*
  Warnings:

  - Made the column `productCode` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `productCode` VARCHAR(191) NOT NULL;
