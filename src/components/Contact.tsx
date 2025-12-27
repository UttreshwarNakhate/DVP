import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Instagram, MessageCircle } from 'lucide-react';
import { supabase, Booking } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState<Booking>({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    event_date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('bookings').insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        event_date: '',
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-amber-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to capture your special moments? Let's start planning your perfect shoot
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Session</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Datta Ghallal"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="samratvideo@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="+91 7755946222"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service_type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Type *
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="newborn">Newborn Photography</option>
                    <option value="birthday">Birthday Shoot</option>
                    <option value="modeling">Modeling Portfolio</option>
                    <option value="indoor">Indoor Photography</option>
                    <option value="outdoor">Outdoor Photography</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="event_date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="event_date"
                    name="event_date"
                    required
                    value={formData.event_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 text-white py-4 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Booking Request</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your booking request has been sent. We'll contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Studio Address</h4>
                    <p className="text-gray-600">
                      Ambika Chowk, Canol Road, 
                      <br />
                      Gopan Comlax, Beed 431122
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 7755946222</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">samratvideo@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Contact</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/7755946222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://www.instagram.com/photographydreamvision?igsh=Z3N3ZGs3b2NuM3o0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all font-medium"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.249682234768!2d75.74677590627653!3d18.99770490326349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc52ac545882d21%3A0x38a17a63b0d09e23!2sAmbika%20Chowk%2C%20Beed%2C%20Maharashtra%20431122!5e0!3m2!1sen!2sin!4v1766830290719!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dream Vision Photography Studio Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}