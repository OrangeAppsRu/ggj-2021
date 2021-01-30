import {GameMap} from '../game/GameMap';
import {Hero} from '../game/Hero';
import BaseScene from './BaseScene';

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends BaseScene {
    /**
     * @type {GameMap}
     * @private
     */
    @property({
        type: GameMap,
        visible: true,
    })
    _gameMap = null;

    /**
     * @type {Hero}
     * @private
     */
    @property({
        type: Hero,
        visible: true,
    })
    _hero = null;
    
    start() {
        super.onLoad();

        this._gameMap.addEntity(this._hero.node);
        this._gameMap.node.on('select', (tile) => {
            const {x, y} = this._gameMap.getEntityPositionAt(tile);

            this._hero.node.setPosition(x, y);
        });
    }
}
