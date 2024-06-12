-- AlterTable
ALTER TABLE `User` ADD COLUMN `statusAccount` ENUM('Inactive', 'Active', 'Deleted') NOT NULL DEFAULT 'Active';
