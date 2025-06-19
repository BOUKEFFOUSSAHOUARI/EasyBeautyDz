// File: app/api/wilayas/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

// Update wilaya (Admin only)
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    // Get data from request and params
    const params = await Promise.resolve(context.params);
    const [formData, wilayaId] = await Promise.all([
      req.json(),
      Promise.resolve(params.id)
    ]);
    const { name, deliveryPrice, agencyName } = formData;    // Check if wilaya exists
    const existingWilaya = await prisma.wilaya.findUnique({
      where: { id: wilayaId }
    });

    if (!existingWilaya) {
      return NextResponse.json(
        { error: 'Wilaya not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (deliveryPrice) updateData.deliveryPrice = parseFloat(deliveryPrice);
    if (agencyName) updateData.agencyName = agencyName;

    // Update wilaya
    const updatedWilaya = await prisma.wilaya.update({
      where: { id: wilayaId },
      data: updateData
    });    return NextResponse.json({
      message: `Wilaya ${updatedWilaya.name} updated successfully with new delivery price ${updatedWilaya.deliveryPrice.toLocaleString()} DA`,
      wilaya: updatedWilaya
    });
  } catch (error) {
    console.error('Update wilaya error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete wilaya (Admin only)
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const currentUser = await getUserFromToken(req);
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    // Get and await the params
    const params = await Promise.resolve(context.params);
    const wilayaId = await Promise.resolve(params.id);

    // Check if wilaya exists
    const existingWilaya = await prisma.wilaya.findUnique({
      where: { id: wilayaId }
    });

    if (!existingWilaya) {
      return NextResponse.json(
        { error: 'Wilaya not found' },
        { status: 404 }
      );
    }    // Delete wilaya
    const deletedWilaya = await prisma.wilaya.delete({
      where: { id: wilayaId }
    });

    return NextResponse.json({
      message: `Wilaya ${deletedWilaya.name} deleted successfully`
    });
  } catch (error) {
    console.error('Delete wilaya error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 