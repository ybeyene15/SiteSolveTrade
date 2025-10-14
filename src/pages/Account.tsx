import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Calendar, CreditCard, CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabase';

interface Order {
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

interface UserAccess {
  has_paid_access: boolean;
  payment_date: string | null;
  stripe_customer_id: string | null;
}

export default function Account() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchAccountData();
    }
  }, [user, authLoading, navigate]);

  const fetchAccountData = async () => {
    try {
      setLoading(true);

      const [ordersResponse, accessResponse] = await Promise.all([
        supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false }),
        supabase
          .from('user_access')
          .select('*')
          .maybeSingle()
      ]);

      if (ordersResponse.data) {
        setOrders(ordersResponse.data);
      }

      if (accessResponse.data) {
        setUserAccess(accessResponse.data);
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      completed: 'bg-green-500/10 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      canceled: 'bg-red-500/10 text-red-400 border-red-500/30',
      paid: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Account Details
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your profile and view your purchase history
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2">
                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Email Address</label>
                      <p className="text-white text-lg">{user.email}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Account Created</label>
                      <p className="text-white text-lg">
                        {user.created_at ? formatDate(user.created_at) : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-1">User ID</label>
                      <p className="text-gray-500 text-sm font-mono">{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Package className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Access Status</h2>
                </div>

                <div className="space-y-4">
                  {userAccess?.has_paid_access ? (
                    <>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Active Access</span>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Plan</label>
                        <p className="text-white">Complete Website Package</p>
                      </div>
                      {userAccess.payment_date && (
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Member Since</label>
                          <p className="text-white">{formatDate(userAccess.payment_date)}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <p className="text-gray-400">No active plan</p>
                      <button
                        onClick={() => navigate('/pricing')}
                        className="mt-4 w-full px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300"
                      >
                        View Plans
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Purchase History</h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No purchases yet</p>
                  <p className="text-gray-500 mb-6">
                    You haven't made any purchases. Check out our pricing to get started!
                  </p>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300"
                  >
                    View Pricing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.order_id}
                      className="bg-white/[0.02] border border-white/5 rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold text-lg">
                              Complete Website Package
                            </h3>
                            {getStatusBadge(order.order_status)}
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(order.order_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <CreditCard className="w-4 h-4" />
                              <span>Payment: {getStatusBadge(order.payment_status)}</span>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            <p>Order ID: {order.order_id}</p>
                            <p className="truncate">Transaction: {order.payment_intent_id}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-cyan-400">
                            {formatCurrency(order.amount_total, order.currency)}
                          </p>
                          <p className="text-sm text-gray-400">Total Amount</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
