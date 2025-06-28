import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // oder: req.nextUrl.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(id);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
