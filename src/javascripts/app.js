import {
  Block,
  LongBlock,
  SquareBlock,
  LBlock,
  ReverseLBlock,
  TBlock,
  ZBlock,
  ReverseZBlock,
} from "./block.js";

const possibleBlocks = [
  new LongBlock(),
  new SquareBlock(),
  new LBlock(),
  new ReverseLBlock(),
  new TBlock(),
  new ZBlock(),
  new ReverseZBlock(),
];

function generateBlock() {
  return possibleBlocks[Math.floor(Math.random() * possibleBlocks.length)];
}

alert("Reloaded!");

let newBlock;

async function moveBlock() {
  // every 1 second, move block down 1
  while (newBlock.blockMovement == true) {
    await newBlock.moveBlockDown(150);
  }
  // if blockMovement is false, then spawn new block
  if (newBlock.blockMovement == false && !Block.gameOver) {
    //alert("Generating new block!");
    newBlock = generateBlock();
    newBlock.blockMovement = true; // ensure that the block can move
    newBlock.drawBlock();
    moveBlock();
  }
}

newBlock = generateBlock();
//newBlock = possibleBlocks[2];
newBlock.drawBlock();
moveBlock();
