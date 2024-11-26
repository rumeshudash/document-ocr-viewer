import { cn } from '@/lib/utils';

/**
 * FieldBadge Component
 *
 * Renders a badge-style component that displays the initials of a label with a colored background and border.
 * The component is commonly used to represent selected fields or categories in a visual manner.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.label - The text to be converted into initials (e.g., "First Name" becomes "FN")
 * @param {string} props.color - The color value for the badge's background and border (can be any valid CSS color)
 * @param {string} [props.className] - Optional additional CSS classes to be applied to the badge
 *
 * @example
 * ```tsx
 * <FieldBadge
 *   label="First Name"
 *   color="#FF0000"
 *   className="my-2"
 * />
 * ```
 */
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
