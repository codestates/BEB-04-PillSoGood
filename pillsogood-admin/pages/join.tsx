import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const JOIN_ADMIN = gql`
mutation JoinAdmin($email: String!, $name: String!, $password: String) {
    joinAdmin(email: $email, name: $name, password: $password)
}
`;

const Join: NextPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [joinAdmin, { data, loading, error }] = useMutation(JOIN_ADMIN, {
        onCompleted: (data) => {
            if(data.joinAdmin === 200) router.push("/login");
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        joinAdmin({
            variables: {
                email: email,
                password: password,
                name: name
            }
        })
    };

    return (
        <div>
            <h1>관리자 등록</h1>
            <div>
                <label>이메일</label>
                <input type="email" onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div>
                <label>이름</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div>
                <button type="submit" onClick={(e) => onSubmit(e)}>등록</button>
            </div>
        </div>
    )
}

export default Join