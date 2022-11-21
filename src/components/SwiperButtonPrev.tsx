import React from 'react'
import { useSwiper } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveTime, selectRotate, setActiveTime, setFromYear, setRotate, setToYear } from '../store/timeSlice';
import { SwiperButtonProps } from './TimeWheel';

export default function SwiperButtonPrev(props: SwiperButtonProps) {
    const { data, children } = props;
    const swiper = useSwiper();
    const rotate = useAppSelector(selectRotate);
    const dispatch = useAppDispatch();
    const activeTime = useAppSelector(selectActiveTime);

    return <button className="timewheel__swiper-button" onClick={() => {
        swiper.slidePrev();
        if (rotate < 1) {
            dispatch(setRotate(5))
            dispatch(setActiveTime(6));
            dispatch(setFromYear(data[5].timeFrom))
            dispatch(setToYear(data[5].timeTo))
        } else {
            dispatch(setRotate(-1))
            dispatch(setActiveTime(activeTime - 1));
            dispatch(setFromYear(data[activeTime - 2].timeFrom))
            dispatch(setToYear(data[activeTime - 2].timeTo))
        }
    }
    }>{children}</button>;
}
