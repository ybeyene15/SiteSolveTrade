import { useEffect, useState } from 'react'
import { CheckCircle, Sparkles, Home as HomeIcon } from 'lucide-react'
import { getUserAccessDetails, type UserAccess } from '../lib/access'
import { useAuth } from '../components/auth/AuthProvider'

export default function Dashboard() {
  const { user } = useAuth()
  const [accessDetails, setAccessDetails] = useState<UserAccess | null>(null)

  useEffect(() => {
    async function loadAccessDetails() {
      const details = await getUserAccessDetails()
      setAccessDetails(details)
    }
    loadAccessDetails()
  }, [])

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Access Granted
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Welcome to</span><br />
                <span className="text-cyan-400">Your Dashboard</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Thank you for your purchase! You now have full access to the application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Account Status</h2>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <span className="text-gray-500">Email:</span> <span className="text-white">{user?.email}</span>
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Access:</span> <span className="text-cyan-400 font-semibold">Active</span>
                    </p>
                    {accessDetails?.payment_date && (
                      <p className="text-gray-400">
                        <span className="text-gray-500">Member Since:</span>{' '}
                        <span className="text-white">
                          {new Date(accessDetails.payment_date).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <HomeIcon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Quick Access</h2>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Your website project is ready to begin! We'll be in touch shortly to start the development process.
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Payment Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">What Happens Next?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Initial Consultation</h4>
                    <p className="text-gray-400">
                      We'll reach out within 24 hours to discuss your vision, requirements, and design preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Design & Development</h4>
                    <p className="text-gray-400">
                      Our team will begin crafting your custom website, keeping you updated throughout the process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Review & Launch</h4>
                    <p className="text-gray-400">
                      You'll review the final product, we'll make any revisions, and then launch your new website!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
