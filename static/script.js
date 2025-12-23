var Game = {
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
                name: "Scythe",
                lvl: 0,
                baseCost: 10,
                cost: 10,
                baseValue: 1
            },
            {
                name: "Tractor",
                lvl: 0,
                baseCost: 100,
                cost: 100,
                baseValue: 5
            }
        ]
    },
    skins: [
        {
            name: "Galaxy",
            baseCost: 1000,
            owned: false
        },
        {
            name: "Candyland",
            baseCost: 3000,
            owned: false
        },
        {
            name: "Groot",
            baseCost: 5000,
            owned: false
        },
        {
            name: "Magma",
            baseCost: 7000,
            owned: false
        },
        {
            name: "Ice",
            baseCost: 9000,
            owned: false
        },
        {
            name: "Tech",
            baseCost: 10000,
            owned: false
        },
        {
            name: "Royal",
            baseCost: 12000,
            owned: false
        },
        {
            name: "Golden",
            baseCost: 15000,
            owned: false
        }
    ]
}

var mushroomPerSecond = 0
var mushroomPerClick = 1

function calculateMushroomPerSecond() {
    Game["upgrades"]["auto"].forEach((upgrade) => {
        mushroomPerSecond += (upgrade["baseValue"] * upgrade["lvl"])
    })
}

function calculateMushroomPerClick() {
    Game["upgrades"]["clicker"].forEach((upgrade) => {
        mushroomPerClick += (upgrade["baseValue"] * upgrade["lvl"])
    })
}

setInterval(autoMushroomGenerator, 1000);

function autoMushroomGenerator() {
    Game["mushrooms"] += mushroomPerSecond; 
    Game["lifetimeMushrooms"] += mushroomPerSecond;

    updateMushroomsCount()
    updateUnlocks();
}

// window.onload = function () {
//         var name = prompt("What is your name");
        
//         var space = document.getElementById("space");
        
//         space.innerHTML = name + "'s Bakery";
// }

var mushroom = document.getElementById("main-mushroom");

function updateMushroomsCount() {
    var numbers = document.getElementById("numbers");
    numbers.innerHTML = Game["mushrooms"];
}

function pulseMushroom() {

    mushroom.style.transition = "transform 0.1s ease";
    mushroom.style.transform = "scale(0.9)";
    setTimeout(function() {
        mushroom.style.transform = "scale(1)";
    }, 100);
}

function mushroomClick() {
    Game["mushrooms"] += mushroomPerClick;
    Game["lifetimeMushrooms"] += mushroomPerClick;

    updateMushroomsCount();
    updateUnlocks();
}

function upgradeCard(idx) {
    idInfo = idx.split("-")
    type = idInfo[0]
    id = Number(idInfo[1])
    
    if (Game["mushrooms"] >= Game["upgrades"][type][id]["cost"]) {
        var upgradeLvl = document.getElementById(idx + "-lvl");
        var upgradeCost = document.getElementById(idx);

        Game["upgrades"][type][id]["lvl"] += 1
        upgradeLvl.innerHTML = Game["upgrades"][type][id]["lvl"]

        Game["mushrooms"] -= Game["upgrades"][type][id]["cost"]

        if (type == "auto") {
            mushroomPerSecond += Game["upgrades"][type][id]["baseValue"]
            Game["upgrades"][type][id]["cost"] = Math.ceil(Game["upgrades"][type][id]["baseCost"] * (1.15 ** Game["upgrades"][type][id]["lvl"]))
        }
        else {
            mushroomPerClick += Game["upgrades"][type][id]["baseValue"]
            Game["upgrades"][type][id]["cost"] = Math.ceil(Game["upgrades"][type][id]["baseCost"] * (2 ** Game["upgrades"][type][id]["lvl"]))
        }
        
        upgradeCost.innerHTML = Game["upgrades"][type][id]["cost"]

        updateMushroomsCount();
        updateUnlocks();
    }
}

