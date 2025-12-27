import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { GalleryImage } from '../lib/supabase';
import { weddingFilenames } from '../data/Data';
import { preWeddingVideos } from '../data/preWeddingVideos';
import { useRef } from 'react';


export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const ALL_LIMIT = 45;
  const [showPreWeddingVideos, setShowPreWeddingVideos] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoKey, setVideoKey] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
const iframeRef = useRef<HTMLIFrameElement | null>(null);


const pauseVideo = () => {
  iframeRef.current?.contentWindow?.postMessage(
    JSON.stringify({
      event: 'command',
      func: 'pauseVideo',
      args: [],
    }),
    '*'
  );
};



  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'newborn', label: 'Newborn' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'modeling', label: 'Modeling' },
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' },
  ];



  // Load only local images (modeling + wedding) — no Supabase
  useEffect(() => {
    setImages([...modelingImages, ...weddingImages]);
    setFilteredImages([...modelingImages, ...weddingImages]);
    setLoading(false);
  }, []);



  const weddingImages: GalleryImage[] = weddingFilenames.map((file, i) => {
    const lower = file.toLowerCase();
    let category = 'wedding';
    if (lower.includes('pre') || lower.includes('pre-wedding') || lower.includes('prew')) {
      category = 'pre-wedding';
    } else if (lower.includes('baby') || lower.includes('born') || lower.includes('newborn')) {
      category = 'newborn';
    } else if (lower.includes('birthday') || lower.includes('bday')) {
      category = 'birthday';
    }

    return {
      id: `wedding-${i}-${file}`,
      title: file.replace(/\.[^.]+$/, ''),
      image_url: `/Wedding_Photos/${file}`,
      thumbnail_url: `/Wedding_Photos/${file}`,
      category,
      description: undefined,
      display_order: 999,
      is_featured: false,
      created_at: new Date().toISOString(),
    } as GalleryImage;
  });
  const modelingFilenames = [
    '1F2A8259.JPG',
    '1F2A8268.JPG',
    '1F2A8271.JPG',
    '1F2A8278.JPG',
    '1F2A8285.JPG',
    '1F2A8307.JPG',
    '1F2A8324.JPG',
    '1F2A8328.JPG',
    '1F2A8337.JPG',
    '1F2A8705.JPG',
    '1F2A8709.JPG',
    '1F2A8710.JPG',
    '1F2A8720.JPG',
    '1F2A8722.JPG',
  ];

  const modelingImages: GalleryImage[] = modelingFilenames.map((file, i) => ({
    id: `modeling-${i}-${file}`,
    title: file.replace(/\.[^.]+$/, ''),
    image_url: `/Modeling_Photos/${file}`,
    thumbnail_url: `/Modeling_Photos/${file}`,
    category: 'modeling',
    description: undefined,
    display_order: 999,
    is_featured: false,
    created_at: new Date().toISOString(),
  }));

  useEffect(() => {
    if (selectedCategory === 'all') {
      const allImages = [...images, ...weddingImages];
      setFilteredImages(allImages.slice(15, ALL_LIMIT)); // 👈 only 25;
    } else if (selectedCategory === 'modeling') {
      const supabaseModeling = images.filter((img) => img.category === 'modeling');
      setFilteredImages([...supabaseModeling, ...modelingImages]);
    } else if (
      selectedCategory === 'wedding' ||
      selectedCategory === 'pre-wedding' ||
      selectedCategory === 'newborn' ||
      selectedCategory === 'birthday'
    ) {
      const supabaseMatch = images.filter((img) => img.category === selectedCategory);
      const localMatch = weddingImages.filter((img) => img.category === selectedCategory);
      const modelingLocalMatch = modelingImages.filter((img) => img.category === selectedCategory);
      setFilteredImages([...supabaseMatch, ...localMatch, ...modelingLocalMatch]);
    } else {
      setFilteredImages(images.filter((img) => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);


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
                if (selectedCategory === 'pre-wedding' && category.id !== 'pre-wedding') {
    pauseVideo(); // 👈 PAUSE instead of stop
  }

                setSelectedCategory(category.id);

                if (category.id === 'pre-wedding') {
                  setShowPreWeddingVideos(true);
                  setVideoKey((k) => k + 1); // restart videos
                  setCurrentVideo(0);
                } else {
                  setShowPreWeddingVideos(false); // stop videos
                  setIsMuted(false);
                }
              }}

              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                ? 'bg-amber-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-white/80 text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && selectedCategory !== 'pre-wedding' && (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">No images in this category yet</p>
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
              <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-white/80 mt-2">{selectedImage.description}</p>
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
  src={`${preWeddingVideos[currentVideo]}?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}`}
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