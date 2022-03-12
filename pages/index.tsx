import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/center'
import Player from '../components/player'
import Sidebar from '../components/sidebar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
