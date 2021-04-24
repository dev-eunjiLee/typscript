import * as CryptoJS from "crypto-js"; // crypto-js의 전체 프로퍼티를 import

// 클래스 구조: (가급적 권장) static > 그 외 > constructor
class Block{

    // static method -> 클래스가 생성되지 않아도 함수 사용 가능
    // static method가 아닌 경우 외부에서 사용하기 위해서 클래스 객체 생성 필수
    static calculateBlockHash = (
        index:number, 
        previousHash: string, 
        timestamp: number, 
        data: string)
        : string =>
            CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    // 블록 유효 검사
    static validateStructure = (aBlock: Block): Boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string"

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number; 
    
    constructor(
        index:number, 
        hash:string, 
        previousHash:string, 
        data:string, 
        timestamp:number
        ){
            this.index = index;
            this.hash = Block.calculateBlockHash(index, previousHash, timestamp, data);
            this.previousHash = previousHash;
            this.data = data; 
            this.timestamp = timestamp;     
    }
}

const genesisBolck:Block = new Block(0, "hash", "previousHash", "data", 123456);

let blockchain:Block[] = [genesisBolck];
// blockchain.push("stuff"); => 타입이 일치하지 않아 에러 발생

const getBlockchain = (): Block[] => blockchain; // 화살표함수의 경우 return만 있는 경우 괄호 생략 가능

const getLatestBlock = (): Block => blockchain[blockchain.length-1];

const getNewTimestamp = (): number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimestamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        newTimestamp, 
        data
    );

    const newBlock:Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        newTimestamp
    );

    addBlock(newBlock);

    return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

// 이전 블록과 현재 블록을 비교하여 구조가 타당한지 확인, 유효한지 확인
const isBlockValid = (candidateBlock:Block, previousBlock:Block): Boolean => {
    
    if(!Block.validateStructure(candidateBlock)){
        return false; // 구조가 다르면 false
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false; // 인덱스 번호가 잘못 입력되면 false
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false; // 이전 해시 불일치할 경우 false
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false; // 현재 해시가 제대로 작성되지 않은 경우 false
    } else {
        return true;
    }
};


// createNewBlock("second block"); => createNewBlock 내부에서 사용중인 addBlock(const)은 호이스팅되지 않기 때문에 addBlock보다 먼저 사용할 경우 에러 ㅂ라생
const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
} 

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("forth block");

console.log(blockchain);

export {};