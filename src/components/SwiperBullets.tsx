import React from 'react'
import SwiperBullet from './SwiperBullet'
import type { Data } from './TimeWheel'

export default function SwiperBullets({ data }: { data: Data[] }) {
    return (
        <div className='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal'>
            {data.map((item, index) => <SwiperBullet key={index} index={index} item={item} />)}
        </div>
    )


}


