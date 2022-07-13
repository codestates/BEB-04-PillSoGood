import type { GetServerSideProps, NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"

const GET_USER_INFO = gql`
    query GetUserInfo($jwt: String!, $id: String) {
        getUserInfo(jwt: $jwt, _id: $id) {
            _id
            email
            password
            nickname
            dateOfBirth
            pointBalance
            createdAt
            disease
            phoneNumber
    }
}
`

export async function getServerSideProps(context:any) {
    const userId = context.query.param[0]
    return {
      props: {userId: userId}
    };
  }
  

const UserDetail = (props:any)=> {
    
    const { loading, data } = useQuery(
        GET_USER_INFO,
        { variables: { jwt: SessionStorage.getItem("jwt"), id:props.userId } }
    );

    while (loading) {
        console.log("loading", loading)
        return (<div>대기중 ...</div>)
    }
    const userInfo = data.getUserInfo
    if(data) {
        return (
            <div>
                <div>
                    <label>닉네임</label>
                    <span>{userInfo.nickname}</span>
                </div>
                <div>
                    <label>생년월일</label>
                    <span>{userInfo.dateOfBirth}</span>
                </div>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}

export default UserDetail