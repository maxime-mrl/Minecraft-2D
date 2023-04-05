import { plainGeneration, desertGeneration } from "./biomes.js"
import { sinRnd } from "./utils.js";

let lastTime = Date.now();
export function update() {
    let delay = (Date.now() - lastTime)/1000;
    lastTime = Date.now();
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()
    updateClouds(delay)
    updatePos(delay)

    ctx.restore()
    requestAnimationFrame(update)
}

function updatePos(delay) {
    world.translateX -= 5000*delay*world.dir;
    if (world.translateX < -5* block.s) {
        world.translateX += block.s;
        world.blockPos++
    }
    if (world.translateX > -1* block.s) {
        world.translateX -= block.s;
        world.blockPos--
    }
    updateBlocks(world.translateX, world.blockPos)
}
function updateClouds(delay) {
    world.cloudTranslate += 10*delay;
    if (world.cloudTranslate > - 2 * block.s) {
        world.cloudTranslate -= block.s;
        world.cloudPos--
    }
}

function updateBlocks(offset, pos) {
    ctx.translate(offset, -block.s) // get to th bottom of block
    for (let i = 0; i < canvas.width/block.s*2 + block.s; i++) {

        let hPos = Math.round((sinRnd(i+pos) + 1)* block.vCount * 0.5); // get height of generation

        let biome = sinRnd((i+pos)*world.biomeSeed); // defines biome
        if (biome >= 0) {
            plainGeneration(i, hPos, pos)
        } else {
            desertGeneration(i, hPos, pos, biome)
        }
        let clouds = sinRnd((i+pos+world.cloudPos)*world.cloudSeed);
        if (clouds > 0.2) {
            ctx.fillStyle = "#CEE5F2"
            clouds = Math.min(Math.round(clouds*3), 3)
            let x = i*block.s + world.cloudTranslate
            let s = block.s*1.01;
            if (clouds == 3) {
                ctx.fillRect(x, (3)*block.s, s, s)
                ctx.fillRect(x, (2)*block.s, s, s)
                ctx.fillRect(x, (4)*block.s, s, s)
            } else {
                for (let y = 0; y < clouds; y++) {
                    ctx.fillRect(x, (3+y)*block.s, s, s)
                }
            }
        }
    }
}