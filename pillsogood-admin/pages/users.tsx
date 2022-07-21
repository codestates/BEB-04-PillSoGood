import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { PageTitle } from "../components/PageTitle"
import { StyledTable, StyledTh, StyledTd, StyledTr } from "../components/StyledTable"
import React from "react";

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
                <PageTitle title="사용자 목록"/>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh scope="col">닉네임</StyledTh>
                            <StyledTh scope="col">이메일</StyledTh>
                            <StyledTh scope="col">전화 번호</StyledTh>
                            <StyledTh scope="col">생년월일</StyledTh>
                            <StyledTh scope="col">리워드</StyledTh>
                            <StyledTh scope="col">질환</StyledTh>
                            <StyledTh scope="col">가입 일자</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getUsers.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/users/${data._id}`}>
                                        <tr>
                                            <StyledTd>{data.nickname}</StyledTd>
                                            <StyledTd>{data.email}</StyledTd>
                                            <StyledTd>{data.phoneNumber}</StyledTd>
                                            <StyledTd>{data.dateOfBirth}</StyledTd>
                                            <StyledTd>{data.pointBalance}</StyledTd>
                                            <StyledTd>{data.disease}</StyledTd>
                                            <StyledTd>{data.createdAt}</StyledTd>
                                        </tr>
                                    </Link>
                                )
                            })
                        }
                    </tbody>
                </StyledTable>
            </div>
        )
    }
    return (
        <>데이터가 없습니다.</>
    )
}

export default Users