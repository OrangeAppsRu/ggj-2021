import BaseScene from './BaseScene';
import {Locale} from '../Locale';

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntroScene extends BaseScene {
	@property(cc.Prefab)
	window = null;

	onLoad () {
		super.onLoad();

		this.dialogueText = Locale.getString('introDialogue');
		this.playedText = 0;

		this.processDialogue();

		this.node.on(cc.Node.EventType.TOUCH_START, this.processDialogue, this);

		// this.openWindow();
	}

	openWindow () {
		if (this.window) {
			const window = cc.instantiate(this.window);

			this.node.addChild(window);
			this.renderText(window.getChildByName('description'));
		}
	}

	processDialogue () {
		this.renderText(this.node.getChildByName('dialogue'));
	}

	renderText (node) {
		const dialogueImageComponent = node.getComponent('DialogueImage');
		const typableTextComponent = node.getComponent('TypableText');

		if (!typableTextComponent.isTextTyping) {
			typableTextComponent.isTextTyping = true;

			const textToShow = this.dialogueText[this.playedText];

			if (textToShow) {
				if (dialogueImageComponent) {
					dialogueImageComponent.setSpriteFrame(textToShow.character);
				}
				typableTextComponent.processDialogue(textToShow);
				this.playedText++;

			} else {
				cc.director.loadScene('Main');
			}
		}
	}
}
