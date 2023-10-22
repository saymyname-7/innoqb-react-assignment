'use client'

import {Card} from '@/components/ui/card'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import {useKeenSlider} from 'keen-slider/react'
import {Button} from '@/components/ui/button'
import {StarIcon, StarFilledIcon} from '@radix-ui/react-icons'

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

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
    const imageIndex = getRandomInt(p.images.length)
    const rating = Math.round(p.rating)
    const colors = ['#070808', '#fafafa', '#4d4e4f', '#eda74c']
    const discountedPrice = ((100 - p.discountPercentage) / 100) * p.price
    const rounded = Math.round(discountedPrice * 10) / 10
    const actualPrice = rounded.toFixed(2)

    const stars = [...Array(5)].map((_, i) => {
      if (i + 1 > rating) {
        return <StarIcon className='' color='#FFEB3B' />
      }
      return <StarFilledIcon className='' color='#FFEB3B' />
    })

    const colorButtons = colors.map((color) => {
      const isActive = color === '#070808'
      return (
        <button
          key={color}
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            isActive ? 'border' : ''
          } text-xs border-[--theme-primary]`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-orange-400`}
            style={{backgroundColor: `${color}`}}
          ></span>
        </button>
      )
    })

    return (
      <Card key={p.id} className='keen-slider__slide border-0'>
        <div className='h-56 group relative overflow-hidden'>
          <Image
            src={p.thumbnail}
            alt={p.description}
            fill={true}
            className='absolute top-0 left-0 object-cover duration-500 group-hover:opacity-0'
          />
          <Image
            src={p.images[imageIndex]}
            alt={p.description}
            fill={true}
            className='absolute top-0 left-0 object-cover duration-1000 transition group-hover:scale-110 opacity-0 group-hover:opacity-100 '
          />
          <div className='absolute left-0 right-0 top-1/3 m-auto w-fit invisible group-hover:visible group-hover:translate-y-1/2 transition duration-500'>
            <Button className='' variant={'secondary'}>
              Quick View
            </Button>
          </div>
        </div>
        <div className='bg-white text-stone-500 text-sm font-semibold space-y-2'>
          <div className='flex'>{stars}</div>
          <p>{p.title}</p>
          <div className='flex space-x-1 text-stone-400'>
            <p className='line-through'>${p.price}</p>
            <p className=''>From</p>
            <p className='text-red-500 font-bold'>${actualPrice}</p>
          </div>
          <div className='lg:flex space-x-1'>{colorButtons}</div>
        </div>
      </Card>
    )
  })

  return (
    <div className='flex justify-center items-center'>
      <Button
        variant={'ghost'}
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
        disabled={currentSlide === 0}
      >
        {'<'}
      </Button>
      <div className='w-[70rem]'>
        <h1 className='text-red-400 font-bold text-4xl'>Flash Deals</h1>
        <div className=''>
          <div ref={sliderRef} className='keen-slider'>
            {productCards}
          </div>
        </div>
      </div>
      <Button
        variant={'ghost'}
        className='isR'
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
        disabled={
          currentSlide === instanceRef?.current?.track.details.slides.length - 1
        }
      >
        {'>'}
      </Button>
    </div>
  )
}
