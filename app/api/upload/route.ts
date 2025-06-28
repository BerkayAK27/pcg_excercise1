import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const upload = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'your-folder-name' },
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result);
      }
    );
    stream.pipe(uploadStream);
  });

  // 👇 WICHTIG: secure_url UND public_id zurückgeben
  return NextResponse.json({
    secure_url: (upload as any).secure_url,
    public_id: (upload as any).public_id,
  });
}
