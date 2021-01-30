const {ccclass, property} = cc._decorator;

@ccclass
export class DialogueImage extends cc.Component {
	@property(cc.Node)
	spriteNode = null;

	@property(cc.SpriteFrame)
	character1 = null;

	@property(cc.SpriteFrame)
	character2 = null;

	setSpriteFrame (character) {
		const spriteComponent = this.spriteNode.getComponent(cc.Sprite);

		if (spriteComponent) {
			spriteComponent.spriteFrame = this['character' + character];
		}
	}
}
