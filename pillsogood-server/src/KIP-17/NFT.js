import Caver from "caver-js";

const accessKeyId = "${KASK407MJEVFHOUZ6ZNKLGQ6}";
const secretAccessKey = "${ImqA2pJd7Z0ryfaJnzzYGB5lnhmUcplKP_VUjKMf}";

const option = {
headers: [
{name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')},
{name: 'x-chain-id', value: 1001},
]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option)); 



/* 1. Solidity 작성

2. remix IDE로 컴파일 후 abi 복사

3. abi 파일 생성

4. Caver-js 이용해서 서버 응답문 작성

    - Query문에 따른 KIP-17 목록 조회
    
    - Mutation에 따른 KIP-17 발행
    
    - Mutation에 따른 KIP-17 전송 ) 

    - 정상 응답시 DB에 저장 


5. 더 고민해봐야 하는 것 : 

 - metadata.json 의 tokenURI
 
 - 사용자 Klip 연결 ( Klip은 메인넷만 지원됨 ) */