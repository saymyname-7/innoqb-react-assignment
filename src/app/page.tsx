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
    return (
      <Card key={p.id} className='keen-slider__slide'>
        <Image src={p.thumbnail} alt={p.description} width={500} height={500} />
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
            currentSlide === instanceRef.current.track.details.slides.length - 1
          }
        >
          {'>'}
        </Button>
      </div>
    </div>
  )
}
