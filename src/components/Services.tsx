import { useEffect, useState } from 'react';
import { Heart, Baby, Cake, Camera, Home, Sunrise, ArrowRight } from 'lucide-react';
import { servicesData, Service } from '../data/servicesData';

const iconMap: { [key: string]: typeof Heart } = {
  Heart,
  Baby,
  Cake,
  Camera,
  Home,
  Sunrise,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      // Use local services data instead of Supabase
      const activeServices = servicesData
        .filter(service => service.is_active)
        .sort((a, b) => a.display_order - b.display_order);
      
      setServices(activeServices);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate moments to grand celebrations, we capture every precious memory
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-amber-600 p-3 rounded-full mb-2">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.short_description}</p>

                  <button
                    onClick={scrollToContact}
                    className="group/btn flex items-center space-x-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}