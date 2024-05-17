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
                'hobbing-red': '#F76D67',
            },
        },
    },
}

export default config
