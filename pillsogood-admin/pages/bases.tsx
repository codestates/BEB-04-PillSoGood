import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { useRouter } from 'next/router';
import { PageTitle } from "../components/PageTitle"
import { StyledTable, StyledTh, StyledTd, StyledTr } from "../components/StyledTable"
import React from "react";

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
                <PageTitle title="기본 캐릭터 목록"/>
                <button type="button" onClick={() => router.push("/bases/new")}>등록</button>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh>이름</StyledTh>
                            <StyledTh>레벨</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getBases.map((data:any) => {
                                return (
                                    <Link key={data._id} href={`/bases/${data._id}`}>
                                        <tr>
                                            <StyledTd>{data.name}</StyledTd>
                                            <StyledTd>{data.level}</StyledTd>
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

export default Bases