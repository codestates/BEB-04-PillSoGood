import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"
import { useState } from "react"

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

const UPDATE_USER_PASSWORD = gql`
mutation UpdateUserPassword($jwt: String!, $id: String!, $password: String) {
  updateUserPassword(jwt: $jwt, _id: $id, password: $password)
}
`;

export async function getServerSideProps(context:any) {
    const userId = context.query.param[0]
    return {
      props: {userId: userId}
    };
  }
  

const UserDetail = (props:any)=> {
    const [password, setPassword] = useState('')
    const router = useRouter()
    
    var [updateUserPassword, { data, loading, error }] = useMutation(UPDATE_USER_PASSWORD, {
        onCompleted: (result) => {
            alert("변경되었습니다.")
            router.back()
        },
        onError:(error) => {
            console.log(error)
        }
    })

    var { loading, data } = useQuery(
        GET_USER_INFO,
        { variables: { jwt: SessionStorage.getItem("jwt"), id:props.userId } }
    );

    while (loading) {
        return (<div>대기중 ...</div>)
    }

    const userInfo = data.getUserInfo

    const onSubmit = (e: any) => {
        e.preventDefault();
        updateUserPassword({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:props.userId,
                password:password
            }
        })
    };

    if(data) {
        return (
            <div>
                <h1>사용자 상세 정보</h1>
                <div>
                    <label>닉네임</label>
                    <span>{userInfo.nickname}</span>
                </div>
                <div>
                    <label>생년월일</label>
                    <span>{userInfo.dateOfBirth}</span>
                </div>
                <div>
                    <label>리워드 잔액</label>
                    <span>{userInfo.pointBalance}</span>
                </div>
                <div>
                    <label>전화 번호</label>
                    <span>{userInfo.phoneNumber}</span>
                </div>
                <div>
                    <label>가입 일자</label>
                    <span>{userInfo.createdAt}</span>
                </div>
                <div>
                    <label>새 비밀번호</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button onMouseDown={() => document.querySelector('#password')!.setAttribute('type', 'text')} 
                        onMouseUp={() => document.querySelector('#password')!.setAttribute('type', 'password')}>비밀번호 보이기</button>
                </div>
                <div>
                    <button onClick={() => router.back()}>목록으로</button>
                    <button type="submit" onClick={(e) => onSubmit(e)}>비밀번호 변경</button>
                </div>
            </div>
        )
    }
    return (
        <>
        </>
    )
}

export default UserDetail