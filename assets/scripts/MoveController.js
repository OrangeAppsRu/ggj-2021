/**
 * @Class
 */
export class GameController {
    constructor(player, calculator) {
        this._player = player;
        this._calculator = calculator;
    }

    /**
     * @param  {number} tileType
     * @returns {boolean}
     */
    isPossibleMove(tileType) {
        let price = this._calculator.calcMovePrice(tileType);
        let isPassable = this._calculator.isPassable(tileType);

        return isPassable && this._player.oxygen.get() - price.oxygen > 0 && this._player.energy.get() - price.energy > 0;
    }


    makeMove(tileType) {
        if (this.isPossibleMove(tileType)) {
            this.updatePlayer(tileType);
            return true;
        }

        return false;
    }

    updatePlayer(tileType) {
        const oldOxygen = this._player.oxygen.get();
        const oldEnergy = this._player.energy.get();
        const price = this._calculator.calcMovePrice(tileType);

        this._player.oxygen.set(oldOxygen - price.oxygen);
        this._player.energy.set(oldEnergy - price.energy);
    }
}