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

    _centerGameMap() {
        const position = this._hero.getGlobalPosition();
        const frameSize = cc.view.getFrameSize();
        const direction = cc.v2(frameSize.width / 2  - position.x, frameSize.height / 2 - position.y);

        if (direction.len() > 150) {
            this._gameMap.node.runAction(cc.moveBy(0.5, direction));
        }
    }
    
    onLoad() {
        super.onLoad();

        this._gameMap.addEntity(this._hero.node);
        this._hero.node.setPosition(this._gameMap.getPositionAt({x: 13, y: 13}));

        this._hero.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();

            this._currentEntity = this._hero;

            const center = this._gameMap.getTileAt(this._hero.getGlobalPosition());
            
            this._gameMap.highlightMove(center);
        });

        this._gameMap.node.on(GameMap.EVENT_INPUT_TILE, () => {
            this._gameMap.clearSelection();
            this._currentEntity = null;
        });

        this._gameMap.node.on(GameMap.EVENT_SELECT_TILE, (tile, position) => {
            if (this._currentEntity) {
                this._currentEntity.node.runAction(cc.sequence([
                    cc.moveTo(0.5, position),
                    cc.callFunc(() => this._gameMap.highlightMove(tile)),
                    cc.callFunc(() => this._centerGameMap()),
                ]));
            }
        });
    }
}
