import randomColor from 'randomcolor';

/**
 * Generates a random RGBA color string with dark luminosity.
 * The color is compatible with Tailwind CSS opacity modifiers.
 *
 * @example
 * const color = generateRandomColor();
 * // Returns something like 'rgba(45,67,89,var(--tw-bg-opacity, 1))'
 */
export function generateRandomColor() {
    return (
        'rgba(' +
        randomColor({ format: 'rgbArray', luminosity: 'dark' }) +
        ',var(--tw-bg-opacity, 1))'
    );
}
