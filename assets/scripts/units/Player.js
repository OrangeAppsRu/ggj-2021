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
    }

    get oxygen() {
        return this._oxygen;
    }

    set oxygen(amount) {
        this._oxygen = Math.min(amount, Config.maxOxygen);
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
                this.addInventory(data.item);
            }
        }
    }
}