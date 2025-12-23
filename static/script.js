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
            owned: true
        },
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
            name: "Golden",
            baseCost: 10000,
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
            Game["upgrades"][type][id]["cost"] = Math.ceil(Game["upgrades"][type][id]["baseCost"] * (1.2 ** Game["upgrades"][type][id]["lvl"]))
        }
        else {
            mushroomPerClick += Game["upgrades"][type][id]["baseValue"]
            Game["upgrades"][type][id]["cost"] = Math.ceil(Game["upgrades"][type][id]["baseCost"] * (1.4 ** Game["upgrades"][type][id]["lvl"]))
        }
        
        upgradeCost.innerHTML = Game["upgrades"][type][id]["cost"]

        updateMushroomsCount();
        updateUnlocks();

        if (Game["upgrades"][type][id]["lvl"] == 5) {
            updateUpgrade(type, id + 1)
        }
    }
}

function buildUpgradeCard(type, idx, images) {
    const card = document.createElement("div");
    card.classList = "card";

    const content = `
    <div class="card">
        <div class="card-body">
            <div class="container text-center">
                <div class="row align-items-start" id=${type}-${idx}-card>
                    <div class="col" id="upgrade-imgs">
                        <img src=${images[type][idx]} class="locked-upgrade"/>
                    </div>
                    <div class="col">
                        ???
                    </div>
                    <div class="col" id=${type}-${idx}-lvl>
                        ???
                    </div>
                    <div class="col">
                        <button id=${type}-${idx} onclick="upgradeCard(id)" disabled=true>???</button>
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
                            onclick="purchaseSkin(${idx})">
                            ${skin.owned ? "Select" : skin.baseCost}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return content;
}

function purchaseSkin(idx) {
    const skin = Game.skins[idx];
    if (Game.mushrooms < skin.baseCost) return;

    Game.mushrooms -= skin.baseCost;
    skin.baseCost = 0
    skin.owned = true;
    document.getElementById(`skin-${idx}-status`).innerHTML = "Owned";

    const btn = document.getElementById(`skin-${idx}`);
    btn.innerHTML = "Select";

    const skinImages = [
        images.defaultMushroom,
        images.galaxy,
        images.candy,
        images.groot,
        images.golden
    ]

    mushroom.firstElementChild.src = skinImages[idx]

    updateMushroomsCount();
    updateUnlocks();
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("page loaded")

    const upgradeImages = {
    "auto": [images.bed, images.terrarium, images.greenhouse, images.farm, images.lab],
    "clicker": [images.clipper, images.scythe, images.tractor, images.volunteer]
    }

    // Load player data if any here

    const autoUpgradeContainer = document.getElementById("auto-upgrades-list");
    
    Game["upgrades"]["auto"].forEach((upgrade, idx) => {
        content = buildUpgradeCard("auto", idx, upgradeImages)
        autoUpgradeContainer.innerHTML += content;
    })

    const clickerUpgradeContainer = document.getElementById("clicker-upgrades-list");
    Game["upgrades"]["clicker"].forEach((upgrade, idx) => {
        content = buildUpgradeCard("clicker", idx, upgradeImages)
        clickerUpgradeContainer.innerHTML += content;
    })

    updateUpgrade("auto", 0)
    updateUpgrade("clicker", 0)

    const skinImages = [
        images.defaultMushroom,
        images.galaxy,
        images.candy,
        images.groot,
        images.golden
    ]

    const optionsContainer = document.getElementById("skins-list");
    Game["skins"].forEach((name, idx) => {
        content = buildOptionsCard(name, idx, skinImages)
        optionsContainer.innerHTML += content;
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


function updateUnlocks() {

    const images = document.querySelectorAll('.locked-image');
    images.forEach(img => {
    
        // Get the threshold value from the 'point-threshold' attribute in the HTML
        const threshold = parseInt(img.getAttribute('point-threshold'));

        if (Game["mushrooms"] >= threshold) {
        img.classList.add('unlocked');
        }
    });

}

setInterval(updateUnlocks, 1000); 


function updateUpgrade(type, id) {

    var card = document.getElementById(type + "-" + id + "-card");

    const image_parent = card.firstElementChild
    const image = image_parent.firstElementChild
    const name = image_parent.nextElementSibling
    const level = name.nextElementSibling
    const button_parent = level.nextElementSibling
    const button = button_parent.firstElementChild

    image.classList.add('unlocked');
    name.innerHTML = Game["upgrades"][type][id]["name"]
    level.innerHTML = 0
    button.disabled = false
    button.innerHTML = Game["upgrades"][type][id]["cost"]
}

function playAudio() {
    var audio = document.getElementById("captainSound");
    audio.volume = 0.2;
    audio.play();
}

function toggleMusic() {
    var bgMusic = document.getElementById("bgMusic");
    var btn = document.getElementById("musicToggle");

    if (bgMusic.paused) {
        bgMusic.volume = 0.1; 
        bgMusic.play();
        btn.innerHTML = "Pause Music";
        btn.style.backgroundColor = "#ff6b6b"; 
    } else {
        bgMusic.pause();
        btn.innerHTML = "Play Music";
        btn.style.backgroundColor = "#ffcf00"; // 
    }
}