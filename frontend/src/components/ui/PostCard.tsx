import { Link } from 'react-router-dom';
import { User, Calendar, MapPin, LucideIcon } from 'lucide-react';

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  date: string;
  tag: string;
  tagIcon?: LucideIcon;
  tagType?: 'default' | 'status-open' | 'status-closed' | 'body-part';
  tagColor?: string; // Tailwind color class like 'text-blue-400 border-blue-500/20 bg-blue-500/10'
  location?: string;
  href: string;
}

export default function PostCard({
  title,
  author,
  date,
  tag,
  tagIcon: TagIcon,
  tagType = 'default',
  tagColor,
  location,
  href,
}: PostCardProps) {
  const getTagStyles = () => {
    if (tagColor) return tagColor;

    switch (tagType) {
      case 'status-open':
        return 'bg-neon-500/10 text-neon-400 border-neon-500/20';
      case 'status-closed':
        return 'bg-zinc-800 text-zinc-500 border-zinc-700';
      case 'body-part':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <Link 
      to={href}
      className="group block p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-neon-500/50 transition-all hover:shadow-2xl hover:shadow-neon-500/10"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getTagStyles()}`}>
          {TagIcon && <TagIcon size={14} />}
          {tag}
        </span>
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-400 transition-colors line-clamp-1">
        {title}
      </h3>

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-1.5">
          <User size={16} className="text-zinc-500" />
          <span>{author}</span>
        </div>
        {location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-zinc-500" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
