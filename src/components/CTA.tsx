interface CTAProps {
  onGetQuote: () => void;
}

export default function CTA({ onGetQuote }: CTAProps) {
  return (
    <section id="cta" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-black to-blue-950/30"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500 rounded-full blur-[200px] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to elevate your<br />
            digital presence
          </h2>

          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Let's discuss how we can transform your digital strategy and create a powerful online experience.
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={onGetQuote} className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
