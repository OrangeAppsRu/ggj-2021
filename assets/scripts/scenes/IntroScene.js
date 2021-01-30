import BaseScene from './BaseScene';
import {Locale} from '../Locale';

const {ccclass} = cc._decorator;

@ccclass
export default class IntroScene extends BaseScene {
	onLoad () {
		super.onLoad();

		this.dialogueText = Locale.getString('mainDialogue');
		this.playedText = 0;

		this.processDialogue();

		this.node.on(cc.Node.EventType.TOUCH_START, this.processDialogue, this);
	}

	processDialogue () {
		const dialogueNode = this.node.getChildByName('dialogue');
		const dialogueImageComponent = dialogueNode.getComponent('DialogueImage');
		const typableTextComponent = dialogueNode.getComponent('TypableText');

		if (!typableTextComponent.isTextTyping) {
			typableTextComponent.isTextTyping = true;

			const textToShow = this.dialogueText[this.playedText];

			if (textToShow) {
				dialogueImageComponent.setSpriteFrame(textToShow.character);
				typableTextComponent.processDialogue(textToShow);
				this.playedText++;
			}
		}
	}
}
