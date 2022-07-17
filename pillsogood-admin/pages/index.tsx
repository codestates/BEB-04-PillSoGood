import type { NextPage } from 'next'
import SessionStorage from "../utils/sessionStorage"

const Home: NextPage = () => {
  console.log(SessionStorage.getItem("jwt"))
  return (
    <div>
      <main>
        대시보드
      </main>
    </div>
  )
}

export default Home
