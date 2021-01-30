export class TileInfo {
    constructor(tilePrices) {
        this.tileprices = tilePrices;
    }

    isPassable(tileType) {
        let tile = this.tileprices.find(info => info.type === tileType);
        return !!tile.passable;
    }

    calcMovePrice(tileType) {
        let tile = this.tileprices.find(info => info.type === tileType);
        return {oxygen: tile.oxygenDemand || 0, energy: tile.energyDemand || 0};
    }
}