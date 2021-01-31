import {Config} from "../../config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {
    @property({
        type: cc.Label,
        visible: true
    })
    _energyLabel = null;

    @property({
        type: cc.Label,
        visible: true
    })
    _oxygenLabel = null;

    setEnergy(amount) {
        this._energyLabel.string = `${amount}/${Config.maxEnergy}`
    }

    setOxygen(amount) {
        this._oxygenLabel.string = `${amount}/${Config.maxOxygen}`
    }
}
