'use client';

import { Check, Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * ThemeToggle component provides a dropdown menu to switch between light, dark, and system color themes.
 *
 * @component
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 *
 * The component uses next-themes for theme management and displays a sun/moon icon that animates
 * when switching between light and dark modes. The dropdown menu shows the current theme selection
 * with a checkmark and allows users to choose between:
 * - Light theme
 * - Dark theme
 * - System theme (follows system preferences)
 */
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className='mr-2 h-4 w-4' />
                    <span className='flex-1'>Light</span>
                    {theme === 'light' && <Check className='h-4 w-4' />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className='mr-2 h-4 w-4' />
                    <span className='flex-1'>Dark</span>
                    {theme === 'dark' && <Check className='h-4 w-4' />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Laptop className='mr-2 h-4 w-4' />
                    <span className='flex-1'>System</span>
                    {theme === 'system' && <Check className='h-4 w-4' />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
