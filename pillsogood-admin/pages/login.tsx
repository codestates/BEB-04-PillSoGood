import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import SessionStorage from "../utils/sessionStorage"
import { PageTitle } from "../components/PageTitle"
import React from "react";

const LOGIN_ADMIN = gql`
mutation LoginAmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      jwt
    }
  }
`;

const Login: NextPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginAdmin, { data, loading, error }] = useMutation(LOGIN_ADMIN, {
        onCompleted: (data) => {
            SessionStorage.setItem("jwt", data.loginAdmin.jwt)
            router.push("/")
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault();
        loginAdmin({
            variables: {
                email: email,
                password: password
            }
        })
    };

    return (
        <div>
            <PageTitle title="관리자 로그인"/>
            <div>
                <label>이메일</label>
                <input type="email" onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div>
                <button type="submit" onClick={(e) => onSubmit(e)}>로그인</button>
            </div>
        </div>
    )
}

export default Login