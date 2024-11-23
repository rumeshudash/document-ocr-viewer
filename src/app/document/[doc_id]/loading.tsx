import { Skeleton } from '@/components/ui/skeleton';

const DocumentLoading = () => {
    return (
        <div className='p-4'>
            <Skeleton className='h-[500px] w-full' />
        </div>
    );
};

export default DocumentLoading;
