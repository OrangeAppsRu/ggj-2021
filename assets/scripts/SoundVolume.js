import {Config} from '../config';

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundVolume extends cc.Component {
	@property(cc.ProgressBar)
	progressBar = null;

	@property(cc.Node)
	knob = null;

	onLoad() {
		this.knob.on('touchmove', this.onTouchMoved, this);
	}

	_onTouchMoved(event) {
		let newVal = this.knob.x + event.getDeltaX();
		let barWidth = this.progressBar.node.width;

		if (newVal < 0 || newVal > barWidth) {
			return;
		}

		this.knob.x = newVal;
		this.progressBar.progress = newVal / barWidth;
		Config.sound = newVal / barWidth
	}
}