module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'body': ['Rubik', 'sans-serif'],
      'rubik': ['Rubik', 'sans-serif'],
      'serif': ['Noto Serif Display', 'serif'],
      'mono': ['Roboto Mono', 'mono']
    },
    extend: {
      colors: {
        'transparent-black': 'rgba(0, 0, 0, 0.5)',
        'light-blue': 'rgb(214, 222, 251)',
        'dark-blue': 'rgb(31, 34, 64)',
        'very-dark-blue': 'rgb(13, 15, 28)',
        'dark-blue-shadow': 'rgb(20, 25, 50)',
        'light-blue-shadow': 'rgb(42, 45, 80)',
        'orange-red': 'rgb(235, 105, 105)',
      },
      boxShadow: {
        'neumorphism': '20px 20px 60px #1a1d36, -20px -20px 60px #24274a',
      },
    },
  },
  plugins: [],
}
