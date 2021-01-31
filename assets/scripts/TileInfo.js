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

        if (tile) {
            return {
                oxygen: tile.oxygen || 0, 
                energy: tile.energy || 0,
                oxygenSupply: tile.oxygenSupply || 0,
                energySupply: tile.energySupply || 0,
            };
        }
        
        return {oxygen: 0, energy: 0, oxygenSupply: 0, energySupply: 0};
    }
}