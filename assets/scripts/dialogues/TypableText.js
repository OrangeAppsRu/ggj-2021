import {Locale} from '../Locale';

const {ccclass, property} = cc._decorator;

@ccclass
export class TypableText extends cc.Component {
	@property(cc.Label)
	label = null;

	@property(cc.Label)
	characterName = null;

	processDialogue (text) {
		this.isTextTyping = true;
		this.setCharacterName(Locale.getString('characters')[text.character]);
		this.setText(text.text);
	}

	setText (text) {
		for (let i = 0; i <= text.length; ++i) {
			this.scheduleOnce(() => {
				this.label.string = text.substr(0, i);

				if (i === text.length) {
					this.isTextTyping = false;
				}
			}, i / 30);
		}
	}

	setCharacterName (name) {
		this.characterName.string = name + ': ';
	}

	get isTextTyping () {
		return this.textIsTyping;
	}

	set isTextTyping (value) {
		this.textIsTyping = value;
	}
}
