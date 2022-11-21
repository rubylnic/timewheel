import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../scss/TimeWheel.scss';
import TimeData from './TimeData';
import WheelSlider from './WheelSlider';
import TimeWheelCircle from './TimeWheelCircle';
import { ReactNode } from 'react';


export type Event = {
    "year": number,
    "text": string
}

export type Data = {
    "feature": string,
    "timeFrom": number,
    "timeTo": number,
    "events": Event[],
    "position": Position,
}

export type TimePointType = {
    index: number,
    feature: string,
    item: any
}

export type Position = {
    top?: string,
    bottom?: string,
    left?: string,
    right?: string
}

export type SwiperButtonProps = {
    children: ReactNode,
    data: any
}
const mediaQuery = window.matchMedia('(min-width: 768px)')

export default function TimeWheel() {
    const [data, setData] = useState<Data[]>([]);

    // Эмуляция работы с сервером
    useEffect(() => {
        axios.get('data.json').then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }, [])

    return (

        <div className='timewheel' >
            <div className="timewheel__container">
                <h1 className='timewheel__title'>Исторические даты</h1>
                <div className="timewheel__bottom">
                    <WheelSlider data={data} />

                    <TimeData data={data} />

                    {mediaQuery.matches ?
                        <TimeWheelCircle data={data} />
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
