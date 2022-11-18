
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectActiveTime, selectRotate, setActiveTime, setRotate } from '../store/timeSlice'
import type { TimePointType } from './TimeWheel';

export default function TimePoint({ index, feature, swiperInstance }: TimePointType) {

    const dispatch = useAppDispatch();
    const activeTime = useAppSelector(selectActiveTime);
    const rotate = useAppSelector(selectRotate);
    let transformButton = `rotate(${60 * rotate}deg)`
    const positions = [{ top: '7%', right: '24%' }, { right: "-1px" }, { bottom: '7%', right: '24%' },
    { bottom: '7%', left: '24%' }, { left: '-1px' }, { top: '7%', left: '24%' }]

    const {
        top = 'auto',
        bottom = 'auto',
        left = 'auto',
        right = 'auto'
    } = positions[index - 1];

    function onPointClick() {
        let diff = index - activeTime;
        dispatch(setRotate(diff))
        swiperInstance?.slideTo(index - 1)
        dispatch(setActiveTime(index));
    }

    return (
        <div className='timewheel__button' style={{ top: top, bottom: bottom, left: left, right: right, transform: transformButton }} >
            <div className={activeTime === index ? "timewheel__feature timewheel__feature--active" : "timewheel__feature"}>{feature}</div>
            <button className={activeTime === index ? "timewheel__dot timewheel__dot--active" : "timewheel__dot"} onClick={onPointClick}><span>{index}</span></button>
        </div>
    )
}
