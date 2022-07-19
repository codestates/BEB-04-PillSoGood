import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";

const GET_USERS = gql`
    query GetUsers($jwt: String!, $nickname: String, $email: String) {
        getUsers(jwt: $jwt, nickname: $nickname, email: $email) {
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
`

const Users: NextPage = () => {
    const { loading, data } = useQuery(
        GET_USERS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<div>대기중 ...</div>)
    }
    if (data) {
        return (
            <div>
                <h1>사용자 목록</h1>
                <table>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>전화 번호</th>
                            <th>생년월일</th>
                            <th>리워드</th>
                            <th>질환</th>
                            <th>가입 일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.getUsers.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/users/${data._id}`}>
                                        <tr>
                                            <td>{data.nickname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.dateOfBirth}</td>
                                            <td>{data.pointBalance}</td>
                                            <td>{data.disease}</td>
                                            <td>{data.createdAt}</td>
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

export default Users