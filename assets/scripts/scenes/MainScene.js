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
import {Config} from "../../config";

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

    @property(cc.AudioClip)
    mainMusic = null;

    @property(cc.AudioClip)
    deathSound = null;

    @property(cc.AudioClip)
    pickupItemSound = null;

    @property(cc.AudioClip)
    eventSound = null;

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

    @property({
        type: cc.Node,
        visible: true,
    })
    _base = null;

    @property(cc.Prefab)
    mapWindow = null;

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

        this._ui.setEnergy(Config.maxEnergy);
        this._ui.setOxygen(Config.maxOxygen);

        cc.game.on('updatePlayer', this._onUpdatePlayer, this);
        cc.game.on('newItem', this._dialogue.runTalk, this);

        this._gameMap.addEntity(this._base);
        this._gameMap.addEntity(this._hero.node);
        this._hero.node.setPosition(this._gameMap.getPositionAt({x: 50, y: 50}));
        this._selectHero();

        this._hero.node.on(cc.Node.EventType.TOUCH_END, this._onSelectHero, this);

        this._gameMap.node.on(GameMap.EVENT_SELECT_TILE, this._moveEntity, this);

        cc.audioEngine.playMusic(this.mainMusic, true);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            switch (event.keyCode) {
                case cc.macro.KEY['e']: {
                    cc.director.loadScene('Final');
                    break;
                }
            }
        });
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

    _onUpdatePlayer(event) {
        this._ui.setEnergy(event.energy);
        this._ui.setOxygen(event.oxygen);
        this._ui.setPoints(event.points);
    }

    _moveEntity(tile, position) {
        if (this._currentEntity) {
            const currentTile = this._gameMap.getTileBy(this._hero.getGlobalPosition());
            const direction = cc.v2(tile.x, tile.y).sub(cc.v2(currentTile.x, currentTile.y)).normalize();
            const toTile = this._gameMap.getTileAt({x: currentTile.x + direction.x, y: currentTile.y + direction.y});
            
            let tileId = 101;

            const properties = this._gameMap.getPropertiesForGID(toTile.gid);
            if (properties && properties.id) {
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
                    cc.callFunc(() => this._checkGameOver()),
                ]));
            }
        }
    }

    _checkGameOver() {
        if (this._player.oxygen === 0) {
            this._openWindow(Events.event7, this._player);

            cc.audioEngine.playEffect(this.deathSound, false);

        } else if (this._player.inventory.length >= 9) {
            cc.director.loadScene('Final');
        }
    }

    _openWindow(event, player) {
        if (this.window) {
            const window = cc.instantiate(this.window);

            this.node.addChild(window);

            const text = Locale.getString('events')[event];
            const baseWindow = window.getComponent('BaseWindow');

            baseWindow.setSpriteFrame(text.imageKey);
            baseWindow.playDialogue([text]);
            baseWindow.player = player;

            if (event === Events.event7) {
                const buttons = baseWindow.node.getChildByName('buttons');
                const continueButton = buttons.getChildByName('continueButton');
                const playButton = buttons.getChildByName('playButton');
                const restartButton = buttons.getChildByName('restart');

                continueButton.active = false;
                playButton.active = false;
                restartButton.active = true;
            }

            cc.audioEngine.playEffect(this.eventSound, false);
        }
    }

    showMap() {
        if (this.mapWindow) {
            const window = cc.instantiate(this.mapWindow);

            this.node.addChild(window);
        }
    }

    _processTile(tile) {
        const {gid} = tile;
        const properties = this._gameMap.getPropertiesForGID(gid);

        if (properties) {
            if (properties.id) {
                this._player.applyItem(properties.id);
                this._gameMap.removeTile(tile);
                cc.audioEngine.playEffect(this.pickupItemSound, false);
            }

            if (properties.event) {
                this._openWindow(properties.event, this._player);
            }
        }
    }
}
