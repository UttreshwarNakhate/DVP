import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData, Testimonial } from '../data/testimonialsData';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      // Use local testimonials data instead of Supabase
      const sortedTestimonials = testimonialsData
        .sort((a, b) => a.display_order - b.display_order);
      
      setTestimonials(sortedTestimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client <span className="text-amber-600">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-2xl p-12 md:p-16">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-amber-200" />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                {currentTestimonial.client_photo && (
                  <img
                    src={currentTestimonial.client_photo}
                    alt={currentTestimonial.client_name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < currentTestimonial.rating
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic leading-relaxed">
                "{currentTestimonial.feedback}"
              </p>

              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900">
                  {currentTestimonial.client_name}
                </h4>
                <p className="text-gray-600">{currentTestimonial.service_type}</p>
              </div>
            </div>

            {testimonials.length > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-12">
                <button
                  onClick={prevTestimonial}
                  className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-8 bg-amber-600' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{testimonial.feedback}</p>
                <div className="flex items-center space-x-3">
                  {testimonial.client_photo && (
                    <img
                      src={testimonial.client_photo}
                      alt={testimonial.client_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {testimonial.client_name}
                    </p>
                    <p className="text-gray-600 text-xs">{testimonial.service_type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}