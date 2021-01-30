let currentLocale = 'ru';

const locales = {
	'ru': {
		"introDialogue": "Привет, Чувак!"
	},

	'en': {
		"introDialogue": "Hello, Dude!"
	},
};

export class Locale {
	static setLocale(locale) {
		currentLocale = locale;
	}

	static getString(key) {
		return locales[currentLocale][key] || 'undefined';
	}
}