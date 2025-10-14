import { supabase } from './supabase'

export interface CheckoutSessionRequest {
  price_id: string
  success_url: string
  cancel_url: string
  mode: 'payment' | 'subscription'
}

export interface CheckoutSessionResponse {
  sessionId: string
  url: string
}

export async function createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    console.error('Checkout error: User not authenticated')
    throw new Error('User not authenticated')
  }

  console.log('Creating checkout session with request:', {
    ...request,
    supabase_url: import.meta.env.VITE_SUPABASE_URL
  })

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(request),
  })

  console.log('Checkout response status:', response.status, response.statusText)

  if (!response.ok) {
    let errorMessage = 'Failed to create checkout session'
    try {
      const error = await response.json()
      console.error('Checkout error response:', error)
      errorMessage = error.error || errorMessage
    } catch (e) {
      console.error('Failed to parse error response:', e)
      errorMessage = `HTTP ${response.status}: ${response.statusText}`
    }
    throw new Error(errorMessage)
  }

  const result = await response.json()
  console.log('Checkout session created successfully:', { sessionId: result.sessionId })
  return result
}

export async function getUserSubscription() {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}