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

/**
 * FieldCard component displays a single field in a card format with interactive controls
 *
 * @component
 * @param {Object} props - Component props
 * @param {Field} props.field - The field object containing label, color, and content information
 * @param {boolean} props.checked - Whether the field is currently checked/selected
 * @param {boolean} props.active - Whether the field is currently active/focused
 * @param {string} [props.className] - Additional CSS classes to apply to the card
 * @param {(checked: boolean) => void} [props.onChecked] - Callback function when checkbox state changes
 * @param {(hover: boolean) => void} [props.onHover] - Callback function when hover state changes
 * @param {() => void} [props.onDelete] - Callback function when delete action is triggered
 *
 * @example
 * ```tsx
 * <FieldCard
 *   field={{ label: "Name", color: "blue", content: { value: "John Doe" } }}
 *   checked={false}
 *   active={true}
 *   onChecked={(checked) => console.log('Checked:', checked)}
 *   onDelete={() => console.log('Delete clicked')}
 * />
 * ```
 */
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
                            className='w-5 h-5'
                            title='Select field'
                            checked={checked}
                            onCheckedChange={onChecked}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    title='More options'
                                >
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
