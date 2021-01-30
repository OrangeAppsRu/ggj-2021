import {Config} from './config';

export const Tiles = {
    dirt: 101,
    grass: 102,
    mud: 103,
    water: 104,
    mountain: 201,
    acid: 202,
    shrubbery: 301,
    animals: 302,
    base: 401
};

export const TilePrices = [
    {
        type: Tiles.dirt,
        oxygen: 1,
    },
    {
        type: Tiles.grass,
        oxygen: 1,
    },
    {
        type: Tiles.mud,
        oxygen: 2,
    },
    {
        type: Tiles.water,
        oxygen: 3,
    },
    {
        type: Tiles.mountain,
        passable: false,
    },
    {
        type: Tiles.acid,
        passable: false,
    },
    {
        type: Tiles.shrubbery,
        oxygen: 3,
        energy: 1
    },
    {
        type: Tiles.animals,
        oxygen: 2,
        energy: 2
    },
    {
        type: Tiles.base,
        oxygenSupply: Config.maxOxygen,
        energySupply: Config.maxEnergy
    }
];