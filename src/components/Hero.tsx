import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetQuote: () => void;
}

export default function Hero({ onGetQuote }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="text-cyan-400 text-sm font-semibold tracking-wide">Start Here</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="text-blue-500">Next-gen</span> digital<br />
            infrastructure for<br />
            visionary companies
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="text-sky-400 font-bold">Advanced</span> web systems engineered for performance, scale, and innovation
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={onGetQuote} className="group px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2">
              Get Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
