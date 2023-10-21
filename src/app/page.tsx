'use client'

import {Card} from '@/components/ui/card'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import {useKeenSlider} from 'keen-slider/react'
import {Button} from '@/components/ui/button'

export default function Home() {
  const [data, setData] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 13,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    setData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return <div></div>
  }

  const productCards = data.products.map((p) => {
    const colors = ['#070808', '#fafafa', '#4d4e4f', '#eda74c']
    const discountedPrice = ((100 - p.discountPercentage) / 100) * p.price
    const rounded = Math.round(discountedPrice * 10) / 10
    const actualPrice = rounded.toFixed(2)

    const colorButtons = colors.map((color) => {
      const isActive = color === '#070808'
      return (
        <button
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            isActive ? 'border' : ''
          } text-xs border-[--theme-primary]`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-orange-400`}
            style={{backgroundColor: `${color}`}}
          ></span>
        </button>
      )
    })

    return (
      <Card key={p.id} className='keen-slider__slide'>
        <div className='h-56 relative'>
          <Image
            src={p.thumbnail}
            alt={p.description}
            fill={true}
            className='object-cover'
          />
        </div>
        <div className='bg-white'>
          <p>{p.title}</p>
          <div className='flex space-x-1'>
            <p className='line-through'>${p.price}</p>
            <p className=''>From</p>
            <p className=''>${actualPrice}</p>
          </div>
          <div className='lg:flex space-x-1'>{colorButtons}</div>
        </div>
      </Card>
    )
  })

  return (
    <div>
      <h1 className='text-red-400 font-bold text-4xl'>Flash Deals</h1>
      <div className='flex items-center'>
        <Button
          variant={'ghost'}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        >
          {'<'}
        </Button>
        <div ref={sliderRef} className='keen-slider'>
          {productCards}
        </div>
        <Button
          variant={'ghost'}
          className='isR'
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={
            currentSlide ===
            instanceRef?.current?.track.details.slides.length - 1
          }
        >
          {'>'}
        </Button>
      </div>
    </div>
  )
}
