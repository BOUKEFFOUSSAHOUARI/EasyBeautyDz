// app/api/coupons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

// Get all coupons (Admin only)
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    
    if (search) {
      where.code = { contains: search, mode: 'insensitive' };
    }

    const [coupons, total] = await Promise.all([
      prisma.coupon.findMany({
        where,
        include: {
          products: {
            include: {
              product: {
                select: { id: true, title: true, imageUrl: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.coupon.count({ where })
    ]);

    return NextResponse.json({
      coupons,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get coupons error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new coupon (Admin only)
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const {
      code,
      discount,
      isActive,
      expiresAt,
      productIds
    } = await req.json();

    // Validate required fields
    if (!code || discount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: code, discount' },
        { status: 400 }
      );
    }

    // Validate discount percentage
    if (discount < 0 || discount > 100) {
      return NextResponse.json(
        { error: 'Discount must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Check if coupon code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code }
    });

    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
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

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discount: parseInt(discount),
        isActive: isActive !== false,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        products: productIds && productIds.length > 0 ? {
          create: productIds.map((productId: string) => ({
            productId
          }))
        } : undefined
      },
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

    return NextResponse.json({
      message: 'Coupon created successfully',
      coupon
    }, { status: 201 });
  } catch (error) {
    console.error('Create coupon error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}