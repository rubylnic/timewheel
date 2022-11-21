import React from 'react'
import { useAppSelector } from '../store/hooks';
import { selectRotate } from '../store/timeSlice';
import TimePoint from './TimePoint';
import type { Data } from './TimeWheel'


export default function TimeWheelCircle({ data }: { data: Data[] }) {
    const rotate = useAppSelector(selectRotate);
    // const transitionDuration = `${0.5 * rotate}s`
    const transformStyle = rotate > 4 && rotate < 1 ? `rotate(${60 * rotate}deg)` : `rotate(-${60 * rotate}deg)`;

    return (
        <div className='timewheel__center'>
            <div className='timewheel__content' style={{ transform: transformStyle, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    data.map((item, index) => (
                        <TimePoint key={index} index={index + 1} feature={item.feature} item={item} />
                    ))
                }
            </div>
        </div>

    )
}
