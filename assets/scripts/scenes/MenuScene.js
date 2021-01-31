import BaseScene from "./BaseScene";
import {Config} from "../../config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuScene extends BaseScene {
	@property(cc.AudioClip)
	btnSound = null;

	@property(cc.AudioClip)
	backgroundMusic = null;

	onLoad() {
		cc.audioEngine.playMusic(this.backgroundMusic, true);
		super.onLoad();
	}

	onDisable() {
		cc.audioEngine.stopMusic();
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
