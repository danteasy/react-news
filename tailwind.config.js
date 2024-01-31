/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#f8c4d4",
            },
            screens: {
                phone: { max: "400px" },
            },
        },
    },
    plugins: [],
};
