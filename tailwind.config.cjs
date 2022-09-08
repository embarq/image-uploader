const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.html',
		'./src/**/*.vue'
	],
	theme: {
    fontFamily: {
			sans: [ ...defaultTheme.fontFamily.sans ],
		},
		extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.neutral,
      },
		},
	},
	plugins: []
}
