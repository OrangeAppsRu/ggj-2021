import BaseScene from './BaseScene';

const {ccclass} = cc._decorator;

@ccclass
export default class IntroScene extends BaseScene {
	onLoad () {
		super.onLoad();

		this.node.on(cc.Node.EventType.TOUCH_START, this.processDialogue, this);
	}

	processDialogue () {
		this.node.getChildByName('dialogue').getComponent('TypableText').processDialogue();
	}
}
