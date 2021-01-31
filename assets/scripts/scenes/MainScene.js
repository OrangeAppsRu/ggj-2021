import {GameMap} from "../game/GameMap";
import {Hero} from "../game/Hero";
import BaseScene from "./BaseScene";
import {Dialogue} from "../dialogues/Dialogue";
import {Player} from "../units/Player";
import {TileInfo} from "../TileInfo";
import {MoveController} from "../MoveController";
import {TilePrices, Tiles} from "../../TilesConfig";
import {Locale} from '../Locale';
import {Events} from '../../EventsConfig';

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
     * @type {cc.Prefab}
     * @private
     */
    @property(cc.Prefab)
    window = null;

    /**
     * @type {cc.Component}
     * @private
     */
    _currentEntity = null;

    /**
     * @type {Player} player
     * @private
     */
    _player = null;

    _centerGameMap() {
        const position = this._hero.getGlobalPosition();
        const frameSize = cc.view.getVisibleSize();
        const direction = cc.v2(frameSize.width / 2  - position.x, frameSize.height / 2 - position.y);

        if (direction.len() > 150) {
            this._gameMap.node.runAction(cc.moveBy(0.5, direction));
        }
    }
    
    start() {
        this._ui = this.getComponent('UI');
        this._player = new Player();
        this._moveController = new MoveController(this._player, new TileInfo(TilePrices));

        this._dialogue = new Dialogue(this.node.getChildByName('mainUI').getChildByName('dialogue'));

        if(cc.sys.localStorage.getItem('newGame')) {
            cc.sys.localStorage.removeItem('newGame');
            this._dialogue.runTalk('mainDialogue');
        }

        this._ui.setEnergy(this._player.energy);
        this._ui.setOxygen(this._player.oxygen);

        this._gameMap.addEntity(this._hero.node);
        this._hero.node.setPosition(this._gameMap.getPositionAt({x: 50, y: 50}));
        this._selectHero();

        this._hero.node.on(cc.Node.EventType.TOUCH_END, this._onSelectHero, this);

        this._gameMap.node.on(GameMap.EVENT_SELECT_TILE, this._moveEntity, this);

        // TODO: Открывааем окно по событию
        // this._openWindow(Events.event6);
    }

    _clearSelection() {
        this._gameMap.clearSelection();
        this._currentEntity = null;
    }

    _selectHero() {
        this._currentEntity = this._hero;

        const tile = this._gameMap.getTileBy(this._hero.getGlobalPosition());
        
        this._gameMap.highlightMove(tile);
    }

    _onSelectHero(event) {
        event.stopPropagation();

        this._selectHero();
    }

    _moveEntity(tile, position) {
        if (this._currentEntity) {
            const currentTile = this._gameMap.getTileBy(this._hero.getGlobalPosition());
            const direction = cc.v2(tile.x, tile.y).sub(cc.v2(currentTile.x, currentTile.y)).normalize();
            const toTile = this._gameMap.getTileAt({x: currentTile.x + direction.x, y: currentTile.y + direction.y});
            
            let tileId = 101;

            const properties = this._gameMap.getPropertiesForGID(toTile.gid);
            if (properties) {
                tileId = properties.id;
            }

            if (this._gameMap.canMove(toTile) && this._moveController.isPossibleMove(tileId)) {
                position = this._gameMap.getPositionAt(toTile);
                this._moveController.makeMove(tileId);
                
                const duration = 0.2;
                this._currentEntity.node.runAction(cc.sequence([
                    cc.spawn([
                        cc.moveTo(duration, position).easing(cc.easeBounceInOut()),
                        cc.callFunc(() => this._hero.playMoveAnimation(direction)),
                    ]),
                    cc.callFunc(() => {
                       this._ui.setEnergy(this._player.energy);
                       this._ui.setOxygen(this._player.oxygen);
                    }),
                    cc.callFunc(() => this._gameMap.highlightMove(toTile)),
                    cc.callFunc(() => this._centerGameMap()),
                    cc.callFunc(() => this._processTile(tile)),
                ]));
            }
        }
    }

    _openWindow(event) {
        if (this.window) {
            const window = cc.instantiate(this.window);

            this.node.addChild(window);

            const text = Locale.getString('events')[event];

            window.getComponent('BaseWindow').setSpriteFrame(text.imageKey);
            window.getComponent('BaseWindow').playDialogue([text]);
        }
    }

    _processTile(tile) {
        const {gid} = tile;
        const properties = this._gameMap.getPropertiesForGID(gid);

        if (properties) {
            // TODO: Обработка свойств и тайлов
            // this._gameMap.removeTile(tile);

            if (properties.id) {
                cc.log('id:', properties.id);
            }
        }
    }
}
