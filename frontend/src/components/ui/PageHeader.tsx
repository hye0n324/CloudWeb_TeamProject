import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import AuthButton from './AuthButton';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  action?: {
    label: string;
    href: string;
    icon?: any;
  };
}

export default function PageHeader({ title, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-neon-400 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-zinc-300">{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && <ChevronRight size={14} />}
          </div>
        ))}
      </nav>

      {/* Title and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {action && (
          <AuthButton 
            to={action.href} 
            className="sm:w-auto px-6"
            icon={action.icon || Plus}
          >
            {action.label}
          </AuthButton>
        )}
      </div>
    </div>
  );
}
