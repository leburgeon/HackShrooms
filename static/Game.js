var Game = {
    username: null,
    mushrooms: 0,
    lifetimeMushrooms: 0,
    upgrades: {
        auto: [
            {
                name: "Grow Bed",
                lvl: 0,
                baseCost: 10,
                cost: 10,
                baseValue: 1
            },
            {
                name: "Terrarium",
                lvl: 0,
                baseCost: 100,
                cost: 100,
                baseValue: 5
            },
            {
                name: "Greenhouse",
                lvl: 0,
                baseCost: 1000,
                cost: 1000,
                baseValue: 10
            },
            {
                name: "Farm",
                lvl: 0,
                baseCost: 10000,
                cost: 10000,
                baseValue: 500
            },
            {
                name: "Laboratory",
                lvl: 0,
                baseCost: 100000,
                cost: 100000,
                baseValue: 1000
            }
        ],
        clicker: [
            {
                name: "Clipper",
                lvl: 0,
                baseCost: 10,
                cost: 10,
                baseValue: 1
            },
            {
                name: "Scythe",
                lvl: 0,
                baseCost: 100,
                cost: 100,
                baseValue: 5
            },
            {
                name: "Tractor",
                lvl: 0,
                baseCost: 1000,
                cost: 1000,
                baseValue: 20
            },
            {
                name: "Volunteer",
                lvl: 0,
                baseCost: 10000,
                cost: 10000,
                baseValue: 50
            }
        ]
    },
    skins: [
        {
            name: "Default",
            baseCost: 0,
            owned: true,
            selected: true
        },
        {
            name: "Galaxy",
            baseCost: 1000,
            owned: false,
            selected: false
        },
        {
            name: "Candyland",
            baseCost: 3000,
            owned: false,
            selected: false
        },
        {
            name: "Groot",
            baseCost: 5000,
            owned: false,
            selected: false
        },
        {
            name: "Golden",
            baseCost: 10000,
            owned: false,
            selected: false
        }
    ]
}