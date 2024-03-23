/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./pages/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        colors: {
            ...colors,
            transparent: 'transparent',
            current: 'currentColor',
            coral: {
                100: '#EC3A27',
                200: '#EC9087',
            },
            black: {
                0: '#000',
                100: '#171717',
                200: '#242424',
                300: '#E5E3D8',
            },
            white: {
                100: '#FFF',
                200: '#C3C3C3',
            },
            yellow: "#FFD717",
            blue: {
                100: '#001F3F',
                200: '#0D63A5',
            },
        },
        fontFamily: {
            'brand': ['Raleway'],
            'heading': ['Barlow Condensed'],
            'body': ['Lato'],
            'text': ['Mulish'],
            'ams': ['Urbanist'],
        },
    },
    plugins: []
}
