import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Header component that displays a title, optional subtitle, and theme toggle button
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title] - The main title to display in the header
 * @param {string} [props.subtitle] - Optional subtitle to display below the title
 *
 * @example
 * ```tsx
 * <Header
 *   title="Document Viewer"
 *   subtitle="View and manage your documents"
 * />
 * ```
 */
export const Header = ({
    title,
    subtitle,
}: Readonly<{
    title?: string;
    subtitle?: string;
}>) => {
    return (
        <header className='flex items-center justify-between p-2 border-b'>
            <div>
                <h1 className='text-xl font-bold'>{title}</h1>
                {subtitle && (
                    <p className='text-xs text-muted-foreground'>{subtitle}</p>
                )}
            </div>
            <ThemeToggle />
        </header>
    );
};
