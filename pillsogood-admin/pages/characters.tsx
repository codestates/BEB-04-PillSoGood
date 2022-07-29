import { gql, useQuery } from "@apollo/client";
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { PageTitle } from "../components/PageTitle"
import SessionStorage from "../utils/sessionStorage"
import Link from "next/link";
import { StyledLoadingGif } from "../components/StyledCommon"
import { StyledTable, StyledTh, StyledTd, StyledTr, StyledNewButtonDiv, StyledNewButton } from "../components/StyledTable"
import { CSVLink } from "react-csv";
import moment from "moment"

const headers = [
    { label: "no.", key: "no"},
    { label: "캐릭터 이름", key: "name"},
    { label: "이미지 Hash", key: "baseId"},
    { label: "캐릭터 설명", key: "description"},
    { label: "캐릭터 Token Id", key: "tokenId"},
    { label: "사용자 email", key: "email"},
    { label: "사용자 이름", key: "nickname"},
    { label: "사용자 전화번호", key: "phoneNumber"}
]

const GET_ALL_CHARACTERS = gql`
    query GetAllCharacters($jwt: String!) {
        getAllCharacters(jwt: $jwt) {
            _id
            userId
            name
            level
            baseId
            description
            hash
            tokenId
            userInfo {
                _id
                email
                nickname
                dateOfBirth
                pointBalance
                createdAt
                phoneNumber
            }
        }
    }
`

const Characters: NextPage = () => {
    const { loading, data } = useQuery(
        GET_ALL_CHARACTERS,
        { variables: { jwt: SessionStorage.getItem("jwt") } }
      );
    if (loading) {
        return (<StyledLoadingGif/>)
    }

    if (data) {
        var excelData = []
        for (let i = 0; i< data.getAllCharacters.length; i++) {
            let character = data.getAllCharacters[i]
            let characterData = {
                no: i+1,
                name: character.name, 
                baseId: character.baseId, 
                description: character.description, 
                tokenId: character.tokenId, 
                email: character.userInfo.email, 
                nickname: character.userInfo.nickname, 
                phoneNumber:character.userInfo.phoneNumber
            }
            excelData.push(characterData)
        }

        return (
            <div>
                <PageTitle title="사용자 캐릭터 목록"/>
                <StyledNewButtonDiv>
                    <CSVLink data={excelData} headers={headers} filename={ `${moment().format("yyyyMMDD")}_캐릭터목록.csv`}>
                        <StyledNewButton>.csv 다운로드</StyledNewButton>
                    </CSVLink>
                </StyledNewButtonDiv>
                <StyledTable>
                    <thead>
                        <StyledTr>
                            <StyledTh>캐릭터 Token Id</StyledTh>
                            <StyledTh>이미지</StyledTh>
                            <StyledTh>캐릭터 설명</StyledTh>
                            <StyledTh>사용자 email</StyledTh>
                            <StyledTh>사용자 이름</StyledTh>
                            <StyledTh>사용자 전화번호</StyledTh>
                        </StyledTr>
                    </thead>
                    <tbody>
                        {
                            data.getAllCharacters.map((data:any) => {
                                return (
                                    <tr key={data._id}>
                                        <StyledTd>{data.tokenId}</StyledTd>
                                        <StyledTd>
                                            <img src={data.baseId} style={{height:200}}/>
                                        </StyledTd>
                                        <StyledTd>{data.description}</StyledTd>
                                        <StyledTd>{data.userInfo.email}</StyledTd>
                                        <StyledTd>{data.userInfo.nickname}</StyledTd>
                                        <StyledTd>{data.userInfo.phoneNumber}</StyledTd>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </StyledTable>
            </div>
        )
    }
    return (
        <StyledLoadingGif/>
    )
}

export default Characters