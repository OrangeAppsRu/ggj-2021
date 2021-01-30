import BaseScene from "./BaseScene";

const {ccclass} = cc._decorator;

@ccclass
export default class MenuScene extends BaseScene {

	onLoad() {
		super.onLoad();
	}

	startNewGame() {
		cc.director.loadScene('Intro');
		cc.log('Intro Launched');
	}

	resumeGame() {
		cc.director.loadScene('Main');
		cc.log('Main Scene Launched');
	}
}
