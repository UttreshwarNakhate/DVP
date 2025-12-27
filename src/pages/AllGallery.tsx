import { useEffect, useState } from 'react';
import type { GalleryImage } from '../lib/supabase';
import { weddingFilenames } from '../data/Data';

export default function AllGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const weddingImages: GalleryImage[] = weddingFilenames.map((file, i) => ({
      id: `wedding-${i}`,
      title: file.replace(/\.[^.]+$/, ''),
      image_url: `/Wedding_Photos/${file}`,
      thumbnail_url: `/Wedding_Photos/${file}`,
      category: 'wedding',
      created_at: new Date().toISOString(),
    } as GalleryImage));

    setImages(weddingImages);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">All Photos</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.thumbnail_url}
              alt={img.title}
              className="rounded-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
