export function sinRnd(i) {
    let weight = world.curve.inferings.length+1;
    let hPos = (Math.sin(world.curve.f*i + world.curve.o))/weight
    world.curve.inferings.forEach((infering, m) => {
        hPos += (Math.sin(infering*i + world.curve.o2*m))/weight
    })
    return hPos;
}


export function drawBlock(img, x, y, Ymul=1) {
    ctx.drawImage(img, 0, 0, block.imgS, block.imgS, x, y + (1-Ymul)*block.s, block.s, block.s*Ymul);
    // draw image full: imgSRC, imgcropStart x-y, imgcropEnd x-y, posX, posY, SizeX, sizeY  
}


// test terrain generation to make sure it's good (TEMP)
let message = "succes"
let min = 100;
let max = 0;
window.test = () => {
    for (let u = 0; u < 100000; u++) {
        let rnd = Math.round((sinRnd(u) + 1)* block.vCount * 0.5);
        if (rnd > block.vCount) message = "error"
        if (rnd < min) min = rnd
        if (rnd > max) max = rnd
    }
    console.log(`${message} min: ${min} max: ${max} pour ${block.vCount}`)
}