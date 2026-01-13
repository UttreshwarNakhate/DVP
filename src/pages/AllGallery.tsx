import { useEffect, useState, useMemo } from 'react';
import { X } from 'lucide-react';
import type { GalleryImage } from '../types';
import weddingData from '../data/weddingData.json';
import babyBornData from '../data/babyBornData.json';
import birthdayData from '../data/birthdayData.json';
import modelingData from '../data/modelingData.json';
import indoorData from '../data/indoorData.json';
import outdoorData from '../data/outdoorData.json';
import servicesPhotosData from '../data/servicesPhotosData.json';

export default function AllGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setBrokenImages(prev => new Set(prev).add(imageId));
  };

  const categories = useMemo(() => [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'newborn', label: 'Newborn' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'modeling', label: 'Modeling' },
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' },
  ], []);

  useEffect(() => {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl && categories.find(cat => cat.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categories]);

  // Load images from all JSON data files
  const allGalleryImages: GalleryImage[] = useMemo(() => {
    const images: GalleryImage[] = [];
    
    // Add images from all category-specific JSON files and map to GalleryImage interface
    weddingData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    babyBornData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    birthdayData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    modelingData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    indoorData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    outdoorData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    servicesPhotosData.forEach((img) => {
      images.push({
        ...img,
        description: undefined,
        display_order: 999,
        is_featured: false,
        created_at: new Date().toISOString(),
      } as GalleryImage);
    });
    
    return images;
  }, []);

  useEffect(() => {
    setImages(allGalleryImages);
    setFilteredImages(allGalleryImages);
    setLoading(false);
  }, [allGalleryImages]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else if (selectedCategory === 'pre-wedding') {
      // Show no images for pre-wedding, only videos
      setFilteredImages([]);
    } else {
      const categoryImages = images.filter((img) => img.category === selectedCategory);
      setFilteredImages(categoryImages);
    }
  }, [selectedCategory, images]);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">Loading gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo <span className="text-amber-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of captured moments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.filter((image) => !brokenImages.has(image.id)).map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.thumbnail_url}
                alt={image.title}
                className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                onError={() => handleImageError(image.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Removed title and description on hover */}
              </div>
            </div>
          ))}
        </div>

        {filteredImages.filter((image) => !brokenImages.has(image.id)).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images in this category yet</p>
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="max-w-5xl max-h-[90vh]">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/80 mt-2">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
