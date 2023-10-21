'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    setData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div></div>
}
