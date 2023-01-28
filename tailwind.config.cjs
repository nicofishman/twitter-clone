/** @type {import('tailwindcss').Config} */
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
                greenRetweet: "rgb(0,186,124)"
            },
            fontFamily: {
                twitter: 'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }
        },
    },
    plugins: [],
};
