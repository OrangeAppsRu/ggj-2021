import {Dialogue} from '../dialogues/Dialogue';

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseWindow extends cc.Component {
	@property(cc.Node)
	contentNode = null;

	@property({
		type: cc.SpriteFrame,
	})
	ballSprites = [];

	onLoad () {
		const buttonsNode = this.node.getChildByName('buttons');
		buttonsNode.getChildByName('continueButton').on(cc.Node.EventType.TOUCH_START, this._processContinueButtonClick, this);
		buttonsNode.getChildByName('playButton').on(cc.Node.EventType.TOUCH_START, this._processPlayButtonClick, this);
	}

	_processContinueButtonClick () {
		this.node.removeFromParent(true);
		this._player.oxygen -= 3;
	}

	_processPlayButtonClick () {
		this.node.removeFromParent(true);
		this._player.energy -= 1;
	}

	setSpriteFrame (spriteFrame) {
		const spriteComponent = this.contentNode.getComponent(cc.Sprite);

		if (spriteComponent) {
			spriteComponent.spriteFrame = this.ballSprites[spriteFrame];
		}
	}

	playDialogue (text) {
		this._dialogue = new Dialogue(this.node.getChildByName('description'));
		this._dialogue.runTalk(text);
	};

	set player (player) {
		this._player = player
	}
}