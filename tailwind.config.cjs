/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lightGray: "#E7EAE9",
                textGray: "rgb(113, 118, 123)",
                borderGray: "rgb(47, 51, 54)",
                twitterBlue: "rgb(29, 155, 240)",
                twitterBlueHover: "#178cd8",
                redLike: "rgb(249,24,128)",
                greenRetweet: "rgb(0,186,124)",
                modalBackground: "rgba(91,112,131,0.4)",
            },
            fontFamily: {
                twitter: 'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            },
            animation: {
                "spin-fast": "spin 0.7s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
        },
        screens: {
            xxs: '500px',
            ...defaultTheme.screens
        }
    },
    plugins: [
        require("tailwindcss-animate")
    ],
};
