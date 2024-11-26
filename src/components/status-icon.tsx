import { AlertCircle, Check, Clock } from 'lucide-react';

import { DocumentStatus } from '@/types/document.types';

/**
 * Props for the StatusIcon component
 * @interface StatusIconProps
 */
type StatusIconProps = {
    /**
     * The current status of the document ('approved', 'rejected', or 'reviewing')
     */
    status?: DocumentStatus;

    /**
     * Additional CSS classes to apply to the container
     */
    className?: string;
};

/**
 * A component that displays an icon representing the document status
 *
 * @component
 * @param {StatusIconProps} props - The component props
 *
 * @example
 * ```tsx
 * <StatusIcon status="reviewing" className="mr-4" />
 * ```
 */
export const StatusIcon = ({
    status = 'reviewing',
    className = '',
}: StatusIconProps) => {
    /**
     * Returns the appropriate icon based on the document status
     * @returns {JSX.Element} Icon component with appropriate color
     */
    const getStatusIcon = () => {
        switch (status) {
            case 'approved':
                return <Check className='text-green-500' />;
            case 'rejected':
                return <AlertCircle className='text-red-500' />;
            default:
                return <Clock className='text-yellow-500' />;
        }
    };

    return (
        <div
            className={`absolute top-2 right-2 p-1 bg-background rounded-full shadow-md ${className}`}
        >
            {getStatusIcon()}
        </div>
    );
};
