'use client'

import {Card} from '@/components/ui/card'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import {useKeenSlider} from 'keen-slider/react'
import {Button} from '@/components/ui/button'
import {StarIcon, StarFilledIcon, HeartIcon} from '@radix-ui/react-icons'

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export default function Home() {
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 300px)': {
        slides: {perView: 2, spacing: 5},
      },
      '(min-width: 1000px)': {
        slides: {perView: 5, spacing: 13},
      },
    },
    slides: {
      perView: 5,
      spacing: 13,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
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

  let dots = [<></>]

  if (loaded && instanceRef.current) {
    dots = [
      ...Array(instanceRef.current?.track.details.slides.length - 4).keys(),
    ].map((_, i) => {
      const isActive = i === currentSlide
      return (
        <button
          key={i}
          onClick={() => {
            instanceRef.current?.moveToIdx(i)
          }}
        >
          <span
            className={`flex h-2 w-2 items-center justify-center rounded-full ${
              isActive ? 'bg-black' : 'bg-gray-200'
            }`}
          ></span>
        </button>
      )
    })
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
      <Card key={p.id} className='keen-slider__slide border-0 space-y-4'>
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
          <div className='flex space-x-1'>{colorButtons}</div>
        </div>
        <div className='flex justify-between'>
          <Button
            variant={'outline'}
            className='w-11/12 sm:w-full sm:grow border-black rounded-full'
          >
            Add To Cart
          </Button>
          <Button variant={'ghost'} className='hidden sm:flex'>
            <HeartIcon height={'20px'} width={'20px'} />
          </Button>
        </div>
      </Card>
    )
  })

  return (
    <div className='flex flex-col items-center space-y-6 mt-28'>
      <div className='flex justify-center items-center'>
        <Button
          variant={'ghost'}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
          className='invisible sm:visible'
        >
          {'<'}
        </Button>
        <div className='sm:w-[70rem] w-[23rem]'>
          <h1 className='text-red-400 font-bold text-4xl'>Flash Deals</h1>
          <div className=''>
            <div ref={sliderRef} className='keen-slider'>
              {productCards}
            </div>
          </div>
        </div>
        <Button
          variant={'ghost'}
          className='invisible lg:visible'
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
      <div className='flex space-x-2'>{dots}</div>
    </div>
  )
}
