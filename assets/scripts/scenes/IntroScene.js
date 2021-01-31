import BaseScene from './BaseScene';
import {Locale} from '../Locale';
import {Config} from "../../config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntroScene extends BaseScene {
	@property(cc.Node)
	background = null

	@property(cc.SpriteFrame)
	backgroundImage1 = null;

	@property(cc.SpriteFrame)
	backgroundImage2 = null;

	@property(cc.SpriteFrame)
	backgroundImage3 = null;

	// @property(cc.AudioClip)
	// slideSound1 = null;
	//
	// @property(cc.AudioClip)
	// slideSound2 = null;
	//
	// @property(cc.AudioClip)
	// slideSound3 = null;

	onLoad () {
		super.onLoad();

		this.dialogueText = Locale.getString('introDialogue');
		this.playedText = 0;

		this.processDialogue();

		this.node.on(cc.Node.EventType.TOUCH_START, this.processDialogue, this);
	}

	processDialogue () {
		this.renderText(this.node.getChildByName('dialogue'));
		this.updateBackground();
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

	updateBackground () {
		const spriteComponent = this.background.getComponent(cc.Sprite);

		if (spriteComponent) {
			let backgroundImageSpriteFrame = 1;
			let slideSound = 1;

			switch (this.playedText) {
				case 5:
				case 6:
					backgroundImageSpriteFrame = 2;
					slideSound = 1;
					break;
				case 7:
					backgroundImageSpriteFrame = 3;
					slideSound = 1;
					break;
			}

			spriteComponent.spriteFrame = this['backgroundImage' + backgroundImageSpriteFrame];
			// cc.audioEngine.play(this['slideSound' + slideSound, false, Config.sound]);
		}
	}
}
