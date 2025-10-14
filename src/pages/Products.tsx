import React from 'react'
import { ProductCard } from '../components/stripe/ProductCard'
import { SubscriptionStatus } from '../components/stripe/SubscriptionStatus'
import { stripeProducts } from '../stripe-config'
import { useAuth } from '../components/auth/AuthProvider'

export function Products() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect solution for your business needs
          </p>
        </div>

        {user && (
          <div className="mb-8">
            <SubscriptionStatus />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}