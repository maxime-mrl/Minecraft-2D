import { sinRnd, drawBlock } from "./utils.js";

export function plainGeneration(i, hPos, pos) {
    let dirtHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 2));
    // stone
    let y = 0;
    if (hPos > dirtHeight) {
        while (y < hPos - dirtHeight) { 
            drawBlock(block.stone, i*block.s, canvas.height-y*block.s)
            y++;
        }
    }
    while (y < hPos) { // dirt
        drawBlock(block.dirt, i*block.s, canvas.height-y*block.s);
        y++;
    }
    // grass
    drawBlock(block.grass, i*block.s, canvas.height-hPos*block.s);
    // tallGrass
    if (sinRnd((i+pos) * world.grassSeed) > 0.1) {
        drawBlock(block.tallGrass, i*block.s, canvas.height-(hPos+1)*block.s);
    }
    // water
    water(hPos, i);
    return hPos;
}

export function desertGeneration(i, hPos, pos, biome) {
    // biome allow smooth transition
    biome = Math.abs(biome)*10
    biome = biome > 1 ? 1 : biome
    // biome = 1;
    hPos = Math.round((hPos * 0.60 + block.vCount *0.40)*biome + (hPos + 1)*(1-biome)); // flaten a bit desert if enough in biome
    let sandHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 4));
    let sandStoneHeight = Math.round((sinRnd((i+pos)*world.stoneSeed + 500) + 3));

    let y = 0;
    if (hPos - sandHeight > sandStoneHeight) { // stone
        while (y < hPos - sandStoneHeight - sandHeight) { 
            drawBlock(block.stone, i*block.s, canvas.height-y*block.s);
            y++;
        }
    }
    if (hPos > sandHeight) { // sandstone
        while (y < hPos - sandHeight) { 
            drawBlock(block.sandStone, i*block.s, canvas.height-y*block.s);
            y++;
        }
    }
    while (y < hPos) { // sand
        drawBlock(block.sand, i*block.s, canvas.height-y*block.s);
        y++;
    }
    if (sinRnd((i+pos) * world.grassSeed) > 0.5) { // cactus
        for (let z = 0; z <= Math.round(sinRnd((i+pos) * world.grassSeed + 2)*2.5); z++) {
            drawBlock(block.cactus, i*block.s, canvas.height-(hPos+z)*block.s);
        }
    } else if (sinRnd((i+pos) * world.grassSeed + 500) > 0.4) { // deadbush
        drawBlock(block.deadBush, i*block.s, canvas.height-hPos*block.s);
    }
    // water
    water(hPos-1, i);
    return hPos-1;
}



function water(hPos, i) {
    for (let y = hPos + 1; y < world.waterHeight; y++) {
        ctx.clearRect(i*block.s, canvas.height-(y+9)*block.s, block.s, block.s*10); // remove blocks if necessary
        if (y + 1 < world.waterHeight) {
            drawBlock(block.water, i*block.s, canvas.height-y*block.s); // full water block
        }
        drawBlock(block.water, i*block.s, canvas.height-y*block.s, 0.8); // slightly smaller block when on top
    }
}