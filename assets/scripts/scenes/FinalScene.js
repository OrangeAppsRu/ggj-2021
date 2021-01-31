import BaseScene from './BaseScene';
import {Locale} from '../Locale';
import {Config} from "../../config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class  FinalScene extends BaseScene {
	@property(cc.Node)
	background = null

	@property(cc.SpriteFrame)
	backgroundImage1 = null;

	@property(cc.SpriteFrame)
	backgroundImage2 = null;

	@property(cc.SpriteFrame)
	backgroundImage3 = null;

	@property(cc.AudioClip)
	slideSound = null;

	onLoad () {
		super.onLoad();
		cc.audioEngine.stopAll();
		cc.audioEngine.playMusic(this.slideSound, true);

		this.dialogueText = Locale.getString('finalDialogue');
		this.playedText = 0;

		this.processDialogue();

		this.node.on(cc.Node.EventType.TOUCH_START, this.processDialogue, this);
	}

	onDisable() {
		cc.audioEngine.stopAll();
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
				// cc.director.loadScene('Main');
			}
		}
	}

	updateBackground () {
		const spriteComponent = this.background.getComponent(cc.Sprite);

		if (spriteComponent) {
			let backgroundImageSpriteFrame = 1;

			switch (this.playedText) {
				case 5:
				case 6:
					backgroundImageSpriteFrame = 2;
					break;
				case 7:
					backgroundImageSpriteFrame = 3;
					break;
			}

			spriteComponent.spriteFrame = this['backgroundImage' + backgroundImageSpriteFrame];
		}
	}
}
