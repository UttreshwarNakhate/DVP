import { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    // { name: 'Pricing', href: '#pricing' },
    // { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-amber-600' : 'bg-white'}`}>
              <Camera className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-amber-600'}`} />
              {/* <img src="/img/logoImage.png" alt="Logo" className="w-14 h-14 rounded-full" /> */}
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Dream Vision
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                Photography
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-amber-600'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-amber-600 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-4 mx-4 rounded-lg overflow-hidden">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="px-6 py-3 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="mx-6 mt-3 bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}