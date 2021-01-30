import BaseScene from './BaseScene';
const {ccclass, property} = cc._decorator;
const loadableScenes = ['Intro', 'Main', 'Menu'];

@ccclass
export default class LoadScene extends BaseScene {
	@property(cc.ProgressBar)
	progressBar = null;

	onLoad() {
		super.onLoad();
		this._preloadGameScenes()
			.then(() => {
				cc.director.loadScene('Menu');
			})
	}

	/**
	 * @returns {Promise<Array>}
	 * @private
	 */
	_preloadGameScenes() {
		return Promise.all(loadableScenes.map(scene => {
			return new Promise(resolve => {
				cc.director.preloadScene(
					scene,
					(completed, total) => {
						this._updateProgressBar(1 / loadableScenes.length / total);
					},
					resolve)
			});
		}));
	}

	/**
	 * @param {Number}addedProgress
	 * @private
	 */
	_updateProgressBar(addedProgress) {
		this.progressBar.progress += addedProgress;
	}
}