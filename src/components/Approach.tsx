import { Volume2, FileText, Gauge } from 'lucide-react';

const approaches = [
  {
    icon: Volume2,
    title: 'Creative designs',
    description: 'Innovative visual strategies that capture your brand\'s essence.'
  },
  {
    icon: FileText,
    title: 'Problem solving',
    description: 'Technical solutions that address your unique business challenges.'
  },
  {
    icon: Gauge,
    title: 'Digital performance',
    description: 'Websites engineered for speed, engagement, and measurable results.'
  }
];

export default function Approach() {
  return (
    <section id="approach" className="py-32 bg-gradient-to-b from-black to-cyan-950/10 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="text-cyan-400 text-sm font-semibold tracking-wide">Approach</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Digital excellence meets<br />
            creative problem solving
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We transform complex digital challenges into streamlined, powerful web experiences that connect and convert.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="group text-center"
            >
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <approach.icon className="w-10 h-10 text-white group-hover:text-cyan-400 transition-colors duration-300" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{approach.title}</h3>
              <p className="text-gray-400 leading-relaxed">{approach.description}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-16">
          <button
            onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Explore the Impact
          </button>
        </div>
      </div>
    </section>
  );
}
