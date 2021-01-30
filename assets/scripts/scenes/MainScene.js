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

        this._hero.node.on(cc.Node.EventType.TOUCH_END, this._selectHero, this);

        this._gameMap.node.on(GameMap.EVENT_INPUT_TILE, this._clearSelection, this);
        this._gameMap.node.on(GameMap.EVENT_SELECT_TILE, this._moveEntity, this);
    }

    _clearSelection() {
        this._gameMap.clearSelection();
        this._currentEntity = null;
    }

    _selectHero(event) {
        event.stopPropagation();

        this._currentEntity = this._hero;

        const tile = this._gameMap.getTileAt(this._hero.getGlobalPosition());
        
        this._gameMap.highlightMove(tile);
    }

    _moveEntity(tile, position) {
        if (this._currentEntity) {
            const currentTile = this._gameMap.getTileAt(this._hero.getGlobalPosition());
            const direction = cc.v2(tile.x, tile.y).sub(cc.v2(currentTile.x, currentTile.y)).normalize();
            const toTile = {x: currentTile.x + direction.x, y: currentTile.y + direction.y};
            
            position = this._gameMap.getPositionAt(toTile);

            this._currentEntity.node.runAction(cc.sequence([
                cc.moveTo(0.5, position),
                cc.callFunc(() => this._gameMap.highlightMove(toTile)),
                cc.callFunc(() => this._centerGameMap()),
            ]));
        }
    }
}
