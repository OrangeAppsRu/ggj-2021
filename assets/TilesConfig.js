export const Tiles = {
    dirt: 101,
    grass: 102,
    mud: 103,
    water: 104,
    mountain: 201,
    acid: 202,
    shrubbery: 301,
    animals: 302,
    quickSand: 401,
    waterAmbush: 402,
    liana: 403,
    beast: 404,
    moss: 501,
    geyser: 502
};

export const TilePrices = [
    {
        type: Tiles.dirt,
        oxygenDemand: 1,
    },
    {
        type: Tiles.grass,
        oxygenDemand: 1,
    },
    {
        type: Tiles.mud,
        oxygenDemand: 2,
    },
    {
        type: Tiles.water,
        oxygenDemand: 3,
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
        oxygenDemand: 3,
        energyDemand: 1
    },
    {
        type: Tiles.animals,
        oxygenDemand: 2,
        energyDemand: 2
    }
];