/*
  Warnings:

  - You are about to alter the column `created_at` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pedidos` MODIFY `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP;
