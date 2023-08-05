import Board from '@/Components/Board'
import Header from '@/Components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />
      <h1>Productivity-Tool</h1>
    </main>
  )
}
