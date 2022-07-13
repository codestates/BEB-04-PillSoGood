const CaverExtKAS = require('caver-js-ext-kas')
import {KIP17abi} from "./KIP17abi";
// const Caver = require('caver-js')
const accessKeyId = "${KASK407MJEVFHOUZ6ZNKLGQ6}";
const secretAccessKey = "${ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf}";
const chainId = 1001

    
/* export async function getKIP17List( userId : String ){

    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey, { useNodeAPIWithHttp: true }) // Caver extension 으로 클레이튼 바오밥 네트워크에 접근
    const smartcontractAddress = '0x173241504af47fd2dfc62b838d1b3192f56bbc89'                               // Baobab에 배포된 contract adress
    const contract = new caver.contract(KIP17abi, smartcontractAddress)                                     // 배포된 스마트 컨트랙트의 함수 실행을 위한 세팅
   
    const receipt = await contract.methods.set('key', 'value').send({ from: '0x{0x0F78E2Bb302178CfAdBEe4059Bba210f30CC8c22}', gas: 5000000 })
    console.log(receipt)

    const query = { size: 1 }
    const nftContractList = await caver.kas.tokenHistory.getNFTContractList(query) // NFT 컨트랙트 리스트를 조회
    console.log(nftContractList)
} */

/* export async function contractDeploy() {

    const CaverExtKAS = require('caver-js-ext-kas')
    const accessKeyId = "KASK407MJEVFHOUZ6ZNKLGQ6";
    const secretAccessKey = "ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf";
    const chainId = 1001
  
    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
    
    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
    const byteCode ='0x608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'
    const contract = new caver.contract(abi
    
    // SmartContractDeploy 트랜잭션을 발생시키는 from 계정은 충분한 KLAY를 소유하고 있어야 합니다.
    async function deploycontract () {
      try {
      const deployed = await contract.deploy({ data: byteCode }).send({ from: KASwalletAPIadress, gas: 10000000 })
      console.log(`Deployed contract address: ${deployed.options.address}`)
      }
      catch (e) { console.error(e) }}
     
      deploycontract();
  }
   */


  // KIP17 관련 SmartContract 배포
  export async function KIP17Deploy2() {  // 인자 타입 선언 필요 

      const CaverExtKAS = require('caver-js-ext-kas')
      const accessKeyId = "KASK407MJEVFHOUZ6ZNKLGQ6";
      const secretAccessKey = "ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf";
      const chainId = 1001
      const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
    
    async function deploycontract () {
      try {
        const name = "abc";
        const symbol = "drag";
        const alias = "monster";
        const KIP17FeePayerOptions = ""; // optional : 가스비 지불하는 Account Adress 필요
        const callback = () => {}  // optional

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
      const accessKeyId = "KASK407MJEVFHOUZ6ZNKLGQ6";
      const secretAccessKey = "ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf";
      const chainId = 1001
      const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

    async function Mint () {
        try {
          const contractAddress = "0xf393fc2cfa52b1a32418392ea870f234b8852e4e";  // or Alias
          const receiverAddress = "0x8353609f4805efa7067304e8B9Bd0a982703b8E6";
          const tokenId = "0x12";
          const tokenURI = "";
          const callback = () => {}  // optional

          const result = await caver.kas.kip17.mint(contractAddress, receiverAddress, tokenId, tokenURI, callback)
          console.log(result);
        }
        catch (e) { console.error(e) }}
       
        Mint();
  }


  // KIP17토큰 목록조회
  export async function getKIP17TokenList () { // 인자 타입 선언 필요 

    const CaverExtKAS = require('caver-js-ext-kas')
    const accessKeyId = "KASK407MJEVFHOUZ6ZNKLGQ6";
    const secretAccessKey = "ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf";
    const chainId = 1001
    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

   async function getTokenListsss () {
      try {
        const contractAddress = "";  // or Alias
        const queryOptions = "";    // optional --- 필터링용
        const callback = () => {}  // optional

        const result = await caver.kas.kip17.getTokenList(contractAddress, queryOptions, callback)
        console.log(result);
      }
      catch (e) { console.error(e) }}
     
      getTokenListsss();
}



// KIP17토큰 전송
export async function transferKIP17Token () { // 인자 타입 선언 필요 

    const CaverExtKAS = require('caver-js-ext-kas')
    const accessKeyId = "KASK407MJEVFHOUZ6ZNKLGQ6";
    const secretAccessKey = "ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf";
    const chainId = 1001
    const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

   async function transferToken () {
      try {
        const contractAddress = "";  // or Alias
        const senderAddress = "";    // 보낸 사람이 토큰의 소유자이거나 토큰이 전송되도록 소유자의 승인을 받아야 합니다
        const ownerAddress = "";    
        const receiverAddress = "";    
        const tokenId = "";    
        const callback = () => {}  // optional

        const result = await caver.kas.kip17.transfer(contractAddress, senderAddress, ownerAddress, receiverAddress, tokenId, callback)
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

 - metadata.json 의 tokenURI
 
 - 사용자 Kaikas 연결 및 Account Address ( Klip은 메인넷만 지원됨 ) */