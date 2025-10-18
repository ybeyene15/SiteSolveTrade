import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { createCheckoutSession } from '../../lib/stripe'
import { formatPrice, type StripeProduct } from '../../stripe-config'

interface ProductCardProps {
  product: StripeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    
    try {
      const { url } = await createCheckoutSession({
        price_id: product.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: window.location.href,
        mode: product.mode
      })

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // You could add error handling UI here
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price, product.currency)}
        </div>
        {product.mode === 'subscription' && (
          <div className="text-sm text-gray-500">per month</div>
        )}
      </div>

      <Button
        onClick={handlePurchase}
        loading={loading}
        className="w-full"
        size="lg"
      >
        {product.mode === 'subscription' ? 'Subscribe Now' : 'Purchase Now'}
      </Button>
    </div>
  )
}