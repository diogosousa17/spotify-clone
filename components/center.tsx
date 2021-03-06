import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

export default function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState<any>(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data.body)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [spotifyApi, playlistId])
  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80" onClick={() => signOut()}>
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`p-8 flex h-80 w-full items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}
