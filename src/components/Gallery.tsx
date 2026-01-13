import { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import type { GalleryImage } from "../types";
import { preWeddingVideos } from "../data/preWeddingVideos";
import { useRef } from "react";
import weddingData from "../data/weddingData.json";
import babyBornData from "../data/babyBornData.json";
import birthdayData from "../data/birthdayData.json";
import modelingData from "../data/modelingData.json";
import indoorData from "../data/indoorData.json";
import outdoorData from "../data/outdoorData.json";
import servicesPhotosData from "../data/servicesPhotosData.json";

export default function Gallery() {
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const [showPreWeddingVideos, setShowPreWeddingVideos] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoKey, setVideoKey] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleImageError = (imageId: string) => {
    setBrokenImages((prev) => new Set(prev).add(imageId));
  };


  console.log("weddingData Images:", weddingData);

  const pauseVideo = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: [],
      }),
      "*"
    );
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Wedding" },
    { id: "pre-wedding", label: "Pre-Wedding" },
    { id: "newborn", label: "Newborn" },
    { id: "birthday", label: "Birthday" },
    { id: "modeling", label: "Modeling" },
    { id: "indoor", label: "Indoor" },
    { id: "outdoor", label: "Outdoor" },
  ];

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

  // Load images from JSON data
  useEffect(() => {
    setFilteredImages(allGalleryImages);
    setLoading(false);
  }, [allGalleryImages]);

  useEffect(() => {
    const IMAGES_LIMIT = 25;
    if (selectedCategory === "all") {
      setFilteredImages(allGalleryImages.slice(0, IMAGES_LIMIT));
    } else if (selectedCategory === "pre-wedding") {
      // Show no images for pre-wedding, only videos
      setFilteredImages([]);
    } else {
      const categoryImages = allGalleryImages.filter(
        (img: GalleryImage) => img.category === selectedCategory
      );
      setFilteredImages(categoryImages.slice(0, IMAGES_LIMIT));
    }
  }, [selectedCategory, allGalleryImages]);

  if (loading) {
    return (
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our stunning collection of captured moments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              // onClick={() => setSelectedCategory(category.id)}
              onClick={() => {
                if (
                  selectedCategory === "pre-wedding" &&
                  category.id !== "pre-wedding"
                ) {
                  pauseVideo(); // 👈 PAUSE instead of stop
                }

                setSelectedCategory(category.id);

                if (category.id === "pre-wedding") {
                  setShowPreWeddingVideos(true);
                  setVideoKey((k) => k + 1); // restart videos
                  setCurrentVideo(0);
                } else {
                  setShowPreWeddingVideos(false); // stop videos
                  setIsMuted(false);
                }
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-amber-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages
            .filter((image) => !brokenImages.has(image.id))
            .map((image, index) => (
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

        {filteredImages.filter((image) => !brokenImages.has(image.id))
          .length === 0 &&
          selectedCategory !== "pre-wedding" && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No images in this category yet
              </p>
            </div>
          )}

        {filteredImages.filter((image) => !brokenImages.has(image.id)).length >
          0 && (
          <div className="text-center mt-12">
            <a
              href={`/gallery/all?category=${selectedCategory}`}
              className="inline-block px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              See More
            </a>
          </div>
        )}
      </div>

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
              <h3 className="text-white text-xl font-semibold">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-white/80 mt-2">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showPreWeddingVideos && (
        <div className="mt-16 max-w-5xl mx-auto">
          {/* Controls */}
          <div className="flex space-between space-x-4 items-center mb-4">
            <button
              onClick={() =>
                setCurrentVideo((v) =>
                  v === 0 ? preWeddingVideos.length - 1 : v - 1
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              ◀
            </button>

            {/* <button
        onClick={() => setIsMuted(!isMuted)}
        className="px-4 py-2 bg-amber-600 text-white rounded-full"
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button> */}

            <button
              onClick={() =>
                setCurrentVideo((v) =>
                  v === preWeddingVideos.length - 1 ? 0 : v + 1
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              ▶
            </button>
          </div>

          {/* Video */}
          <div
            key={`${videoKey}-${currentVideo}`}
            className="aspect-video rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              ref={iframeRef}
              src={`${
                preWeddingVideos[currentVideo]
              }?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* {selectedCategory === 'all' && (
  <div className="text-center mt-12">
    <a
      href="/gallery/all"
      className="inline-block px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition"
    >
      Show More
    </a>
  </div>
)} */}
    </section>
  );
}
