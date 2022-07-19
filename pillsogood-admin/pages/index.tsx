import type { NextPage } from 'next'
import { useRouter } from "next/router";
import SessionStorage from "../utils/sessionStorage"

const logout = () => {
  SessionStorage.removeItem("jwt")
  window.location.href = "/login"
}

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <main>
        대시보드
        <button onClick={() => router.push("/users")}>사용자 목록</button>
        <button onClick={() => router.push("/bases")}>기본 캐릭터 목록</button>
        <button onClick={() => router.push("/items")}>아이템 목록</button>
        <button onClick={() => router.push("/nfts")}>NFT 목록</button>
        <button onClick={() => logout()}>로그아웃</button>
      </main>
    </div>
  )
}

export default Home
