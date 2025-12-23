// // import helper from "./helper";

// //initial number of cookies    
// var Game = {
//     mushrooms: 0,
//     lifetimeMushrooms: 0,
//     upgrades: {
//         auto: [
//         {
//             name: "Grow Bed",
//             lvl: 0,
//             cost: 10
//         },
//         {
//             name: "Farm",
//             lvl: 0,
//             cost: 100
//         },
//         {
//             name: "Laboratory",
//             lvl: 0,
//             cost: 1000
//         }],
//         clicker: [
//         {
//             name: "Scythe",
//             lvl: 0,
//             cost: 10
//         },
//         {
//             name: "Tractor",
//             lvl: 0,
//             cost: 100
//         }]
//     }
// }

// var num = 0

// // window.onload = function () {
// //         var name = prompt("What is your name");
        
// //         var space = document.getElementById("space");
        
// //         space.innerHTML = name + "'s Bakery";
// // }

// var mushroom = document.getElementById("main-mushroom");

// function mushroomClick() { 
//     num += 1;

//     var numbers = document.getElementById("numbers");
    
//     //upgrade level for printing
//     var upgradeLevel = document.getElementById("upgradeLevel");
    
//     numbers.innerHTML = num;      
//     //automatic Granny upgrade to 2x
//     if(num >= 30 ){
//         num += 2;
//         upgradeLevel.innerHTML = "Granny Level";
//     }

//     //automatic factory upgrade to 10x
//     if(num >= 500) {
//         num += 10;
//         upgradeLevel.innerHTML = "Factory Level";
//     }

//     //automatic plant upgrade to 30x
//     if(num >= 1000) {
//         num += 30;
//         upgradeLevel.innerHTML = "Plant Level";
//     }

//     //automatic super factory upgrade to 1000x
//     if(num >= 100000) {
//         num += 1000;
//         upgradeLevel.innerHTML = "Super-Plant Level";
//     }
// }


// function buildUpgradeCard(upgrade) {
//     const card = document.createElement("div");
//     card.classList = "card";

//     const content = `
//     <div class="card">
//         <div class="card-body">
//             <div class="container text-center">
//                 <div class="row align-items-start">
//                     <div class="col">
//                         (image)
//                     </div>
//                     <div class="col">
//                         ${upgrade.name}
//                     </div>
//                     <div class="col">
//                         ${upgrade.lvl}
//                     </div>
//                     <div class="col">
//                         (button) ${upgrade.cost}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `;

//     return content
// }

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("page loaded")

//     const autoUpgradeContainer = document.getElementById("auto-upgrades-list");
    
//     Game["upgrades"]["auto"].forEach((upgrade) => {
//         content = buildUpgradeCard(upgrade)
//         autoUpgradeContainer.innerHTML += content;
//     })

//     const clickerUpgradeContainer = document.getElementById("clicker-upgrades-list");
//     Game["upgrades"]["clicker"].forEach((upgrade) => {
//         content = buildUpgradeCard(upgrade)
//         clickerUpgradeContainer.innerHTML += content;
//     })
// })

// setInterval(spawnMushroomMiniGame, 15000); 

// function spawnMushroomMiniGame() {
//     for (let i = 0; i < 5; i++) {
//         createMushroom();
//     }
// }

// function createMushroom() {

//     // Spawn mushroom on screen
//     const mush = document.createElement('img');
//     mush.src = "/images/mush1.png";
//     mush.classList.add('mushroom');

//     // Use random co-ordinates
//     leftX = 100
//     rightX = 800
//     bottomY = 0
//     topY = 600

//     const x = Math.random() * (rightX - leftX);
//     const y = Math.random() * (topY - bottomY);

//     mush.style.left = x + 'px';
//     mush.style.top = y + 'px';

//     // Add points and remove mushroom on click
//     mush.addEventListener('click', () => {
        
//         num += 100; 
//         numbers.innerHTML = num;      
//         mush.classList.add('mushroom');
//         mush.remove();
            
//         // Remove after 5 second timeout
//         setTimeout(() => {
//             mush.remove();
//         }, 5000);
//     });

//     // Add to page
//     document.body.appendChild(mush);
// }