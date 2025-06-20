/*
  Warnings:

  - You are about to drop the `product_coupons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_coupons" DROP CONSTRAINT "product_coupons_couponId_fkey";

-- DropForeignKey
ALTER TABLE "product_coupons" DROP CONSTRAINT "product_coupons_productId_fkey";

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_coupons";

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
