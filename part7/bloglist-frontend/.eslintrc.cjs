module.exports = {
	"env": {
		 "browser": true,
		 "es2021": true,
		 "cypress/globals": true
	},
	"extends": [
		 "react-app",
		 "eslint:recommended",
		 "plugin:react/recommended"
	],
	"overrides": [],
	"parserOptions": {
		 "ecmaFeatures": {
			  "jsx": true,
			  "js": true
		 },
		 "ecmaVersion": "latest",
		 "sourceType": "module",
		 "parser": "@babel/eslint-parser"
	},
	"plugins": [
		 "react"
	],
	"rules": {
		 "indent": [
			  "error",
			  "tab"
		 ],
		 "linebreak-style": [
			  "error",
			  "windows"
		 ],
		 "quotes": [
			  "error",
			  "single"
		 ],
		 "semi": [
			  "error",
			  "always"
		 ],
		 "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
