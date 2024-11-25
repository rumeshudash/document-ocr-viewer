import { cn } from '@/lib/utils';

export const FieldBadge = ({
    label,
    color,
    className,
}: {
    label: string;
    color: string;
    className?: string;
}) => {
    const initials = label
        .split(' ')
        .map((name) => name[0])
        .join('');
    return (
        <div
            className={cn(
                'flex items-center border-l-4 rounded-md overflow-hidden h-6 pl-1 pr-2 bg-opacity-20',
                className
            )}
            style={{ borderColor: color, background: color }}
        >
            {initials}
        </div>
    );
};
