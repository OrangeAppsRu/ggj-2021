import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadScene extends BaseScene {
	@property(cc.ProgressBar)
	progressBar = null;


	onLoad() {
		super.onLoad();
		this.preloadGameScenes();
	}

	preloadGameScenes() {
		cc.director.preloadScene('Intro', () => {cc.log('Scene two preloaded')});
		cc.director.preloadScene('Main',() => {cc.log('Scene three preloaded')});
		cc.director.loadScene('Menu');
	}
}
