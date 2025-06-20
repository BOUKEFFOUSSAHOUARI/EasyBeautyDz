/*
  Warnings:

  - You are about to drop the column `productId` on the `coupons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_productId_fkey";

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "product_coupons" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,

    CONSTRAINT "product_coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_coupons_productId_couponId_key" ON "product_coupons"("productId", "couponId");

-- AddForeignKey
ALTER TABLE "product_coupons" ADD CONSTRAINT "product_coupons_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_coupons" ADD CONSTRAINT "product_coupons_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
