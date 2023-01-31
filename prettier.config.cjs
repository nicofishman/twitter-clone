/** @type {import("prettier").Config} */
module.exports = {
    plugins: [require("prettier-plugin-tailwindcss")],
    tailwindConfig: './styles/tailwind.config.js',
};
