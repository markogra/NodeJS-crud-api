/*
  Warnings:

  - You are about to drop the column `productID` on the `Update` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productID_fkey";

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "productID",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
