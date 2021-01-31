/**
 * @Class
 */
export class TileInfo {
    constructor(tilePrices) {
        this.tileprices = tilePrices;
    }
    /**
     * @param tileType
     * @returns {{oxygen: (number), energy: (number)}}
     */
    calcMovePrice(tileType) {
        let tile = this.tileprices.find(info => info.type === tileType);
        return {oxygen: tile.oxygen || 0, energy: tile.energy || 0};
    }
}