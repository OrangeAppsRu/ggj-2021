import {Config} from '../config';

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundVolume extends cc.Component {
	@property(cc.ProgressBar)
	progressBar = null;

	@property(cc.Node)
	knob = null;

	onLoad() {
		if (cc.sys.localStorage.getItem('volume')) {
			let volume = cc.sys.localStorage.getItem('volume');
			Config.sound = volume;
			this.progressBar.progress = volume;
		}
		this.knob.on('touchmove', this._onTouchMoved, this);
	}

	_onTouchMoved(event) {
		const barWidth = this.progressBar.node.width;
		const newVal = this.progressBar.totalLength + event.getDeltaX();

		if (newVal < 0 || newVal > barWidth) {
			return;
		}

		this.progressBar.totalLength += event.getDeltaX();

		Config.sound = newVal / barWidth;
		cc.sys.localStorage.setItem('volume', Config.sound);
	}
}