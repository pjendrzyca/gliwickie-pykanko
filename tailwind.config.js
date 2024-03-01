/** @type {import('tailwindcss').Config} */
export default {content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            coral: {
                100: '#EC3A27',
                200: '#EC9087',
            },
            black: {
                100: '#171717',
                200: '#242424',
                300: '#E5E3D8',
            },
            white: {
                100: '#FFF',
                200: '#C3C3C3',
            },
        },
        fontFamily: {
            'brand': ['Raleway'],
            'heading': ['Barlow Condensed'],
            'body': ['Lato'],
            'text': ['Mulish'],
        },
    },
    plugins: []
}
