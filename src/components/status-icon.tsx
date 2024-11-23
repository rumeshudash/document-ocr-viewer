import { AlertCircle, Check, Clock } from 'lucide-react';

import { DocumentStatus } from '@/types/document.types';

type StatusIconProps = {
    status?: DocumentStatus;
    className?: string;
};

export const StatusIcon = ({
    status = 'reviewing',
    className = '',
}: StatusIconProps) => {
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
