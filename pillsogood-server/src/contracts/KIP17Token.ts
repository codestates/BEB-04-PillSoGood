const CaverExtKAS = require('caver-js-ext-kas')

const accessKeyId = process.env.KAS_ACCESSKEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
const chainId = 1001


// KIP17 관련 SmartContract 배포
  export async function KIP17Deploy2() {  // 인자 타입 선언 필요 

      const CaverExtKAS = require('caver-js-ext-kas')
      const accessKeyId = process.env.KAS_ACCESSKEY_ID;
      const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
      const chainId = 1001
      const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
    
    async function deploycontract () {
      try {
        const name = "abc";
        const symbol = "drag";
        const alias = "monster";
        const KIP17FeePayerOptions = ""; // optional : 가스비 지불하는 Account Adress 필요
        const callback = () => {}        // optional

        const result = await caver.kas.kip17.deploy(name, symbol, alias, KIP17FeePayerOptions,callback);
        console.log(result);
      }
      catch (e) { console.error(e) }}
     
      deploycontract();
      
      // transactionHash: '0x6c0d4467007bf5e6fb5d4e926901365408aa3f5b73b8eef812deb7508c4497e3'
      // contract Adress : 0xf393fc2cfa52b1a32418392ea870f234b8852e4e
  }


  // KIP17토큰 발행 
  export async function mintKIP17Token () { // 인자 타입 선언 필요 

      const CaverExtKAS = require('caver-js-ext-kas')
      const accessKeyId = process.env.KAS_ACCESSKEY_ID;
      const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
      const chainId = 1001
      const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

    async function Mint () {
        try {
          const alias = "monster";   // or contract Adress
          const receiverAddress = "";
          const tokenId = "";
          const tokenURI = "";
          const callback = () => {}  // optional

          const result = await caver.kas.kip17.mint(alias, receiverAddress, tokenId, tokenURI, callback)
          console.log(result);
        }
        catch (e) { console.error(e) }}
       
        Mint();
  }


  // KIP17토큰 목록조회
  export async function getKIP17TokenList () { // 인자 타입 선언 필요 

    const CaverExtKAS = require('caver-js-ext-kas')
    const accessKeyId = process.env.KAS_ACCESSKEY_ID;
    const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
    const chainId = 1001
    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

   async function getTokenListsss () {
      try {                        
        const alias = "monster";   // or Contract address
        const queryOptions = "";   // optional --- 필터링용
        const callback = () => {}  // optional

        const result = await caver.kas.kip17.getTokenList(alias, queryOptions, callback)
        console.log(result);
      }
      catch (e) { console.error(e) }}
     
      getTokenListsss();
}



// KIP17토큰 전송
export async function transferKIP17Token () { // 인자 타입 선언 필요 

  const CaverExtKAS = require('caver-js-ext-kas')
  const accessKeyId = process.env.KAS_ACCESSKEY_ID;
  const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
  const chainId = 1001
  const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

 async function transferToken () {
    try {
      const alias = "monster";     // or Contract address
      const senderAddress = "";    // 보낸 사람이 토큰의 소유자이거나 토큰이 전송되도록 소유자의 승인을 받아야 합니다
      const ownerAddress = "";    
      const receiverAddress = "";    
      const tokenId = '';    
      const callback = () => {}    // optional

      const result = await caver.kas.kip17.transfer(alias, senderAddress, ownerAddress, receiverAddress, tokenId, callback)
      console.log(result);
    }
    catch (e) { console.error(e) }}
   
    transferToken();
}
 




  




/* 1. Solidity 작성

2. remix IDE로 컴파일 후 abi 복사

3. abi 파일 생성

4. Caver-js extension 이용해서 서버 응답문 작성 ( Caver-js에 KAS 기능을 내장 탑재함 )

    - Query문에 따른 KIP-17 목록 조회 --- NFT.ts에서 작성한 함수를 graphQL에 삽입
    
    - Mutation에 따른 KIP-17 발행 --- 발행시 DB의 포인트 차감 필요 --- graphQL Mutation에 삽입
    
    - Mutation에 따른 KIP-17 전송 --- 전송시 사용자의 지갑 ( Kaikas ) 주소 필요 ) --- graphQL Mutation에 삽입

    - 정상 응답시 DB에 저장 --- callback 함수로 ??


5. 더 고민해봐야 하는 것 : 

 - mutation, query 받을 때 담아올 인자 및 토큰 id 부여하는 알고리즘

 - metadata.json의 tokenURI
 
 - 사용자 Kaikas 연결 및 Account Address ( Klip은 메인넷만 지원됨 ) */