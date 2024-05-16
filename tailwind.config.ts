import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Pretendard: ['Pretendard'],
            },
            colors: {
                'primary-red': '#ff5452',
            },
        },
    },
}

export default config
