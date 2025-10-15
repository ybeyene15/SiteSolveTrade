import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      const { data } = await supabase
        .from('services_content')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (data) {
        setServices(data);
      }
    };

    loadServices();
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Network;
    return Icon;
  };
  return (
    <section id="services" className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32 relative z-0">
            <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Services</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              <span className="text-cyan-400">Cutting-edge</span> web<br />
              systems built for scale
            </h2>

            <div className="flex gap-4 mt-12">
              <button
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-6 py-3 bg-transparent text-white rounded-lg hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
              >
                Contact
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          <div className="space-y-12 relative z-10">
            {services.map((service) => {
              const Icon = getIcon(service.icon_name);
              return (
                <div
                  key={service.id}
                  className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-500 transform hover:translate-x-2 relative"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
