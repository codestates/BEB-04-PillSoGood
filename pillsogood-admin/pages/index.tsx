import type { NextPage } from 'next'
import SessionStorage from "../utils/sessionStorage"
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <main>
        대시보드
        <button onClick={() => router.push("/users")}>사용자 목록</button>
        <button onClick={() => router.push("/bases")}>기본 캐릭터 목록</button>
      </main>
    </div>
  )
}

export default Home
