// File: app/api/wilayas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

// Add new wilaya (Admin only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { name, deliveryPrice, agencyName } = await req.json();

    if (!name || !deliveryPrice || !agencyName) {
      return NextResponse.json(
        { error: 'Name, delivery price, and agency name are required' },
        { status: 400 }
      );
    }

    // Check if wilaya already exists
    const existingWilaya = await prisma.wilaya.findUnique({
      where: { name }
    });

    if (existingWilaya) {
      return NextResponse.json(
        { error: 'Wilaya with this name already exists' },
        { status: 409 }
      );
    }

    // Create wilaya
    const newWilaya = await prisma.wilaya.create({
      data: {
        name,
        deliveryPrice: parseFloat(deliveryPrice),
        agencyName
      }
    });    return NextResponse.json({
      message: `Wilaya ${newWilaya.name} created successfully with delivery price ${newWilaya.deliveryPrice.toLocaleString()} DA`,
      wilaya: newWilaya
    });
  } catch (error) {
    console.error('Create wilaya error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all wilayas
export async function GET(req: NextRequest) {
  try {
    const wilayas = await prisma.wilaya.findMany({
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ wilayas });
  } catch (error) {
    console.error('Error fetching wilayas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wilayas' },
      { status: 500 }
    );
  }
}
