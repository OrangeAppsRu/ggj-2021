
/**
 * @Class
 */
export class Player{
    _oxygen = 0;
    _energy = 0;
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

    isPossibleMove(cost) {
        return this.oxygen.get() - cost > 0;
    }

    addOxygen(amount) {
        this._oxygen += amount;
    }

    removeOxygen(amount) {
        this._oxygen -= amount;
    }

    addInventory(item) {
        this._inventory.push(item);
    }

    hasItem(item) {
        return this._inventory.indexOf(item) !== -1;
    }
    
    addEnergy(amount) {
        this._energy += amount;
    }
    
    removeEnergy(amount) {
        this._energy -= amount;
    }
}