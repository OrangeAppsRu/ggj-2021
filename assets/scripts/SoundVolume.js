import {Config} from '../config';

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundVolume extends cc.Component {
	@property(cc.ProgressBar)
	progressBar = null;

	@property(cc.Node)
	knob = null;

	@property(cc.AudioClip)
	knobSound = null;

	onLoad() {
		if (cc.sys.localStorage.getItem('volume')) {
			Config.sound = cc.sys.localStorage.getItem('volume');
			this.progressBar.progress = 1;
		}

		this.knob.on('touchmove', this._onTouchMoved, this);
		this.knob.on('touchcancel', this._onTouchCancel, this);
		cc.audioEngine.setMusicVolume(Config.sound);
		cc.audioEngine.setEffectsVolume(Config.sound);
	}

	onDestroy() {
		cc.sys.localStorage.setItem('volume', Config.sound);
	}

	_onTouchCancel(event) {
		cc.audioEngine.playEffect(this.knobSound, false);
		cc.sys.localStorage.setItem('volume', Config.sound);
	}

	_onTouchMoved(event) {
		const barWidth = this.progressBar.node.width;
		const newVal = this.progressBar.totalLength + event.getDeltaX();

		if (newVal < 0 || newVal > barWidth) {
			return;
		}

		this.progressBar.totalLength += event.getDeltaX();

		Config.sound = newVal / barWidth;
		cc.audioEngine.setMusicVolume(Config.sound);
		cc.audioEngine.setEffectsVolume(Config.sound);
	}
}