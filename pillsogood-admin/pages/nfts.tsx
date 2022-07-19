import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import { useRouter } from 'next/router';

const GET_ALL_NFTS = gql`
    query GetAllNfts($jwt: String!) {
        getAllNfts(jwt: $jwt) {
            _id
            nftHash
            imagePath
            tokenId
            user {
            _id
            email
            nickname
            dateOfBirth
            pointBalance
            createdAt
            disease
            phoneNumber
            }
        }
    }
`

const Nfts: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_ALL_NFTS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<div>대기중 ...</div>)
    }
    if (data) {
        return (
            <div>
                <h1>NFT 목록</h1>
                <table>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>전화번호</th>
                            <th>NFT Hash</th>
                            <th>Token Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.getAllNfts.map((data:any) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.user.nickname}</td>
                                        <td>{data.user.email}</td>
                                        <td>{data.user.phoneNumber}</td>
                                        <td>{data.nftHash}</td>
                                        <td>{data.tokenId}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <>데이터가 없습니다.</>
    )
}

export default Nfts