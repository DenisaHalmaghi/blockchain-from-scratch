const Block = require('./Block')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data) {
        this.chain.push(Block.mineBlock({data,lastBlock:this.chain[this.chain.length-1]}))
    }
}

module.exports = Blockchain