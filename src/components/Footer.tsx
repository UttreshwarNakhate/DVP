import { Camera, Instagram, Phone, Mail, MapPin, Facebook, Twitter, Code, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-amber-600">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dream Vision</h3>
                <p className="text-sm text-gray-400">Photography</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Capturing your beautiful moments forever with elegance and artistry.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(`#${link.toLowerCase()}`)}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Wedding Photography</li>
              <li>Pre-Wedding Shoots</li>
              <li>Newborn Photography</li>
              <li>Birthday Shoots</li>
              <li>Modeling Portfolio</li>
              <li>Indoor & Outdoor</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Ambika Chowk, Canol Road, Gopan Comlax, Beed 431122</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>+91 7755946222</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>samratvideo@gmail.com</span>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/photographydreamvision?igsh=Z3N3ZGs3b2NuM3o0"
                className="bg-gray-800 p-2 rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1BuVCBjtMA/"
                className="bg-gray-800 p-2 rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
       
      

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Dream Vision Photography. All rights reserved. Capturing moments,
            creating memories.
          </p>
        </div>
        
      </div>
       {/* Bottom Section: Copyright + Developer Credit */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Dream Vision Photography. All rights reserved.
          </p> */}

          {/* DEVELOPER CREDIT SECTION */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 ml-2">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" /> by
            </span>
            <a 
              href="https://www.instagram.com/uttreshwar_nakhate?igsh=bnRwNjl1dzM2Zmpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 font-medium hover:text-white transition-colors flex items-center gap-1"
            >
              <Code className="w-4 h-4" />
              @UNakhate
              <Code className="w-4 h-4" />
            </a>
          </div>
        </div>
    </footer>
  );
}