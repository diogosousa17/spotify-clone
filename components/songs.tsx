import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './song'

export default function Songs() {
  const playlist = useRecoilValue<any>(playlistState)
  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
      {playlist?.tracks.items.map((track: any, i: any) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}
