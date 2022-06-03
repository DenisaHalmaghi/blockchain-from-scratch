const Blockchain = require('../Blockchain')
const Block = require('../Block')
const {GENESIS_DATA} = require('../config')
const cryptoHash = require('../crypto-hash')

describe('blockchain', () => {
    const blockchain = new Blockchain()

    it('should contain a chain array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('can add a new block tp the chain', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    describe('genesis()', () => {
        const genesisBlock = Block.genesis()

        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })  

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis()
        const data = 'mined data'
        const minedBlock = Block.mineBlock({lastBlock, data})

        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        })

        it('sets the data', () => {
            expect(minedBlock.data).toEqual(data)
        })

        it('sets the last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        })

        it('sets the timestamp', () => {
            expect(minedBlock.timestamp).not.toBe(undefined)
        })

        it('creates a SHA-256 hash based on the proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
        })
    })  
})