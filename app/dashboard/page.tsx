'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';
import { toast } from 'sonner'; // ✅ Das ist alles, was du brauchst

type Img = { url: string; id: string };

export default function Dashboard() {
  const [images, setImages] = useState<Img[]>([]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const body = new FormData();
    body.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });

      if (!res.ok) {
        toast.error('Upload fehlgeschlagen.');
        return;
      }

      const data = await res.json();
      setImages((prev) => [...prev, { url: data.secure_url, id: data.public_id }]);

      toast.success('Bild erfolgreich hochgeladen!');
    } catch (error) {
      toast.error('Es gab ein Problem beim Hochladen.');
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/image/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        toast.error('Löschen fehlgeschlagen.');
        return;
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success('Bild gelöscht.');
    } catch {
      toast.error('Fehler beim Löschen.');
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Image Upload Dashboard</h1>

        {/* Upload Button */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
        >
          <UploadCloud className="w-5 h-5" />
          Upload Image
        </label>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        {/* Bildergalerie */}
        {images.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">No images uploaded yet.</p>
        ) : (
          <section className="flex flex-col items-center gap-6 mt-10">
            {images.map((img) => (
              <Card
                key={img.id}
                className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition"
              >
                <CardContent className="p-0">
                  <img
                    src={img.url}
                    alt="Uploaded"
                    className="w-sm h-64 object-scale-down rounded-xl"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300"
                    onClick={() => handleDelete(img.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
