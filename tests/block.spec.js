const Block = require('../Block')
const {GENESIS_DATA} = require('../config')
const cryptoHash = require('../crypto-hash')

describe('block', () => {
    const timestamp = Date.now()
    const lastHash='foo-last-hash'
    const hash = 'f1r57-h45h'
    const data = 'Genesis block'

    const block = new Block({timestamp,lastHash, hash, data})

    it('should create a new block', () => {
        expect(block.timestamp).toEqual(timestamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.hash).toEqual(hash)
        expect(block.data).toEqual(data)
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