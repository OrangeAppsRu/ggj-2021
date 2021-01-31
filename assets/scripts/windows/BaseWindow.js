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
}