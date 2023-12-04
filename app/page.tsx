import Image from 'next/image'
import gspaceLogo from '../public/gspace.svg';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-stone-950">
      <div className="bg-radial h-full w-full"></div>
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center">
        <Image width="400" src={gspaceLogo} alt="gspace logo"></Image>
      </div>
    </main>
  )
}
