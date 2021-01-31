import {GameMap} from '../game/GameMap';
import {Hero} from '../game/Hero';
import BaseScene from './BaseScene';
import {Dialogue} from "../dialogues/Dialogue";
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

        this._dialogue = new Dialogue(this.node.getChildByName('mainUI').getChildByName('dialogue'));

        if(cc.sys.localStorage.getItem('newGame')) {
            cc.sys.localStorage.removeItem('newGame');
            this._dialogue.runTalk('mainDialogue');
        }

        this._gameMap.addEntity(this._hero.node);
        this._hero.node.setPosition(this._gameMap.getPositionAt({x: 50, y: 50}));

        this._hero.node.on(cc.Node.EventType.TOUCH_END, this._selectHero, this);

        this._gameMap.node.on(GameMap.EVENT_SELECT_TILE, this._moveEntity, this);

        // TODO: Открывааем окно по событию
		// this._openWindow(Events.event6);
    }

    _clearSelection() {
        this._gameMap.clearSelection();
        this._currentEntity = null;
    }

    _selectHero(event) {
        event.stopPropagation();

        this._currentEntity = this._hero;

        const tile = this._gameMap.getTileBy(this._hero.getGlobalPosition());

        this._gameMap.highlightMove(tile);
    }

    _moveEntity(tile, position) {
        if (this._currentEntity) {
            const currentTile = this._gameMap.getTileBy(this._hero.getGlobalPosition());
            const direction = cc.v2(tile.x, tile.y).sub(cc.v2(currentTile.x, currentTile.y)).normalize();
            const toTile = this._gameMap.getTileAt({x: currentTile.x + direction.x, y: currentTile.y + direction.y});

            if (this._gameMap.canMove(toTile)) {
                position = this._gameMap.getPositionAt(toTile);

                this._currentEntity.node.runAction(cc.sequence([
                    cc.spawn([
                        cc.moveTo(0.5, position),
                        cc.callFunc(() => this._hero.playMoveAnimation(direction)),
                    ]),
                    cc.callFunc(() => this._gameMap.highlightMove(toTile)),
                    cc.callFunc(() => this._centerGameMap()),
                ]));
            }
        }
    }

    _openWindow (event) {
        if (this.window) {
            const window = cc.instantiate(this.window);

            this.node.addChild(window);

            const text = Locale.getString('events')[event];

            window.getComponent('BaseWindow').setSpriteFrame(text.imageKey);
            window.getComponent('BaseWindow').playDialogue([text]);
        }
    }
}
