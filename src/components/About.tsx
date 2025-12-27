import { Award, Camera, Heart, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Camera, value: '5000+', label: 'Events Captured' },
    { icon: Heart, value: '10000+', label: 'Happy Clients' },
    { icon: Award, value: '5+', label: 'Awards Won' },
    { icon: Users, value: '15+', label: 'Years Experience' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Dream Vision Photography"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-600/10 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-amber-600/10 rounded-2xl -z-10"></div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-amber-600">Dream Vision</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Dream Vision Photography was founded with a simple belief: every moment deserves to be
              captured beautifully. With over a decade of experience in the photography industry, we
              have perfected the art of storytelling through our lens.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our team of passionate photographers specializes in turning fleeting moments into
              timeless memories. Whether it's the joy of a wedding day, the innocence of a newborn,
              or the excitement of a milestone celebration, we approach each shoot with creativity,
              dedication, and attention to detail.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We don't just take photos—we create art. Our signature style blends cinematic
              composition with natural, candid moments, resulting in images that are both stunning
              and authentic. Featured in multiple photography magazines and honored with industry
              awards, we continue to push the boundaries of creative photography.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100 hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-8 h-8 text-amber-600 mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}