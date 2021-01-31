/**
 * @Class
 */
export class MoveController {
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
        return this._player.oxygen - price.oxygen > 0 && this._player.energy - price.energy > 0;
    }

    /**
     * @param  {number} tileType
     * @returns {boolean}
     */
    makeMove(tileType) {
        if (this.isPossibleMove(tileType)) {
            this._updatePlayer(tileType);
            return true;
        }

        return false;
    }

    /**
     * @param  {number} tileType
     * @private
     */
    _updatePlayer(tileType) {
        const price = this._calculator.calcMovePrice(tileType);

        this._player.oxygen -= price.oxygen;
        this._player.energy -= price.energy;
    }
}