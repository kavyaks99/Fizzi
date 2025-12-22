import React from 'react'
import { FizziLogo } from './FizziLogo'

type Props = {}

export default function Header({}: Props) {
  return (
    <header className='flex justify-center p-4'><FizziLogo className="z-10 h-20 cursor-pointer text-sky-800"/></header>
  )
}