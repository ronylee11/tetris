// block
export class Block {
  blockWidth;
  blockHeight;
  blockColor;
  blockType;
  blockCoordinates = [];
  blockMovement = true;
  static gameOver = false;

  constructor(blockWidth, blockHeight, blockColor, blockType) {
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;
    this.blockColor = blockColor;
    this.blockType = blockType;
  }

  drawBlock() {
    const allBlocks = document.querySelectorAll("tr");
    const blockCoordinates = [];

    // change the color of the block
    // check the even space at spawn point left right
    const width = allBlocks[0].children.length;
    let requiredWidth = Math.floor((width - this.blockWidth) / 2);
    for (let i = 0; i < this.blockHeight; i++) {
      for (let j = requiredWidth; j < this.blockWidth + requiredWidth; j++) {
        if (this.blockType == "LBlock") {
          // if LBlock, skip i = 0, j = 4, and i = 1, j = 4
          if (i == 0 && j == requiredWidth + 1) continue;
          if (i == 1 && j == requiredWidth + 1) continue;
        }
        if (this.blockType == "reverseLBlock") {
          // if reverseLBlock, skip i = 1, j = 3, and i = 2, j = 3
          if (i == 1 && j == requiredWidth) continue;
          if (i == 2 && j == requiredWidth) continue;
        }
        if (this.blockType == "TBlock") {
          // if TBlock, skip i = 0, j = 4, and i = 2, j = 4
          if (i == 0 && j == requiredWidth + 1) continue;
          if (i == 2 && j == requiredWidth + 1) continue;
        }
        if (this.blockType == "ZBlock") {
          // if ZBlock, skip i = 0, j = 3, and i = 2, j = 4
          if (i == 0 && j == requiredWidth) continue;
          if (i == 2 && j == requiredWidth + 1) continue;
        }
        if (this.blockType == "reverseZBlock") {
          // if reverseZBlock, skip i = 0, j = 4, and i = 2, j = 3
          if (i == 0 && j == requiredWidth + 1) continue;
          if (i == 2 && j == requiredWidth) continue;
        }

        allBlocks[i].children[j].style.backgroundColor = this.blockColor;
        blockCoordinates.push([i, j]);
      }
    }
    this.blockCoordinates = blockCoordinates;
  }

  // move block down by 1
  moveBlockDown(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allBlocks = document.querySelectorAll("tr");
        const blockCoordinates = this.blockCoordinates;
        let canProceed = true;
        for (const ea of blockCoordinates) {
          // if any of the block piece is at the bottom of the board, stop
          if (ea[0] == allBlocks.length - 1) {
            canProceed = false;
            this.blockMovement = false;
            //alert("Block stopped!");
            break;
          }
          // if any of the bottomest block piece touches another block next, stop
          if (ea[0] != allBlocks.length - 1) {
            // if the next block is not in blockCoordinates
            if (
              !blockCoordinates.some(
                (e) => JSON.stringify(e) == JSON.stringify([ea[0] + 1, ea[1]])
              )
            ) {
              if (
                allBlocks[ea[0] + 1].children[ea[1]].style.backgroundColor != ""
              ) {
                // check if the block clashes on spawn, if yes, game over
                if (ea[0] == 0) {
                  alert("Game over!");
                  canProceed = false;
                  this.blockMovement = false;
                  Block.gameOver = true;
                  break;
                }
                canProceed = false;
                this.blockMovement = false;
                //alert("Block clashing!");
                break;
              }
            }
          }
        }

        if (canProceed) {
          // move the block down by 1
          const newCoordinates = () => {
            const newCoordinates = [];
            for (let i = 0; i < blockCoordinates.length; i++) {
              newCoordinates.push([
                blockCoordinates[i][0] + 1,
                blockCoordinates[i][1],
              ]);
            }
            return newCoordinates;
          };

          // render the new block location
          for (let i = 0; i < allBlocks.length; i++) {
            // for every row
            for (let j = 0; j < allBlocks[i].children.length; j++) {
              // for every column
              // if the block is in the blockCoordinates, change the color to empty
              // if the block is in the newCoordinates, change the color to blockColor
              // if the block is not in the blockCoordinates or newCoordinates, do nothing
              for (const ea of blockCoordinates) {
                if (JSON.stringify(ea) == JSON.stringify([i, j])) {
                  allBlocks[i].children[j].style.backgroundColor = "";
                }
              }
              for (const ea of newCoordinates()) {
                if (JSON.stringify(ea) == JSON.stringify([i, j])) {
                  allBlocks[i].children[j].style.backgroundColor =
                    this.blockColor;
                }
              }
            }
          }
          this.blockCoordinates = newCoordinates();
        }

        resolve();
      }, delay);
    });
  }

  // move block left and right
  moveBlockX(direction) {
    const allBlocks = document.querySelectorAll("tr");
    const blockCoordinates = this.blockCoordinates;
    const newCoordinates = () => {
      const newCoordinates = [];
      for (let i = 0; i < blockCoordinates.length; i++) {
        if (
          blockCoordinates[i][1] != 0 &&
          blockCoordinates[i][1] != allBlocks[0].children.length - 1
        ) {
          if (direction == "left") {
            newCoordinates.push([
              blockCoordinates[i][0],
              blockCoordinates[i][1] - 1,
            ]);
          } else if (direction == "right") {
            newCoordinates.push([
              blockCoordinates[i][0],
              blockCoordinates[i][1] + 1,
            ]);
          }
        } else {
          newCoordinates = blockCoordinates;
        }
      }
      return newCoordinates;
    };

    // render the new block location
    for (let i = 0; i < allBlocks.length; i++) {
      // for every row
      for (let j = 0; j < allBlocks[i].children.length; j++) {
        // for every column
        // if the block is in the blockCoordinates, change the color to empty
        // if the block is in the newCoordinates, change the color to blockColor
        // if the block is not in the blockCoordinates or newCoordinates, do nothing
        for (const ea of blockCoordinates) {
          if (JSON.stringify(ea) == JSON.stringify([i, j])) {
            allBlocks[i].children[j].style.backgroundColor = "";
          }
        }
        for (const ea of newCoordinates()) {
          if (JSON.stringify(ea) == JSON.stringify([i, j])) {
            allBlocks[i].children[j].style.backgroundColor = this.blockColor;
          }
        }
      }
    }
    this.blockCoordinates = newCoordinates();
  }
}

// block names
// long block
// square block
// L block
// reverse L block
// T block
// Z block
// reverse Z block

export class LongBlock extends Block {
  // ----
  constructor() {
    super(4, 1, "lightblue", "longBlock");
  }
}

export class SquareBlock extends Block {
  // --
  // --
  constructor() {
    super(2, 2, "yellow", "squareBlock");
  }
}

export class LBlock extends Block {
  // |
  // |
  // __
  constructor() {
    super(2, 3, "orange", "LBlock");
  }
}

export class ReverseLBlock extends Block {
  // --
  //  |
  //  |
  constructor() {
    super(2, 3, "blue", "reverseLBlock");
  }
}

export class TBlock extends Block {
  // ---
  //  |
  //  |
  constructor() {
    super(2, 3, "purple", "TBlock");
  }
}

export class ZBlock extends Block {
  // --
  //  --
  constructor() {
    super(2, 3, "green", "ZBlock");
  }
}

export class ReverseZBlock extends Block {
  //  --
  // --
  constructor() {
    super(2, 3, "red", "reverseZBlock");
  }
}
