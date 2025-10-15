import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../components/admin/AdminAuthProvider';

interface HeroContent {
  id: string;
  main_headline: string;
  sub_headline: string;
  badge_text: string;
  primary_button_text: string;
  secondary_button_text: string;
}

export default function HeroEditor() {
  const { user } = useAdminAuth();
  const [content, setContent] = useState<HeroContent>({
    id: '',
    main_headline: '',
    sub_headline: '',
    badge_text: '',
    primary_button_text: '',
    secondary_button_text: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_section')
        .select('*')
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const updateData = {
        main_headline: content.main_headline,
        sub_headline: content.sub_headline,
        badge_text: content.badge_text,
        primary_button_text: content.primary_button_text,
        secondary_button_text: content.secondary_button_text,
        updated_at: new Date().toISOString(),
        updated_by: user?.id
      };

      if (content.id) {
        const { error } = await supabase
          .from('hero_section')
          .update(updateData)
          .eq('id', content.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('hero_section')
          .insert([{ ...updateData, is_published: true }])
          .select()
          .single();

        if (error) throw error;
        if (data) setContent(data);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Hero Section</h1>
          <p className="text-gray-400">
            Update the main headline and call-to-action on your homepage
          </p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-6">
            <CheckCircle className="w-5 h-5" />
            <span>Hero section updated successfully!</span>
          </Alert>
        )}

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
          <div>
            <label htmlFor="badge" className="block text-sm font-medium text-gray-300 mb-2">
              Badge Text
            </label>
            <Input
              id="badge"
              value={content.badge_text}
              onChange={(e) => setContent({ ...content, badge_text: e.target.value })}
              placeholder="Start Here"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">
              Small text displayed above the main headline
            </p>
          </div>

          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-gray-300 mb-2">
              Main Headline
            </label>
            <textarea
              id="headline"
              value={content.main_headline}
              onChange={(e) => setContent({ ...content, main_headline: e.target.value })}
              placeholder="Next-gen digital infrastructure for visionary companies"
              disabled={saving}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.main_headline.length} characters
            </p>
          </div>

          <div>
            <label htmlFor="subheadline" className="block text-sm font-medium text-gray-300 mb-2">
              Sub Headline
            </label>
            <textarea
              id="subheadline"
              value={content.sub_headline}
              onChange={(e) => setContent({ ...content, sub_headline: e.target.value })}
              placeholder="Advanced web systems engineered for performance, scale, and innovation"
              disabled={saving}
              rows={2}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supporting text below the main headline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primary-btn" className="block text-sm font-medium text-gray-300 mb-2">
                Primary Button Text
              </label>
              <Input
                id="primary-btn"
                value={content.primary_button_text}
                onChange={(e) => setContent({ ...content, primary_button_text: e.target.value })}
                placeholder="Get Quote"
                disabled={saving}
              />
            </div>

            <div>
              <label htmlFor="secondary-btn" className="block text-sm font-medium text-gray-300 mb-2">
                Secondary Button Text
              </label>
              <Input
                id="secondary-btn"
                value={content.secondary_button_text}
                onChange={(e) => setContent({ ...content, secondary_button_text: e.target.value })}
                placeholder="Learn More"
                disabled={saving}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>

            <Button
              onClick={loadContent}
              disabled={saving}
              variant="secondary"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
          <div className="bg-black rounded-lg p-8 text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold">
                {content.badge_text || 'Badge Text'}
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 whitespace-pre-wrap">
              {content.main_headline || 'Main Headline'}
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              {content.sub_headline || 'Sub Headline'}
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg">
                {content.primary_button_text || 'Primary Button'}
              </button>
              <button className="px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-lg">
                {content.secondary_button_text || 'Secondary Button'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
