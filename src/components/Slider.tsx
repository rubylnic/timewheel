import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '../scss/swiper-custom.scss';
import { ReactNode } from 'react';

export default function Slider({ children }: { children: ReactNode[] }) {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    let spaceBetween = 25;
    let slidesPerView = 1.8;
    if (mediaQuery.matches) {
        spaceBetween = 80;
        slidesPerView = 3;
    }
    const SwiperButtonPrev = ({ children }: { children: ReactNode }) => {
        const swiper = useSwiper();
        return <button className="timewheel__swiper-button rotate" onClick={() => {
            swiper.slidePrev();
        }
        }>{children}</button>;
    };

    const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
        const swiper = useSwiper();
        return <button className="timewheel__swiper-button" onClick={() => {
            swiper.slideNext();
        }
        }>{children}</button>;
    };

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
            // navigation
            >
                <SwiperButtonPrev>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
                    </svg>
                </SwiperButtonPrev>
                {children.map(((item: any, index) => (
                    <SwiperSlide key={index}>{item}</SwiperSlide>
                )))}
                <SwiperButtonNext>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
                    </svg>
                </SwiperButtonNext>

            </Swiper>

        </>
    );
}
