import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Pretendard: ['Pretendard'],
            },
            colors: {
                'hobbing-bg-pink': '#FFDBD7',
                'hobbing-pink': '#FF8595',
                'hobbing-light-pink': '#FFF9F9',
                'hobbing-red': '#F76D67',
                'hobbing-orange': '#FD6B22',
                'hobbing-gray': '#E8E9EA',
                'text-pink-gray': '#D1AEAE',
                'text-gray': '#646464',
                'text-gray-light': '#757575',
            },
        },
    },
}

export default config
