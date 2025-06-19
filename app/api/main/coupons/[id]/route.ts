// app/api/coupons/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

// Get coupon by ID (Admin only)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = params;

    const coupon = await prisma.coupon.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: { id: true, title: true, imageUrl: true, price: true }
            }
          }
        }
      }
    });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Get coupon error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update coupon (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = params;
    const {
      code,
      discount,
      isActive,
      expiresAt,
      productIds
    } = await req.json();

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
      include: { products: true }
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Check if coupon code already exists (excluding current coupon)
    if (code && code !== existingCoupon.code) {
      const duplicateCoupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase() }
      });

      if (duplicateCoupon) {
        return NextResponse.json(
          { error: 'Coupon code already exists' },
          { status: 400 }
        );
      }
    }

    // Validate discount percentage
    if (discount !== undefined && (discount < 0 || discount > 100)) {
      return NextResponse.json(
        { error: 'Discount must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Validate products if provided
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
      });

      if (products.length !== productIds.length) {
        return NextResponse.json(
          { error: 'One or more product IDs are invalid' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (code) updateData.code = code.toUpperCase();
    if (discount !== undefined) updateData.discount = parseInt(discount);
    if (isActive !== undefined) updateData.isActive = isActive;
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt) : null;

    // Update coupon with transaction to handle product associations
    const updatedCoupon = await prisma.$transaction(async (prisma) => {
      // Update basic coupon data
      const coupon = await prisma.coupon.update({
        where: { id },
        data: updateData
      });

      // Update product associations if provided
      if (productIds !== undefined) {
        // Delete existing associations
        await prisma.productCoupon.deleteMany({
          where: { couponId: id }
        });

        // Create new associations
        if (productIds.length > 0) {
          await prisma.productCoupon.createMany({
            data: productIds.map((productId: string) => ({
              couponId: id,
              productId
            }))
          });
        }
      }

            // Return updated coupon with associations
            return await prisma.coupon.findUnique({
              where: { id },
              include: {
                products: {
                  include: {
                    product: {
                      select: { id: true, title: true, imageUrl: true }
                    }
                  }
                }
              }
            });
          }); // Close prisma.$transaction
      
          return NextResponse.json({ coupon: updatedCoupon });
        } catch (error) {
          console.error('Update coupon error:', error);
          return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        }
      }