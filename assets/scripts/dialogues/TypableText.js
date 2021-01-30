import {Locale} from '../Locale';

const {ccclass, property} = cc._decorator;

@ccclass
export class TypableText extends cc.Component {
	@property(cc.Label)
	label = null;

	@property(cc.Label)
	characterName = null;

	onLoad () {
		this.dialogueText = Locale.getString('introDialogue');
		this.playedText = 0;
		this.textIsTyping = false;

		this.processDialogue();
	}

	setText (text) {
		this.characterName.string = text.character + ': ';

		const characterText = text.text;

		for (let i = 0; i <= characterText.length; ++i) {
			this.scheduleOnce(() => {
				this.label.string = characterText.substr(0, i);

				if (i === characterText.length) {
					this.textIsTyping = false;
					this.playedText++;
				}
			}, i / 30);
		}
	}

	processDialogue () {
		if (!this.textIsTyping) {
			this.playText();
		}
	}

	playText () {
		const textToPlay = this.dialogueText[this.playedText];

		if (textToPlay) {
			this.textIsTyping = true;
			this.setText(this.dialogueText[this.playedText]);
		}
	}
}
