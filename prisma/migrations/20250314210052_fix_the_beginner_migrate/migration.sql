/*
  Warnings:

  - You are about to alter the column `created_at` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `pedidos` MODIFY `created_at` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `items_pedidos` ADD CONSTRAINT `items_pedidos_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
