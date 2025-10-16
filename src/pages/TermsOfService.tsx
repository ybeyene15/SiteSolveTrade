export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                SiteSolve Terms of Service
              </h1>
              <p className="text-gray-400 text-lg">
                Effective Date: January 1, 2025
              </p>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Welcome to SiteSolve. By purchasing a website from us, you agree to the following terms and conditions. These terms are designed to protect both you (the client) and us (the creator), and to ensure a smooth, transparent experience.
              </p>

              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💻</span>
                    Scope of Service
                  </h2>
                  <div className="text-gray-300 space-y-3 leading-relaxed">
                    <p>
                      SiteSolve provides custom-built websites based on the specifications agreed upon at the time of purchase. Each site includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Multiple custom pages (Home, About, Contact)</li>
                      <li>Mobile-responsive design</li>
                      <li>Basic SEO setup</li>
                      <li>Contact form integration</li>
                      <li>One revision round</li>
                      <li>Domain connection (client must provide domain access)</li>
                    </ul>
                    <p>
                      Additional services (e.g., extra pages, e-commerce, copywriting) may be available for an additional fee.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💳</span>
                    Payment & Ownership
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>Full payment of $499.99 is required before work begins.</li>
                    <li>Once the website is delivered and approved, full ownership transfers to the client.</li>
                    <li>SiteSolve retains the right to showcase the project in our portfolio unless otherwise agreed.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛠️</span>
                    Revisions & Support
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>One round of revisions is included within 7 days of delivery.</li>
                    <li>Additional revisions or support beyond this window may incur extra charges.</li>
                    <li>Post-launch support is not included unless specified in writing.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌐</span>
                    Domain & Hosting
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>Clients are responsible for purchasing and maintaining their domain and hosting.</li>
                    <li>SiteSolve will assist with domain connection if access is provided.</li>
                    <li>We are not liable for issues related to third-party hosting or domain services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📦</span>
                    Delivery Timeline
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>Standard delivery is within 1-3 business days from payment and receipt of all required content.</li>
                    <li>Delays caused by missing content or client feedback may extend the timeline.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚫</span>
                    Cancellations & Refunds
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>Due to the nature of custom design work, all sales are final.</li>
                    <li>If a project is canceled before work begins, a partial refund may be considered at our discretion.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📜</span>
                    Legal & Liability
                  </h2>
                  <ul className="text-gray-300 space-y-3 leading-relaxed list-disc list-inside ml-4">
                    <li>SiteSolve is not responsible for content provided by the client (e.g., images, text, trademarks).</li>
                    <li>Clients must ensure all materials comply with copyright and privacy laws.</li>
                    <li>We are not liable for damages resulting from website use, downtime, or third-party integrations.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">✉️</span>
                    Communication
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    All project communication will be conducted via email or designated project channels. Timely responses are essential to meet delivery timelines.
                  </p>
                </section>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 mt-12">
                  <p className="text-cyan-400 font-semibold text-center leading-relaxed">
                    By purchasing a website from SiteSolve, you acknowledge that you've read, understood, and agreed to these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
