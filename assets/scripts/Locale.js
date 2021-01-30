let currentLocale = 'ru';

const locales = {
	'ru': {
		"introDialogue": [
			"Привет, Чувак!",
			"Сегодня ты услышишь историю",
			"В которой будет увлекательный сюжет",
			"Новые приключения ждут тебя!",
		]
	},

	'en': {
		"introDialogue": "Hello, Dude!",
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