
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../store/hooks';
import { selectActiveTime } from '../store/timeSlice';
import type { Data } from './TimeWheel';
import SwiperButtonNext from './SwiperButtonNext';
import SwiperButtonPrev from './SwiperButtonPrev';
import SwiperBullets from './SwiperBullets';


export default function WheelSlider({ data }: { data: Data[] }) {
    const activeTime = useAppSelector(selectActiveTime);
    let indexRender = activeTime < 10 ? "0" + activeTime : activeTime;
    let lengthRender = data.length < 10 ? "0" + data.length : data.length;
    return (
        <div className="timewheel__pagination-swiper">
            <Swiper>
                <div className='timewheel__swiper-outof'>{indexRender + "/" + lengthRender}</div>
                <div className='timewheel__swiper-buttons'>
                    <SwiperButtonPrev data={data}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
                        </svg>
                    </SwiperButtonPrev>

                    <SwiperButtonNext data={data}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
                        </svg>
                    </SwiperButtonNext>
                </div>
                <SwiperBullets data={data} />
                {data.map((index) => {
                    return (
                        <SwiperSlide>1</SwiperSlide>
                    )
                }
                )}
            </Swiper>
        </div>
    )
}
