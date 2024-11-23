import { ThemeToggle } from '@/components/theme-toggle';

export const Header = ({
    title,
    subtitle,
}: Readonly<{
    title?: string;
    subtitle?: string;
}>) => {
    return (
        <header className="flex items-center justify-between p-2 border-b">
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <ThemeToggle />
        </header>
    );
};
