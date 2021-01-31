import BaseScene from "./BaseScene";

const {ccclass} = cc._decorator;

@ccclass
export default class MenuScene extends BaseScene {

	onLoad() {
		super.onLoad();
	}

	startNewGame() {
		cc.sys.localStorage.setItem('newGame', true);
		cc.director.loadScene('Intro');
	}

	resumeGame() {
		cc.director.loadScene('Main');
	}
}
