const {ccclass, property} = cc._decorator;

const DIRECTIONS = [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0],
];

@ccclass
export class GameMap extends cc.Component {
    /**
     * @type {cc.TiledMap}
     * @private
     */
    @property({
        type: cc.TiledMap,
        visible: true,
    })
    _tiledMap = null;

    /**
     * @type {cc.TiledLayer}
     */
    @property({
        type: cc.TiledLayer,
        visible: true,
    })
    _selectionLayer = null;

    /**
     * @type {number}
     * @private
     */
    _selectionGID = 2;

    _hightlightGID = 3;

    _selectedTiles = [];

    /**
     * @type {cc.TiledLayer}
     */
    @property({
        type: cc.TiledLayer,
        visible: true,
    })
    _tileLayer = null;

    /**
     * @override
     * @public
     */
    onLoad() {
        this._initInput();
        this._initSelection();
    }

    _initSelection() {
        const size = this._selectionLayer.getLayerSize();

        for (let i = 0; i < size.width; i++) {
            for (let j = 0; j < size.height; j++) {
                this.selectTileAt({x: i, y: j});
            }
        }
    }

    _initInput() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    }

    /**
     * @param {cc.Event.EventTouch} event
     * @private
     */
    _onTouchEnd(event) {
        const tile = this.getTileBy(event.touch.getLocation());

        if (tile) {
            const tilePosition = this.getPositionAt(tile);
            const selectedTile = this._selectedTiles.find((selectedTile) => selectedTile.x === tile.x && selectedTile.y === tile.y);
            const event = selectedTile ? GameMap.EVENT_SELECT_TILE : GameMap.EVENT_INPUT_TILE;

            this.node.emit(event, tile, tilePosition);
        }
    }

    getTileAt({x, y}) {
        return this._tileLayer.getTiledTileAt(x, y, true);
    }

    getTileBy(position) {
        position = this._selectionLayer.node.convertToNodeSpaceAR(position);

        const layerSize = this._selectionLayer.getLayerSize();
        const mapTileSize = this._selectionLayer.getMapTileSize();

        const nodeScaleX = this._selectionLayer.node.scaleX;
        const nodeScaleY = this._selectionLayer.node.scaleY;

        const px = position.x * nodeScaleX;
        const py = position.y * nodeScaleY;

        const x = Math.floor(layerSize.height - py / mapTileSize.height + px / mapTileSize.width - layerSize.width / 2);
        const y = Math.floor(layerSize.height - py / mapTileSize.height - px / mapTileSize.width + layerSize.width / 2) - layerSize.height;

        if (x >= 0 && x < layerSize.width && y >= 0 && y < layerSize.height) {
            return this._tileLayer.getTiledTileAt(x, y, true);
        }

        return null;
    }

    _isContains({x, y}) {
        const size = this._tiledMap.getMapSize();

        return x >= 0 && x < size.width && y >= 0 && y < size.height;
    }

    _setSelection(tile, gid) {
        if (this._isContains(tile)) {
            if (gid !== 0) {
                this._selectedTiles.push(tile);
            }

            this._selectionLayer.setTileGIDAt(gid, tile.x, tile.y);
        }
    }

    clearSelection() {
        for (const tile of this._selectedTiles) {
            this._setSelection(tile, 0);
        }

        this._selectedTiles = [];
    }

    /**
     * @param {Object} position
     * @param {number} position.x
     * @param {number} position.y
     * @public
     */
    selectTileAt(tile) {
        this.clearSelection();
        this._setSelection(tile, this._selectionGID);
    }

    highlightTiles(tiles) {
        this.clearSelection();
        
        for (const tile of tiles) {
            this._setSelection(tile, this._hightlightGID);
        }
    }

    addEntity(entity) {
        this._tileLayer.addUserNode(entity);
    }

    /**
     * @param {cc.Vec2} position
     * @returns {cc.Vec2}
     */
    getPositionAt({x, y}) {
        const p = this._tileLayer.getPositionAt(x, y);
        const mapSize = this._tiledMap.getMapSize();
        const tileSize = this._tiledMap.getTileSize();

        p.x -= (mapSize.width / 2 - 1) * tileSize.width + tileSize.width / 2;
        p.y -= (mapSize.height / 2 - 1) * tileSize.height;

        return p;
    }

    getPropertiesForGID(gid) {
        return this._tiledMap.getPropertiesForGID(gid);
    }

    getTiles(center, filter) {
        const tiles = [];
        const dirs = [];
        const distance = 1;

        for (let i = 1; i <= distance; i++) {
            for (const dir of DIRECTIONS) {
                dirs.push([dir[0] * i, dir[1] * i]);
            }
        }

        for (const dir of dirs) {
            const x = center.x + dir[0];
            const y = center.y + dir[1];

            if (this._isContains({x, y})) {
                const tile = this._tileLayer.getTiledTileAt(x, y, true);

                if (filter) {
                    if (filter(tile, this._tiledMap.getPropertiesForGID(tile.gid))) {
                        tiles.push(tile);
                    }

                } else {
                    tiles.push(tile);
                }
            }
        }

        return tiles;
    }

    highlightMove(tile) {
        const tiles = this.getTiles(tile, (tile, properties) => {
            if (properties && properties.isBlock) {
                return false;
            }

            return true;
        });

        this.highlightTiles(tiles);
    }

    canMove({x, y}) {
        const tile = this._tileLayer.getTiledTileAt(x, y, true);
        const properties = this._tiledMap.getPropertiesForGID(tile.gid);

        if (properties && properties.isBlock) {
            return false;
        }

        return true;
    }
}

GameMap.EVENT_SELECT_TILE = 'selectTile';
GameMap.EVENT_INPUT_TILE = 'inputTile';