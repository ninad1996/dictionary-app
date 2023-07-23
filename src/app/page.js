import Image from 'next/image'
import Search from '../components/Search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className={'text-xl uppercase text-center block'}>Dictionary</h1>
        <Search/>
      </div>
    </main>
  )
}
