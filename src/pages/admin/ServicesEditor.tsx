import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Save, Plus, Trash2, AlertCircle, CheckCircle, GripVertical } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../components/admin/AdminAuthProvider';

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

const availableIcons = [
  'Network', 'Telescope', 'Compass', 'Gauge', 'Briefcase', 'Target',
  'Award', 'Zap', 'Globe', 'Rocket', 'Code', 'Database', 'Shield',
  'TrendingUp', 'Users', 'Settings'
];

export default function ServicesEditor() {
  const { user } = useAdminAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services_content')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data) setServices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    const newService: Service = {
      id: `temp-${Date.now()}`,
      title: '',
      description: '',
      icon_name: 'Network',
      display_order: services.length + 1,
      is_active: true
    };
    setServices([...services, newService]);
  };

  const handleUpdateService = (id: string, field: keyof Service, value: any) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleSaveAll = async () => {
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const existingServices = services.filter(s => !s.id.startsWith('temp-'));
      const newServices = services.filter(s => s.id.startsWith('temp-'));

      for (const service of existingServices) {
        const { error } = await supabase
          .from('services_content')
          .update({
            title: service.title,
            description: service.description,
            icon_name: service.icon_name,
            display_order: service.display_order,
            is_active: service.is_active,
            updated_at: new Date().toISOString(),
            updated_by: user?.id
          })
          .eq('id', service.id);

        if (error) throw error;
      }

      for (const service of newServices) {
        const { error } = await supabase
          .from('services_content')
          .insert([{
            title: service.title,
            description: service.description,
            icon_name: service.icon_name,
            display_order: service.display_order,
            is_active: service.is_active,
            updated_by: user?.id
          }]);

        if (error) throw error;
      }

      const allServiceIds = services.map(s => s.id).filter(id => !id.startsWith('temp-'));
      const { data: allDbServices } = await supabase
        .from('services_content')
        .select('id');

      if (allDbServices) {
        const servicesToDelete = allDbServices
          .filter(s => !allServiceIds.includes(s.id))
          .map(s => s.id);

        if (servicesToDelete.length > 0) {
          const { error } = await supabase
            .from('services_content')
            .delete()
            .in('id', servicesToDelete);

          if (error) throw error;
        }
      }

      await loadServices();
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
          <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
          <p className="text-gray-400">
            Add, edit, or reorder the services displayed on your homepage
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
            <span>Services updated successfully!</span>
          </Alert>
        )}

        <div className="space-y-6 mb-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-400 text-sm font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service Title
                      </label>
                      <Input
                        value={service.title}
                        onChange={(e) => handleUpdateService(service.id, 'title', e.target.value)}
                        placeholder="Strategic mapping"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Icon
                      </label>
                      <select
                        value={service.icon_name}
                        onChange={(e) => handleUpdateService(service.id, 'icon_name', e.target.value)}
                        disabled={saving}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                      >
                        {availableIcons.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
                      placeholder="Describe this service..."
                      disabled={saving}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.is_active}
                        onChange={(e) => handleUpdateService(service.id, 'is_active', e.target.checked)}
                        disabled={saving}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-sm text-gray-300">Active</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  disabled={saving}
                  className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            onClick={handleAddService}
            disabled={saving}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </Button>

          <Button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>

          <Button
            onClick={loadServices}
            disabled={saving}
            variant="secondary"
          >
            Reset
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
