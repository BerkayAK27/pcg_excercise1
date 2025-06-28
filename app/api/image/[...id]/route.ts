import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(
  _: Request,
  { params }: { params: { id: string[] } }   // id ist Array!
) {
  const publicId = params.id.join('/');       // „folder/file“
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete', details: err },
      { status: 500 }
    );
  }
}
