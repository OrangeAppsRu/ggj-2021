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

    /**
     * @type {cc.Component}
     * @private
     */
    _currentEntity = null;
    
    onLoad() {
        super.onLoad();

        this._gameMap.addEntity(this._hero.node);
        this._hero.node.setPosition(this._gameMap.getPositionAt({x: 3, y: 3}));

        this._hero.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();

            this._currentEntity = this._hero;

            const tile = this._gameMap.getTileAt(this._hero.getGlobalPosition());

            this._gameMap.highlightTiles(tile, 2);
        });

        this._gameMap.node.on('select', (tile, position) => {
            this._hero.node.runAction(cc.sequence([
                cc.callFunc(() => this._gameMap.clearSelection()),
                cc.moveTo(0.5, position),
            ]));
        });
    }
}
