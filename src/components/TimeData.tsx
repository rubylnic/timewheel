
import { useAppSelector } from '../store/hooks'
import { selectActiveTime, setActiveTime } from '../store/timeSlice'
import EventItem from './EventItem'
import Slider from './Slider'
import type { Data } from './TimeWheel'


export default function TimeData({ timeFrom, timeTo, events, index }: Data) {
    const activeTime = useAppSelector(selectActiveTime);
    return (
        activeTime === index ?
            <>
                <div className="timewheel__years">
                    <div className="timewheel__year timewheel__year--from">{timeFrom}</div>
                    <div className="timewheel__year timewheel__year--to">{timeTo}</div>
                </div>
                {
                    <div className="timewheel__slider">
                        <Slider>
                            {events.map((item, index) =>
                                <EventItem key={index}{...item} />
                            )}
                        </Slider>
                    </div>
                }
            </>
            : <></>
    )

}
