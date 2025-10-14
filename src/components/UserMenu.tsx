import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, UserCircle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

interface UserMenuProps {
  user: any;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check subscription status
        const { data: subData } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();

        if (subData) {
          setSubscription(subData);
        }

        // Check if user has paid access
        const { data: accessData } = await supabase
          .from('user_access')
          .select('has_paid_access')
          .eq('user_id', user.id)
          .single();

        setHasAccess(accessData?.has_paid_access || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getDisplayName = () => {
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  const getSubscriptionStatus = () => {
    if (hasAccess) {
      return 'Complete Website Package';
    }
    if (subscription?.subscription_status === 'active') {
      const product = getProductByPriceId(subscription.price_id);
      return product?.name || 'Active Plan';
    }
    return 'No active plan';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden sm:block font-medium text-white">{getDisplayName()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 py-2 z-20 animate-fade-in">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm font-medium text-white">{getDisplayName()}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            <div className="px-4 py-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-400">Current Plan</p>
                  <p className="text-sm font-medium text-white">{getSubscriptionStatus()}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/account');
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                <UserCircle className="w-4 h-4" />
                <span>Account</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default UserMenu;