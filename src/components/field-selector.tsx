import { cn } from '@/lib/utils';
import { Section } from '@/types/document.types';

export const FieldSelector = ({
    sections,
    className,
}: {
    sections: Section[];
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 max-w-[500px] w-full',
                className
            )}
        >
            {sections.map((section) => (
                <div key={section.id}>{section.title}</div>
            ))}
        </div>
    );
};
