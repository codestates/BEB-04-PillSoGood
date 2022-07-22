import styled from "styled-components"
import { useRouter } from "next/router";
import SessionStorage from "../utils/sessionStorage"

const logout = () => {
    SessionStorage.removeItem("jwt")
    window.location.href = "/login"
}

const StyledNavBar = styled.div`
    height: 50px;
    margin-bottom: 50px;
    width: 100%;
    border-bottom: 1px solid #cdd0d4;
    padding-left: 10px;
`

const StyledNavBarItem = styled.span`
    line-height: 50px;
    margin-right: 20px;
    font-size: 20px;
    color: #6c757d;
`

export const StyledLogoutButton = styled.button`
    background-color:transparent;
    border: 0;
    outline: 0;
    vertical-align:middle;
`

export const NavBar = () => {
    const router = useRouter()
    return (
        <StyledNavBar>
            <StyledNavBarItem onClick={() => router.push("/")}>대시보드</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/users")}>사용자 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/bases")}>기본 캐릭터 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/items")}>아이템 목록</StyledNavBarItem>
            <StyledNavBarItem onClick={() => router.push("/nfts")}>NFT 목록</StyledNavBarItem>
            <StyledLogoutButton onClick={() => logout()}><img src="/logout.png"  style={{width:30, height:30}}/></StyledLogoutButton>
        </StyledNavBar>
    )
}