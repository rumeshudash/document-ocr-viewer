import randomColor from 'randomcolor';

export function generateRandomColor() {
    return (
        'rgba(' +
        randomColor({ format: 'rgbArray', luminosity: 'dark' }) +
        ',var(--tw-bg-opacity, 1))'
    );
}
