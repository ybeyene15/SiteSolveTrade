import React, { useEffect, useState } from 'react'
import { getUserSubscription } from '../../lib/stripe'
import { getProductByPriceId } from '../../stripe-config'
import { useAuth } from '../auth/AuthProvider'

export function SubscriptionStatus() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadSubscription()
    }
  }, [user])

  const loadSubscription = async () => {
    try {
      const data = await getUserSubscription()
      setSubscription(data)
    } catch (error) {
      console.error('Error loading subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user || loading) {
    return null
  }

  if (!subscription || !subscription.price_id) {
    return null
  }

  const product = getProductByPriceId(subscription.price_id)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-800">
            Active Plan: {product?.name || 'Unknown Plan'}
          </p>
          {subscription.subscription_status && (
            <p className="text-xs text-blue-600 capitalize">
              Status: {subscription.subscription_status.replace('_', ' ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}