import { AnimatePresence, motion } from 'framer-motion';
import { useList, useUpdateEffect } from 'react-use';

import { cn } from '@/lib/utils';
import { Field, Section } from '@/types/document.types';

import { ConfirmFieldSelection } from './alerts/confirm-field-selection';
import { FieldCard } from './field-card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const FieldSelector = ({
    sections,
    className,
    highlightFieldId,
    onSelectionChange,
    onFieldHover,
    onFieldDelete,
    onConfirm,
}: {
    sections: Section[];
    className?: string;
    highlightFieldId?: number;
    onSelectionChange?: (fields: Field[]) => void;
    onFieldHover?: (field: Field | null) => void;
    onFieldDelete?: (field: Field) => void;
    onConfirm?: () => void;
}) => {
    const [
        selectedFields,
        { push: addSelectedField, removeAt: removeSelectedField },
    ] = useList<Field>([]);

    const handleFieldRemove = (field: Field) => {
        const index = selectedFields.findIndex((f) => f.id === field.id);
        if (index !== -1) {
            removeSelectedField(index);
        }
    };

    const handleSelectAll = () => {
        sections.forEach((section) => {
            section.children.forEach((field) => addSelectedField(field));
        });
    };

    const handleDeleteField = (field: Field) => {
        handleFieldRemove(field);
        onFieldDelete?.(field);
    };

    useUpdateEffect(() => {
        onSelectionChange?.(selectedFields);
    }, [selectedFields]);

    return (
        <div className='flex flex-col min-w-[200px] overflow-hidden'>
            <div
                className={cn(
                    'flex flex-col gap-2 max-w-[500px] w-full h-full overflow-y-auto',
                    className
                )}
            >
                <h1 className='text-lg font-semibold'>Fields</h1>
                <Tabs defaultValue={sections[0].type}>
                    <TabsList>
                        {sections.map((section) => (
                            <TabsTrigger
                                key={section.type}
                                value={section.type}
                            >
                                {section.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {sections.map((section) => (
                        <TabsContent
                            className='flex flex-col gap-2'
                            key={section.type}
                            value={section.type}
                        >
                            <AnimatePresence mode='sync'>
                                {section.children.map((field) => (
                                    <motion.div
                                        key={field.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FieldCard
                                            field={field}
                                            active={
                                                highlightFieldId === field.id
                                            }
                                            checked={selectedFields.includes(
                                                field
                                            )}
                                            onChecked={(checked) => {
                                                if (checked) {
                                                    addSelectedField(field);
                                                } else {
                                                    handleFieldRemove(field);
                                                }
                                            }}
                                            onDelete={() =>
                                                handleDeleteField(field)
                                            }
                                            onHover={(state) => {
                                                onFieldHover?.(
                                                    state ? field : null
                                                );
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            <div className='flex p-4 border-t gap-4 justify-between'>
                <Button variant='secondary' onClick={handleSelectAll}>
                    Select All
                </Button>
                <ConfirmFieldSelection onConfirm={onConfirm}>
                    <Button disabled={selectedFields.length === 0}>
                        Confirm
                    </Button>
                </ConfirmFieldSelection>
            </div>
        </div>
    );
};
