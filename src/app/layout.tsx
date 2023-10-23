'use client'

import {Inter} from 'next/font/google'
import './globals.css'
import {MagnifyingGlassIcon, HamburgerMenuIcon} from '@radix-ui/react-icons'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import {PiShoppingCartLight} from 'react-icons/pi'
import {BsPerson} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'

import Image from 'next/image'

const inter = Inter({subsets: ['latin']})

const ThemeContext = createContext({setItemAmount: (value: number) => {}} as {
  setItemAmount: Dispatch<SetStateAction<number>>
})

export function useThemContext() {
  return useContext(ThemeContext)
}

export function ThemeProvider({
  children,
  setItemAmount,
}: {
  children: ReactNode
  setItemAmount: Dispatch<SetStateAction<number>>
}) {
  return (
    <ThemeContext.Provider value={{setItemAmount}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [itemAmount, setItemAmount] = useState<number>(0)
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='bg-white sm:bg-innoqb-50 h-20 flex justify-center border-b pr-4'>
          <div className='w-[23rem] sm:w-[70rem] flex justify-between items-center'>
            <div className='hidden sm:flex sm:w-3/5 items-center space-x-12 '>
              <Image
                src={'/innoqb-logo.png'}
                alt='InnoQb logo'
                width={100}
                height={80}
              />
              <div className='sm:flex w-full items-center'>
                <Input
                  placeholder='Search the store'
                  className='rounded-none rounded-s-full focus-visible:ring-transparent'
                />
                <Button
                  variant={'secondary'}
                  className='rounded-none rounded-e-full'
                >
                  <MagnifyingGlassIcon width={'25px'} height={'25px'} />
                </Button>
              </div>
            </div>
            <div className='flex sm:hidden items-center'>
              <Button variant={'ghost'}>
                <HamburgerMenuIcon width={'25px'} height={'25px'} />
              </Button>

              <Button variant={'ghost'}>
                <MagnifyingGlassIcon width={'25px'} height={'25px'} />
              </Button>
            </div>
            <div className='flex items-center space-x-8'>
              <div className='hidden sm:flex flex-col items-center justify-center space-y-1'>
                <AiOutlineHeart className='h-[30px] w-[30px] fill-black sm:fill-orange-300 transition duration-500 ease-in-out hover:scale-125 cursor-pointer' />
                <p className='text-white text-sm'>Wish Lists</p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-1'>
                <BsPerson className='h-[30px] w-[30px] fill-black sm:fill-orange-300 transition duration-500 ease-in-out hover:scale-125 cursor-pointer' />
                <p className='hidden sm:flex text-white text-sm'>Sign In</p>
              </div>
              <div className='relative flex flex-col items-center justify-center space-y-1'>
                <PiShoppingCartLight className='h-[30px] w-[30px] fill-black sm:fill-orange-300 transition duration-500 ease-in-out hover:scale-125 cursor-pointer' />
                <p className='hidden sm:flex text-white text-sm'>Cart</p>
                <span
                  className={`absolute top-0 -right-1 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-white text-xs`}
                  style={{backgroundColor: `#44a6c6`}}
                >
                  {itemAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ThemeProvider setItemAmount={setItemAmount}>{children}</ThemeProvider>
      </body>
    </html>
  )
}

// <main className='flex min-h-screen flex-col items-center justify-between p-24'>
//   <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
//     <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
//       Get started by editing&nbsp;
//       <code className='font-mono font-bold'>src/app/page.tsx</code>
//     </p>
//     <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
//       <a
//         className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
//         href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//         target='_blank'
//         rel='noopener noreferrer'
//       >
//         By{' '}
//         <Image
//           src='/vercel.svg'
//           alt='Vercel Logo'
//           className='dark:invert'
//           width={100}
//           height={24}
//           priority
//         />
//       </a>
//     </div>
//   </div>
//
//   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//     <Image
//       className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
//       src='/next.svg'
//       alt='Next.js Logo'
//       width={180}
//       height={37}
//       priority
//     />
//   </div>
//
//   <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
//     <a
//       href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//       className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
//       target='_blank'
//       rel='noopener noreferrer'
//     >
//       <h2 className={`mb-3 text-2xl font-semibold`}>
//         Docs{' '}
//         <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
//           -&gt;
//         </span>
//       </h2>
//       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//         Find in-depth information about Next.js features and API.
//       </p>
//     </a>
//
//     <a
//       href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
//       className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
//       target='_blank'
//       rel='noopener noreferrer'
//     >
//       <h2 className={`mb-3 text-2xl font-semibold`}>
//         Learn{' '}
//         <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
//           -&gt;
//         </span>
//       </h2>
//       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//         Learn about Next.js in an interactive course with&nbsp;quizzes!
//       </p>
//     </a>
//
//     <a
//       href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//       className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
//       target='_blank'
//       rel='noopener noreferrer'
//     >
//       <h2 className={`mb-3 text-2xl font-semibold`}>
//         Templates{' '}
//         <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
//           -&gt;
//         </span>
//       </h2>
//       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//         Explore the Next.js 13 playground.
//       </p>
//     </a>
//
//     <a
//       href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
//       className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
//       target='_blank'
//       rel='noopener noreferrer'
//     >
//       <h2 className={`mb-3 text-2xl font-semibold`}>
//         Deploy{' '}
//         <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
//           -&gt;
//         </span>
//       </h2>
//       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//         Instantly deploy your Next.js site to a shareable URL with Vercel.
//       </p>
//     </a>
//   </div>
// </main>
