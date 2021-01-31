import {Config} from './config';

export const Items = {
    scrapMetal: 1000,
    energyFirst: 2000,
    energySecond: 3000,
    oxygenFirst: 4000,
    oxygenSecond: 5000,
    navigation: 6000,
    scanner: 7000,
    remoteControl: 8000,
    marshmello: 90000,
};


export const ItemsPrices = [
    {
        id: Items.scrapMetal,
        points: 100
    },
    {
        id: Items.energyFirst,
        maxEnergy: 1
    },
    {
        id: Items.marshmello,
        maxOxygen: 15
    },
    {
        id: Items.energySecond,
        maxEnergy: 1
    },
    {
        id: Items.oxygenFirst,
        maxOxygen: 20
    },
    {
        id: Items.oxygenSecond,
        maxOxygen: 20
    },
    {
        id: Items.navigation,
        item: 'navigation'
    },
    {
        id: Items.scanner,
        item: 'scanner'
    },
    {
        id: Items.remoteControl,
        item: 'remoteControl'
    }
];
