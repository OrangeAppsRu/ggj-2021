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

    _hightlightGID = 1;

    _selectedTiles = [];

    /**
     * @type {cc.TiledLayer}
     */
    @property({
        type: cc.TiledLayer,
        visible: true,
    })
    _entityLayer = null;

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
        const tile = this.getTileAt(event.touch.getLocation());

        if (tile) {
            const tilePosition = this.getPositionAt(tile);
            const selectedTile = this._selectedTiles.find((selectedTile) => selectedTile.x === tile.x && selectedTile.y === tile.y);

            this.node.emit(GameMap.EVENT_INPUT_TILE, tile, tilePosition);

            if (selectedTile) {
                this.node.emit(GameMap.EVENT_SELECT_TILE, tile, tilePosition);
            }
        }
    }

    getTileAt(position) {
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
            return {x, y};
        }

        return null;
    }

    _isContains({x, y}) {
        const size = this._tiledMap.getMapSize();

        return x >= 0 && x < size.width && y >= 0 && y < size.height;
    }

    _setSelection(tile, gid = 0) {
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
        this._entityLayer.addUserNode(entity);
    }

    /**
     * @param {cc.Vec2} position
     * @returns {cc.Vec2}
     */
    getPositionAt({x, y}) {
        const p = this._entityLayer.getPositionAt(x, y);
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

        for (const dir of DIRECTIONS) {
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
}

GameMap.EVENT_SELECT_TILE = 'selectTile';
GameMap.EVENT_INPUT_TILE = 'inputTile';