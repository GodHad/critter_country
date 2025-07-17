import localFont from 'next/font/local';

export const corndog = localFont({
    src: [
        {
            path: '../public/fonts/Corndog.woff',
            weight: '400',
            style: 'normal'
        }
    ],
    variable: '--font-corndog',
    display: 'swap',
});