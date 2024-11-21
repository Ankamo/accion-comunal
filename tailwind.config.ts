module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	  "./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: "#1e293b", // Un color oscuro elegante
		  secondary: "#334155", // Tonalidad complementaria
		  accent: "#22d3ee", // Para detalles llamativos
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  