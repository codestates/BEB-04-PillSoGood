import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { useRouter } from 'next/router';

const GET_BASES = gql`
    query GetBases($jwt: String!) {
        getBases(jwt: $jwt) {
            _id
            name
            level
            imagePath
    }
}
`

const Bases: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_BASES,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<div>대기중 ...</div>)
    }
    if (data) {
        return (
            <div>
                <h1>기본 캐릭터 목록</h1>
                <button type="button" onClick={() => router.push("/bases/new")}>등록</button>
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>레벨</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.getBases.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/bases/${data._id}`}>
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.level}</td>
                                        </tr>
                                    </Link>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    return (<></>)
}

export default Bases