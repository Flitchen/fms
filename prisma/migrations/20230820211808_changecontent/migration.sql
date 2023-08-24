/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `file` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `file_name_key` ON `file`(`name`);
