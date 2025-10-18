import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { checkUserAccess } from '../../lib/access'

interface PaymentGateProps {
  children: React.ReactNode
}

export function PaymentGate({ children }: PaymentGateProps) {
  const { user, loading: authLoading } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function verifyAccess() {
      if (authLoading) {
        return
      }

      if (!user) {
        navigate('/login', { state: { from: location } })
        return
      }

      setChecking(true)
      const access = await checkUserAccess()
      setHasAccess(access)
      setChecking(false)

      if (!access) {
        navigate('/pricing', { state: { from: location } })
      }
    }

    verifyAccess()
  }, [user, authLoading, navigate, location])

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!user || !hasAccess) {
    return null
  }

  return <>{children}</>
}
