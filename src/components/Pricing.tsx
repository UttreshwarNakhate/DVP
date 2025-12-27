import { useEffect, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { supabase, PricingPlan } from '../lib/supabase';

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading pricing:', error);
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
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading pricing...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your special moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.is_popular ? 'ring-4 ring-amber-500 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.is_popular && (
                <div className="absolute top-0 right-0 bg-amber-600 text-white px-4 py-1 text-sm font-semibold flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-amber-600">{plan.price}</span>
                </div>

                <div className="space-y-2 mb-6 text-gray-600">
                  <p className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>{plan.duration}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>{plan.photos_count}</span>
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.is_popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12 text-lg">
          All packages can be customized to fit your specific needs.{' '}
          <button
            onClick={scrollToContact}
            className="text-amber-600 font-semibold hover:text-amber-700"
          >
            Contact us
          </button>{' '}
          for a personalized quote.
        </p>
      </div>
    </section>
  );
}