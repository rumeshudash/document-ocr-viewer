import { MoreVerticalIcon, TrashIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Field } from '@/types/document.types';

import { FieldBadge } from './field-badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const FieldCard = ({
    field,
    checked,
    active,
    className,
    onChecked,
    onHover,
    onDelete,
}: {
    field: Field;
    checked: boolean;
    active: boolean;
    className?: string;
    onChecked?: (checked: boolean) => void;
    onHover?: (hover: boolean) => void;
    onDelete?: () => void;
}) => {
    return (
        <Card
            className={cn(
                'rounded-lg hover:bg-muted',
                { 'bg-muted border-primary': active },
                className
            )}
            onMouseOver={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
        >
            <CardContent className='p-4'>
                <div className='flex gap-4 justify-between'>
                    <div className='flex gap-2'>
                        <FieldBadge
                            label={field.label}
                            color={field.color ?? ''}
                        />
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-sm font-semibold'>
                                {field.label}
                            </h3>
                            <p className='text-xs'>{field.content?.value}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox
                            checked={checked}
                            onCheckedChange={onChecked}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                    <MoreVerticalIcon className='w-4 h-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                    className='text-destructive'
                                    onClick={() => onDelete?.()}
                                >
                                    <TrashIcon className='w-4 h-4' />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
