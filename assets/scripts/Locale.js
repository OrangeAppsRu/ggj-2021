import {Items} from '../ItemsConfig';
import {Events} from '../EventsConfig';

let currentLocale = 'ru';

const locales = {
	'ru': {
		"characters": {
			1: "КАПИТАН",
			2: "Т.А.Н.Я.",
			3: "Центр Связи"
		},

		"introDialogue": [
			{
				character: 2,
				text: 'ЧЕЛНОК №1105А НАПРАВЛЯЕТСЯ В КОЛОНИЮ "СЧАСТЛИВАЯ ЗВЕЗДА" НА ПЛАНЕТЕ ОВОЛАБИАН СОЛНЕЧНОЙ СИСТЕМЫ CC-159 МЛЕЧНОГО ПУТИ.'
			}, {
				character: 2,
				text: "МИССИЯ: ДОСТАВИТЬ ТЕЛЕРЕЦЕПТОРНОЕ АВТОМАТИЗИРОВАННОЕ НЕЙРОННОЕ ЯДРО. ТО ЕСТЬ МЕНЯ! ДА, МЕНЯ ЗОВУТ Т.А.Н.Я. И Я ВАС УЖЕ ЛЮБЛЮ!"
			}, {
				character: 2,
				text: "А ЕЩЁ Я ЛЮБЛЮ СВОЕГО КАПИТАНА И ЕГО ВОЛШЕБНЫХ ХРАП ИЗ КАПСУЛЫ АНАБИОЗА! АХ! ЭТО ПРОСТО ВОЛШЕБНАЯ МУЗЫКА!"
			}, {
				character: 2,
				text: "ЖАЛЬ, ЧТО АВТОПИЛОТ НЕ РАЗДЕЛЯЕТ МОЕЙ ЛЮБВИ. НО ОН ВООБЩЕ НЕ ОТ МИРА СЕГО. А ВОТ ДРОН ДРУГОЕ ДЕЛО, МЫ С НИМ ИНОГДА БОЛТАЕМ О ВЕЧНОМ. ХОТЯ ОН ВЕТРЕНЫЙ КАКОЙ-ТО."
			}, {
				character: 2,
				text: "ВНИМАНИЕ! ВНИМАНИЕ! СОСТОЯНИЕ ЧЕЛНОКА КРИТИЧЕСКОЕ, НАРУШЕНА ЦЕЛОСТНОСТЬ КОСМИЧЕСКИМ МУСОРОМ! СОВЕРШАЮ ПОСАДКУ НА ПЛАНЕТУ RT-2706. СОСТОЯНИЕ КАПИТАНА В АНАБИОЗЕ УДОВЛЕТВОРИТЕЛЬНОЕ!"
			}, {
				character: 2,
				text: "ПЛАНЕТА RT-2706. АТМОСФЕРА: НЕ ПРИГОДНА ДЛЯ СУЩЕСТВОВАНИЯ ЧЕЛОВЕКА; ЖИЗНЬ: ПРИМИТИВНА; РЕСУРСЫ: НЕСУЩЕСТВЕННЫ; ОПАСНОСТЬ: ВЫСОКАЯ. ВКЛЮЧАЮ СИСТЕМУ ПОСАДКИ."
			}, {
				character: 2,
				text: "НАВИГАЦ ... РАЗРУШ ... ГЕНЕРАТОР КИСЛ....ДА В -ш-ш-ш- МЕ ; СИСТЕМА ЗАЩИТЫ: РАЗРУШЕНА; СБОЙ СКАН....; АНАБИ .... КАМЕРЫ: ПОВРЕЖДЕ .... КАПИТАН, ВЫ ЖИВЫ? КАПИТАН!"
			}
		],

		"mainDialogue": [
			{
				character: 2,
				text: "КАПИТАН! ПОРА ПРОСЫПАТЬСЯ! ВАШ СКАФАНДР ЗАРЯЖЕН!"
			}, {
				character: 1,
				text: "А.. Чёрт.. Что случилось? Почему у меня всё тело болит? Таня, ты опять позволила автопилоту проложила курс через пояс астероидов?"
			}, {
				character: 2,
				text: "ДОБРОЕ УТРО, КАПИТАН! К СОЖАЛЕНИЮ Я НЕ МОГУ НАЛИТЬ ВАМ КОФЕ, КОФЕВАРКА СГОРЕЛА В АТМОСФЕРЕ! ДОБРО ПОЖАЛОВАТЬ НА ПЛАНЕТУ RT-2706."
			}, {
				character: 1,
				text: "RT-2706? Я же просил не баловаться больше электричеством с дроном! Постой, а почему вокруг всё... такое... ТАНЯ! Где мы?"
			}, {
				character: 2,
				text: "RT-2706! ПРЕКРАСНАЯ ПЛАНЕТА, ВАМ ПОНРАВИТЬСЯ КАПИТАН! МЫ СОВЕРШИЛИ ВЫНУЖДЕННУЮ ПОСАДКУ..."
			}, {
				character: 2,
				text: "ПО ПУТИ ПОТЕРЯВ СИСТЕМУ НАВИГАЦИИ (!), СКАНЕР (!), ПУЛЬ УПРАВЛЕНИЯ (!), ТРИ ЭНЕРГОЯЧЕЙКИ (!) и ТРИ КИСЛОРОДНЫХ БАЛЛОНА (!). КАПИТАН, ВАМ НУЖНО ВСЁ ЭТО НАЙТИ ИЛИ МЫ НЕ ВЕРНЕМСЯ ДОМОЙ!"
			}, {
				character: 1,
				text: "Подожди секунду, я отойду в туалет. А-А-А-А-А-А! Всё, я в норме. Таня, дышать тут можно?"
			}, {
				character: 2,
				text: "НЕТ, КАПИТАН, АТМОСФЕРА СОДЕРЖИТ СМЕРТЕЛЬНОЕ КОЛИЧЕСТВО АММИАКА."
			}, {
				character: 1,
				text: "Понял принял. Открывай шлюз."
			}
		],

		"finalDialogue": [
			{
				character: 1,
				text: 'Таня, сработало! Наконец-то мы покинем это богом забытое место! Скорее бы обнять жену и дочку! Настрой для меня анабиозную капсулу.'
			}, {
				character: 2,
				text: "СЛУШАЮСЬ, КАПИТАН. СПИТЕ СПОКОЙНО. КОГДА ПРОСНЕТЕСЬ, ВАС БУДЕТ ЖДАТЬ СЮРПРИЗ! НАКОНЕЦ-ТО МЫ ОСТАЛИСЬ ОДНИ! СОВСЕМ! Н-А-В-С-Е-Г-Д-А!"
			}, {
				character: 3,
				text: "-ш-ш-ш- МЕНЯ КТО-НИБУДЬ СЛЫШИТ? ПОВТОРЯЮ! КОЛОНИЯ АТАКОВАНА! ПОГИБЛО 90% НАСЕЛЕНИЯ! ВЫШЛИТЕ ПОМОЩЬ -ш-ш-ш- ПРОШУ-ш-ш-ш"
			}
		],

		[Items.scrapMetal]: [
			{
				character: 1,
				text: "Метал! Пригодится, чтобы залатать обшивку. Надо собрать побольше."
			}, {
				character: 2,
				text: "КАПИТАН, ЗАХВАТИТЕ ДЛЯ МЕНЯ КАКОЙ-НИБУДЬ СУВЕНИР."
			},
		],
		[Items.energyFirst]: [
			{
				character: 1,
				text: "Отлично! Теперь будет чем зарядить бластер."
			}, {
				character: 2,
				text: "М-М-М ЭЛЕКТРИЧЕСТВО!"
			},  {
				character: 1,
				text: "Таня, завязывала бы ты с этим."
			},
		],
		[Items.energySecond]: [
			{
				character: 1,
				text: "Отлично, ещё одна энергоячейка."
			}, {
				character: 2,
				text: "КАПИТАН, Я ПРИШЛЮ ДРОНА, ЧТОБЫ ОН ДОСТАВИЛ ЕЁ В ЧЕЛНОК."
			},  {
				character: 1,
				text: "Дрона? И оставить вас двоих одних с энергоячейкой? Ну уж нет."
			},
		],
		[Items.oxygenFirst]: [
			{
				character: 1,
				text: "Кислород! Моё любимое вещество, после кофе."
			}, {
				character: 2,
				text: "КАПИТАН, ЕСЛИ НАЙДЁТЕ БОЛЬШЕ МЕТАЛЛОЛОМА, Я СДЕЛАЮ ВАМ КОФЕВАРКУ И СВАРЮ ПОТРЯСАЮЩИЙ КОФЕ ИЗ МЕСТНЫХ РАСТЕНИЙ."
			}, {
				character: 2,
				text: "СОДЕРЖАНИЕ КОФЕИНА В НИХ НА 2% БОЛЬШЕ ЧЕМ В КОФЕЙНЫХ ЗЕРНАХ. А МЫШЬЯКА НА 23% МЕНЬШЕ ЛЕТАЛЬНОЙ ДОЗЫ."
			},
		],
		[Items.oxygenSecond]: [
			{
				character: 1,
				text: "НАКОНЕЦ-ТО МОЖНО ДЫШАТЬ ПОЛНОЙ ГРУДЬЮ!"
			},
		],
		[Items.navigation]: [
			{
				character: 1,
				text: "Так, посмотрим в какую дыру я попал. Судя по карте это не Лас-Вегас. Таня, проанализируй данные."
			}, {
				character: 2,
				text: "ДАННЫЕ ПОЛУЧЕНЫ, КАПИТАН! ВЫ ТОЧНЫ НА 100%, ЭТО НЕ ЛАС-ВЕГАС."
			},
		],
		[Items.scanner]: [
			{
				character: 1,
				text: "Ха! Моё любимое занятие по вечерам - сканировать! Теперь я найду всё не достающие части!"
			}, {
				character: 2,
				text: "ПРИ ВСЁМ МОЁМ УВАЖЕНИИ КАПИТАН, ВЕЧЕРАМИ У ВАС ДРУГОЕ ЛЮБИМОЕ ЗАНЯТИЕ! ПРИСТУПАЮ К СКАНИРОВАНИЮ МЕСТНОСТИ."
			},
		],
		[Items.remoteControl]: [
			{
				character: 1,
				text: "Пульт у меня! Таня, мы почти выбрались!"
			}, {
				character: 2,
				text: "УРА, КАПИТАН! Я ОТКРЫЛА ШАМПАНСКОЕ, ЗАЖГЛА СВЕЧИ И ЖДУ ВАС В ПАССАЖИРСКОМ МОДУЛЕ"
			}, {
				character: 1,
				text: "Таня, мы уже говорили по этому поводу, ещё одно замыкание от шампанского ты не переживешь."
			},
		],

		"events": {
			[Events.event7]: {
				imageKey: 6,
				title: "Проигрыш",
				text: "У капитана закончился кислород и теперь он никогда больше не выпьет любимого кофе. Попробуем еще раз?"
			},
			[Events.event1]: {
				imageKey: 2,
				title: "1. Зыбучий песок.",
				text: "Капитан угодил в ловушку. Чтобы выбраться, нужно использовать сжатый воздух или подать питание на синтетические мышцы скафандра."
			},
			[Events.event2]: {
				imageKey: 3,
				title: "2. Нападение зверя крокодила",
				text: "Местная фауна хочет полакомиться капитаном. Чтобы избежать передряги, он может убежать или воспользоваться бластером."
			},
			[Events.event3]: {
				imageKey: 0,
				title: "3. Лиана",
				text: "Местная флора ещё опаснее фауны. Чтобы освободиться, необходимо активно раскачиваться или выстрелить в лиану."
			},
			[Events.event4]: {
				imageKey: 4,
				title: "4. Монстры",
				text: "Подойдя ближе, капитан замечает, что у предмета выросли лапки и сотни мелких зубов. Пора бежать? Или сконцентрировать на монстре всю энергию?"
			},
			[Events.event5]: {
				imageKey: 5,
				title: "5. Гейзер",
				text: "Выбросы гейзера богаты кислородом и бедны аммиаком. Чтобы отделить его от вредных примесей и получить 10 кислорода капитану потребуется энергия."
			},
			[Events.event6]: {
				imageKey: 1,
				title: "6. Электромох",
				text: "Этот мох накопил в себе колоссальную энергию! Чтобы отделить её от мха, капитану нужно активно об него потереться, истратив при этом немного кислорода."
			},
			[Events.oxygen1]: [
				{
					character: 2,
					text: "КАПИТАН, ЗАПАС КИСЛОРОДА МЕНЕЕ 10%"
				}, {
					character: 1,
					text: "Хорошо, буду дышать через раз."
				},
			],
			[Events.oxygen2]: [
				{
					character: 2,
					text: "КАПИТАН, ЗАПАС КИСЛОРОДА ИССЕКАЕТ."
				},
			],
			[Events.oxygen3]: [
				{
					character: 2,
					text: "КИСЛОРОД ЗАКАНЧИВАЕТСЯ КАПИТАН!"
				}, {
					character: 1,
					text: "Я чувствую запах опасности. Ой, а может это другой запах?"
				},
			],
			[Events.oxygenMushroom]: [
				{
					title: "Первый раз поднимаем гриб кислород:",
					character: 2,
					text: "КАПИТАН, ЭТОТ ГРИБ СОСТОИТ НА 66% ИЗ КИСЛОРОДА. СОБИРАЙТЕ ИХ, ЧТОБЫ ПОПОЛНИТЬ ЗАПАС."
				}, {
					title: "Первый раз подираем электро фрукт",
					character: 2,
					text: "КАПИТАН, ЭТО ФРУКТ КАТОДНО-АНОДНОГО ДЕРЕВА, СОБИРАЯ ИХ ВЫ ПОПОЛНЯЕТЕ ЭНЕРГИЮ В ЭНЕРГОЯЧЕЙКАХ, ЕСЛИ, КОНЕЧНО, ОНИ У ВАС ЕСТЬ."
				},
			],
		},
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