function buildUpgradeCard(upgrade, type, idx, images) {
    const card = document.createElement("div");
    card.classList = "card";

    const content = `
    <div class="card">
        <div class="card-body">
            <div class="container text-center">
                <div class="row align-items-start">
                    <div class="col">
                        <img src=${images[type][idx]} height=50px/>
                    </div>
                    <div class="col">
                        ${upgrade.name}
                    </div>
                    <div class="col" id=${type}-${idx}-lvl>
                        ${upgrade.lvl}
                    </div>
                    <div class="col">
                        <button id=${type}-${idx} onclick="upgradeCard(id)">${upgrade.cost}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return content
}

function buildOptionsCard(skin, idx, images) {
    const card = document.createElement("div");
    card.classList = "card";

    const content = `
    <div class="card">
        <div class="card-body">
            <div class="container text-center">
                <div class="row align-items-start">
                    <div class="col">
                        <img src="${images[idx]}" height="50px"/>
                    </div>
                    <div class="col">
                        ${skin.name}
                    </div>
                    <div class="col" id="skin-${idx}-status">
                        ${skin.owned ? "Owned" : "Locked"}
                    </div>
                    <div class="col">
                        <button 
                            id="skin-${idx}" 
                            onclick="buySkin(${idx})"
                            ${skin.owned ? "disabled" : ""}
                        >
                            ${skin.owned ? "✓" : skin.cost}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return content;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("page loaded")

    const upgradeImages = {
    "auto": [images.bed, images.terrarium, images.greenhouse, images.farm, images.lab],
    "clicker": [images.scythe, images.tractor]
    }
    // Load player data if any here

    const autoUpgradeContainer = document.getElementById("auto-upgrades-list");
    
    Game["upgrades"]["auto"].forEach((upgrade, idx) => {
        content = buildUpgradeCard(upgrade, "auto", idx, upgradeImages)
        autoUpgradeContainer.innerHTML += content;
    })

    const clickerUpgradeContainer = document.getElementById("clicker-upgrades-list");
    Game["upgrades"]["clicker"].forEach((upgrade, idx) => {
        content = buildUpgradeCard(upgrade, "clicker", idx, upgradeImages)
        clickerUpgradeContainer.innerHTML += content;
    })

    Game["skins"].forEach((name, idx) => {
        content = buildOptionsCard(name, idx, skinImages)
    })

    calculateMushroomPerSecond()
    calculateMushroomPerClick()
})


setInterval(spawnMushroomMiniGame, 15000); 

function spawnMushroomMiniGame() {
    for (let i = 0; i < 5; i++) {
        createMushroom();
    }
}

function createMushroom() {

    // Spawn mushroom on screen
    const mush = document.createElement('img');
    mush.src = images.smallmush
    mush.classList.add('mushroom');

    // Use random co-ordinates
    leftX = 100
    rightX = 800
    bottomY = 0
    topY = 600

    const x = Math.random() * (rightX - leftX);
    const y = Math.random() * (topY - bottomY);

    mush.style.left = x + 'px';
    mush.style.top = y + 'px';

    // Add points and remove mushroom on click
    mush.addEventListener('click', () => {
        
        mushroomsToAdd = Math.max(Math.ceil(mushroomPerSecond * 10), 50)
        Game["mushrooms"] += mushroomsToAdd;
        Game["lifetimeMushrooms"] += mushroomsToAdd;
        numbers.innerHTML = Game["mushrooms"];
        mush.classList.add('mushroom');
        mush.remove();
            
        // Remove after 5 second timeout
        setTimeout(() => {
            mush.remove();
        }, 5000);
    });

    // Add to page
    document.body.appendChild(mush);
}

async function testfunc() {
    console.log('testing func')
    const playerdata = await getPlayerData('test')
    console.log(playerdata)
}

function updateUnlocks() {

    const images = document.querySelectorAll('.locked-image');
    images.forEach(img => {
    
        // Get the threshold value from the 'point-threshold' attribute in the HTML
        const threshold = parseInt(img.getAttribute('point-threshold'));

        if (Game["mushrooms"] >= threshold) {
        img.classList.add('unlocked');
        console.log(`Unlocked: ${img.src}`); // Debugging line to see it work
        }
    });

}

setInterval(updateUnlocks, 1000); 