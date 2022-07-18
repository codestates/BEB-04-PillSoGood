import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { useRouter } from 'next/router';

const GET_ITEMS = gql`
    query GetItems($jwt: String!) {
        getItems(jwt: $jwt) {
            _id
            name
            type
            imagePath
    }
}
`

const Items: NextPage = () => {
    const router = useRouter()
    const { loading, data } = useQuery(
        GET_ITEMS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<div>대기중 ...</div>)
    }
    if (data) {
        return (
            <div>
                <h1>아이템 목록</h1>
                <button type="button" onClick={() => router.push("/items/new")}>등록</button>
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>타입</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.getItems.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/items/${data._id}`}>
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.type}</td>
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
    return (
        <>데이터가 없습니다.</>
    )
}

export default Items