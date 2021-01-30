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
		cc.director.preloadScene('Menu', () => {cc.log('Scene one preloaded')});
		cc.director.preloadScene('Intro', () => {cc.log('Scene two preloaded')});
		cc.director.preloadScene('Main',() => {cc.log('Scene three preloaded')});
	}

}
