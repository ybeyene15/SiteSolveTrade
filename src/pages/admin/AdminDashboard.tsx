import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Image,
  Briefcase,
  Target,
  Award,
  MessageSquare,
  Settings,
  ArrowRight
} from 'lucide-react';

const quickLinks = [
  {
    path: '/admin/hero',
    label: 'Edit Hero Section',
    description: 'Update main headline, subheadline, and buttons',
    icon: Image,
    color: 'cyan'
  },
  {
    path: '/admin/services',
    label: 'Manage Services',
    description: 'Add, edit, or reorder service offerings',
    icon: Briefcase,
    color: 'blue'
  },
  {
    path: '/admin/approach',
    label: 'Edit Approach',
    description: 'Update your methodology and process',
    icon: Target,
    color: 'purple'
  },
  {
    path: '/admin/benefits',
    label: 'Edit Benefits',
    description: 'Showcase your unique advantages',
    icon: Award,
    color: 'green'
  },
  {
    path: '/admin/cta',
    label: 'Call to Action',
    description: 'Customize conversion sections',
    icon: MessageSquare,
    color: 'orange'
  },
  {
    path: '/admin/settings',
    label: 'Site Settings',
    description: 'Global settings and configuration',
    icon: Settings,
    color: 'gray'
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Admin Panel
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your website content without touching any code
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">
            Getting Started
          </h2>
          <p className="text-gray-300 mb-4">
            Click on any section below to start editing. Changes are saved to the database
            and will appear on your live website immediately.
          </p>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View Live Website
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/20 hover:bg-gray-750 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-${link.color}-500/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${link.color}-400`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Tips for Content Editing
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>All changes are saved immediately when you click the Save button</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Use the Preview button to see how your changes will look before publishing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Keep headlines concise and impactful for better user engagement</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Test your changes on mobile devices to ensure responsive design</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
