import {Config} from "../../config";

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
        this._energy = amount;
    }

    get oxygen() {
        return this._oxygen;
    }

    set oxygen(amount) {
        this._oxygen = amount;
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
}