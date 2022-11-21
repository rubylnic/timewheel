import React from 'react'
import { useSwiper } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveTime, setActiveTime, setFromYear, setToYear } from '../store/timeSlice';
import 'swiper/scss/pagination';
import '../scss/swiper-custom.scss';


export default function SwiperBullet(props: { index: number, item: any }) {
    const dispatch = useAppDispatch();
    const activeTime = useAppSelector(selectActiveTime);
    const item = props.item;
    let index = props.index + 1;
    const swiper = useSwiper();
    return (
        <div
            className={activeTime === index ? 'swiper-pagination-bullet swiper-pagination-bullet-active' : 'swiper-pagination-bullet'}
            onClick={() => {
                swiper.slideTo(index);
                dispatch(setActiveTime(index))
                dispatch(setFromYear(item.timeFrom))
                dispatch(setToYear(item.timeTo))
            }}
        ></div>
    )
}
