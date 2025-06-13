import { cn } from '@/lib/utils';

export function NotificationCard({ title, message, type, priority, read, createdAt }) {
  return (
    <div
      className={cn(
        'relative p-4 rounded-xl border shadow-sm transition duration-200 hover:shadow-md space-y-1 cursor-pointer',
        !read ? 'bg-yellow-50' : 'bg-white',
        priority === 'HIGH' && 'border-red-500',
        priority === 'MEDIUM' && 'border-yellow-400',
        priority === 'LOW' && 'border-gray-300'
      )}
    >
      {/* Unread red pulse indicator */}
      {!read && (
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
      )}

      <div className={cn('text-base', !read && 'font-semibold')}>
        {title}
      </div>

      <div className={cn('text-sm', read ? 'text-muted-foreground' : 'text-gray-700')}>
        {message}
      </div>

      <div className="text-xs text-gray-400">
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  );
}
