import Image from 'next/image'

import TierListForm from '@/components/form'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={` ${inter.className}`}
    >
      <TierListForm/>
    </main>
  )
}
