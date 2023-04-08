import { drawBlock, diff } from "./utils.js";
import { updateScore, death } from "./score.js";
let monsters = []
for (let i = -25; i < 25; i++) {
    let y = i == 0 ? Math.round(Math.random()*50) : i
    monsters.push({
        x: Math.round((Math.random()*15+8)*y),
        y: 0,
        speed: Math.random() >= 0.5 ?  Math.round(Math.random()*2.5 + 0.5) : -1 * Math.round(Math.random()*2.5 + 0.5),
        pos: 0,
    })
}
console.log(monsters)


export default function updateMonsters(hPos, delay) {
    monsters.forEach((monster, i) => {
        if (monster.pos > 3 || monster.pos < -3) {
            monster.speed = -monster.speed
            monster.pos += monster.speed*delay
        }
        monster.pos += monster.speed*delay
        let x = (monster.x + monster.pos - world.blockPos);
        let xcol = Math.round(x)
        if (monster.speed > 0) {
            xcol = Math.ceil(x)
            if (hPos[xcol - 1] > hPos[xcol]) {
                xcol = Math.floor(x)
            }
        } else {
            xcol = Math.floor(x)
            if (hPos[xcol + 1] > hPos[xcol]) {
                xcol = Math.ceil(x)
            }
        }
        monster.y = (hPos[xcol] + 1);
        let y = canvas.height - monster.y * block.s;
        drawBlock(block.monster, x*block.s, y)


        let heroX = hero.x - world.translateX/block.s;
        if (heroX + 0.9 >= x && heroX - 0.9 <= x) {
            if (hero.y > monster.y + 0.8 && hero.y < monster.y + 1.2) {
                monsters.splice(i, 1)
                updateScore()
            } else if (hero.y >= monster.y - 1 && hero.y < monster.y + 0.8) {
                death()
            }
        }
        if (diff(world.blockPos, monster.x) > 50) {
            monsters.splice(i, 1)
        }
    })
    if (monsters.length < 20) {
        let side = Math.random() > 0.5 ? 1 : -1;
        monsters.push({
            x: world.blockPos + 25*side + Math.random()*20*side,
            y: 10,
            speed: Math.round(Math.random()*2.5 + 0.5),
            pos: 0,
        })
    }
}


setInterval(() => {
    console.log(monsters)
}, 1000);