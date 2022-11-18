import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TimePoint from './TimePoint';
import '../scss/TimeWheel.scss';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectActiveTime, selectRotate, setActiveTime, setRotate } from '../store/timeSlice';
import TimeData from './TimeData';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination } from 'swiper'
import type { Swiper as SwiperType } from 'swiper';
import { ReactNode } from 'react';

export type Event = {
    "year": number,
    "text": string
}

export type Data = {
    "index": number,
    "feature": string,
    "timeFrom": number,
    "timeTo": number,
    "events": Event[],
    "position": Position,
}

export type TimePointType = {
    index: number,
    feature: string,
    swiperInstance: SwiperType | null
}

export type Position = {
    top?: string,
    bottom?: string,
    left?: string,
    right?: string
}
const mediaQuery = window.matchMedia('(min-width: 768px)')

export default function TimeWheel() {
    const [data, setData] = useState<Data[]>([]);
    const rotate = useAppSelector(selectRotate);
    const dispatch = useAppDispatch();
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const activeTime = useAppSelector(selectActiveTime);
    const transformStyle = rotate > 4 && rotate < 1 ? `rotate(${60 * rotate}deg)` : `rotate(-${60 * rotate}deg)`;
    // const transitionDuration = `${0.5 * rotate}s`
    let indexRender = activeTime < 10 ? "0" + activeTime : activeTime;
    let lengthRender = data.length < 10 ? "0" + data.length : data.length;

    // Эмуляция работы с сервером
    useEffect(() => {
        axios.get('data.json').then((res) => {
            setData(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }, [])


    const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
        const swiper = useSwiper();
        return <button className="timewheel__swiper-button rotate" onClick={() => {
            if (rotate > 4) {
                swiper.slideNext();
                dispatch(setRotate(-5))
                dispatch(setActiveTime(1))
            } else {
                swiper.slideNext();
                dispatch(setRotate(1))
                dispatch(setActiveTime(activeTime + 1))
            }
        }
        }>{children}</button>;
    };

    const SwiperButtonPrev = ({ children }: { children: ReactNode }) => {
        const swiper = useSwiper();
        return <button className="timewheel__swiper-button" onClick={() => {
            if (rotate < 1) {
                swiper.slidePrev();
                dispatch(setRotate(6))
                dispatch(setActiveTime(6))
            } else {
                swiper.slidePrev();
                dispatch(setRotate(-1))
                dispatch(setActiveTime(activeTime - 1))
            }
        }
        }>{children}</button>;
    };

    const SwiperBullet = (props: { index: number }) => {
        let index = props.index + 1;
        const swiper = useSwiper();
        return (
            <div
                className={activeTime === index ? 'swiper-pagination-bullet swiper-pagination-bullet-active' : 'swiper-pagination-bullet'}
                onClick={() => {
                    swiper.slideTo(index);
                    dispatch(setActiveTime(index))
                }}
            ></div>
        )
    }

    return (

        <div className='timewheel' >
            <div className="timewheel__container">
                <h1 className='timewheel__title'>Исторические даты</h1>
                <div className="timewheel__bottom">
                    {mediaQuery.matches ?
                        <>
                            <div className='timewheel__center'>
                                <div className='timewheel__content' style={{ transform: transformStyle, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {
                                        data.map((item, index) => (
                                            <TimePoint key={index} index={index + 1} feature={item.feature} swiperInstance={swiperInstance} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="timewheel__pagination-swiper">
                                <Swiper
                                    modules={[Pagination]}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    onSwiper={(swiper) => setSwiperInstance(swiper)}>
                                    <div className='timewheel__swiper-outof'>{indexRender + "/" + lengthRender}</div>
                                    <div className='timewheel__swiper-buttons'>
                                        <SwiperButtonPrev>

                                            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
                                            </svg>

                                        </SwiperButtonPrev>
                                        <SwiperButtonNext>

                                            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
                                            </svg>

                                        </SwiperButtonNext>
                                    </div>
                                    {data.map((index) => {
                                        return (
                                            <SwiperSlide>1</SwiperSlide>
                                        )
                                    }
                                    )}
                                </Swiper>
                            </div>
                        </>
                        :
                        <div className="timewheel__pagination-swiper">
                            <Swiper
                                modules={[Pagination]}
                                onSwiper={(swiper) => setSwiperInstance(swiper)}>
                                <div className='timewheel__swiper-outof'>{indexRender + "/" + lengthRender}</div>
                                <div className='timewheel__swiper-buttons'>
                                    <SwiperButtonPrev>

                                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178" stroke="#42567A" strokeWidth="2" />
                                        </svg>


                                    </SwiperButtonPrev>
                                    <SwiperButtonNext>

                                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178" stroke="#42567A" strokeWidth="2" />
                                        </svg>


                                    </SwiperButtonNext>
                                </div>
                                <div className='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal'>

                                    {data.map((item, index) => {
                                        return (
                                            <SwiperBullet key={index} index={index} />
                                        )
                                    })}
                                </div>
                                {data.map((index) => {
                                    return (
                                        <SwiperSlide>1</SwiperSlide>
                                    )
                                }
                                )}
                            </Swiper>
                        </div>
                    }
                    <>
                        {
                            data.map((item, index) => (
                                <TimeData {...item} index={index + 1} key={index} />
                            ))
                        }
                    </>
                </div>
            </div>
        </div>
    )
}
