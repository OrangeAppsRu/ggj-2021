import BaseScene from "./BaseScene";
import {Config} from "../../config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuScene extends BaseScene {
	@property(cc.AudioClip)
	btnSound = null;

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

	playBtnSound() {
		cc.audioEngine.play(this.btnSound, false, Config.sound);
	}
}
