import React from 'react'
import { useSwiper } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveTime, selectRotate, setActiveTime, setFromYear, setRotate, setToYear } from '../store/timeSlice';
import { SwiperButtonProps } from './TimeWheel';



export default function SwiperButtonNext(props: SwiperButtonProps) {
    const { data, children } = props;
    const swiper = useSwiper();
    const rotate = useAppSelector(selectRotate);
    const dispatch = useAppDispatch();
    const activeTime = useAppSelector(selectActiveTime);
    const activePeriod = data[activeTime];

    return <button className="timewheel__swiper-button rotate" onClick={() => {
        swiper.slideNext();
        if (rotate > 4) {
            dispatch(setRotate(-5))
            dispatch(setActiveTime(1));
        } else {
            dispatch(setRotate(1));
            dispatch(setActiveTime(activeTime + 1));
        }
        dispatch(setFromYear(activePeriod.timeFrom))
        dispatch(setToYear(activePeriod.timeTo))
    }
    }>{children}</button>;
}
