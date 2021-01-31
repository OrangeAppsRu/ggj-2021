import {Config} from "../../config";
import {ItemsPrices} from '../../ItemsConfig';

/**
 * @Class
 */

export class Player{
    _oxygen = Config.maxOxygen;
    _energy = Config.maxEnergy;
    _inventory = [];

    get energy() {
        return this._energy;
    }

    set energy(amount) {
        this._energy = Math.min(amount, Config.maxEnergy);

        cc.game.emit('updatePlayer', this);cc.game.emit('updatePlayer', this);
    }

    get oxygen() {
        return this._oxygen;
    }

    set oxygen(amount) {
        this._oxygen = Math.min(amount, Config.maxOxygen);

        cc.game.emit('updatePlayer', this);
    }

    get inventory() {
        return this._inventory;
    }

    set inventory(items) {
        this._inventory = items
    }

    addInventory(item) {
        this._inventory.push(item);
    }

    hasItem(item) {
        return this._inventory.indexOf(item) !== -1;
    }

    applyItem(id) {
        const data = ItemsPrices.find(obj => obj.id === id);

        if (data) {
            if (data.points) {

            }

            if (data.maxEnergy) {
                this.energy += data.maxEnergy;
            }

            if (data.maxOxygen) {
                this.oxygen += data.maxOxygen;
            }

            if (data.item) {

                if (!this.hasItem(data.item)) {
                    cc.game.emit('newItem', id);
                }

                this.addInventory(data.item);
            }
        }
    }
}