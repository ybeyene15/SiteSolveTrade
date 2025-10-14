import { Search, GitBranch, Volume2, Monitor } from 'lucide-react';

const benefits = [
  {
    icon: Search,
    title: 'Increased engagement',
    description: 'Websites that keep visitors interested and exploring your content.'
  },
  {
    icon: GitBranch,
    title: 'Higher conversions',
    description: 'Strategic design that transforms visitors into committed customers.'
  },
  {
    icon: Volume2,
    title: 'Brand consistency',
    description: 'Digital experiences that reflect your unique brand identity.'
  },
  {
    icon: Monitor,
    title: 'Technical reliability',
    description: 'Robust websites that perform seamlessly across all devices and platforms.'
  }
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                    <benefit.icon className="w-7 h-7 text-white group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-8">
              <button
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Next Step
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Digital workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
