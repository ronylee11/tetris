import {
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

async function moveBlock() {
  // every 1 second, move block down 1
  while (newBlock.blockMovement == true) {
    await newBlock.moveBlockDown(500);
  }
  // check if block is at last row, if yes, stop and spawn newBlock
  if (newBlock.blockMovement == false) {
    newBlock = generateBlock();
    newBlock.drawBlock();
    moveBlock();
  }
}

let newBlock = possibleBlocks[0];
newBlock.drawBlock();
moveBlock();
