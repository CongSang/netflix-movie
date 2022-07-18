/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "transparent": "transparent",
        "primary-50": "#333",
        "primary-100": "#111",
        "primary-200": "#242526",
        "primary-300": "#3A3B3C",
        "secondaryColor-100": "#E50914",
        "secondaryColor-200": "#B81D24",
      },
      width: {
        120: "120px",
        150: "150px",
        190: '190px',
        250: '250px',
        300: '300px',
        340: '340px',
        350: '350px',
        400: '400px',
        500: '500px',
        880: '880px',
        1200: '1200px',
        1400: '1400px',
        "28p": "28%",
        "30p": "30%",
        "40p": "40%",
        "68p": "68%",
        "70p": "70%",
      },
      height: {
        45: '45px',
        50: '50px',
        65: '65px',
        320: '320px',
        380: '380px',
        400: '400px',
        450: '450px',
        600: '600px',
        685: '685px',
        800: '800px',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      backgroundPosition: {
        "top-center": "top center",
      },
      flex: {
        0.7: '0.7 1 0%',
      },
      maxHeight: {
        370: '370px',
      },
      maxWidth: {
        "mx-8": "calc(100% - 32px)",
        "vw": "calc(100vw - 32px)",
        "100vw": "100vw"
      },
      top: {
        "50p": '50%'
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        secColor: '#efefef',
        navColor: '#BEBEBE',
      },
      backgroundColor: {
        mainColor: '#FBF8F9',
        secondaryColor: '#F0F0F0',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '9/16': '9 / 16',
        '10/16': '10 / 16',
        '16/10': '16 / 10',
        '16/9': '16 / 9',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },

        'fade-in': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },

        'loading': {
          '0%': {
            backgroundColor: 'hsl(200, 20%, 30%)',
          },
          '100%': {
            backgroundColor: 'hsl(200, 20%, 55%)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.4s ease-out',
        'loading': 'loading 0.6s linear infinite alternate',
        'fade-in': ' fade-in 0.4s ease-in',
      },
    },
    cursor: {
      default: 'default',
      pointer: 'pointer',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
