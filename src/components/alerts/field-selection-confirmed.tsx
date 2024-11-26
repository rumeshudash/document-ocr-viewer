import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';

export const FieldSelectionConfirmed = ({
    open,
    onOpenChange,
}: Readonly<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}>) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Thank you!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fields confirmed and processed successfully!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction variant='success'>
                        Okay
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
