import {GameMap} from '../game/GameMap';
import BaseScene from './BaseScene';

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends BaseScene {
    @property({
        type: GameMap,
        visible: true,
    })
    _gameMap = null;
    
    onLoad() {
        super.onLoad();
    }
}
