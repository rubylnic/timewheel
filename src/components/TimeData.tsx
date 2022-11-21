
import { useAppSelector } from '../store/hooks';
import { selectActiveTime, selectFromYear, selectToYear } from '../store/timeSlice';
import Count from './Count';
import EventItem from './EventItem'
import Slider from './Slider'

type TimeDataProps = {
    data: any,
}

export default function TimeData(props: TimeDataProps) {
    const { data } = props;;
    const index = useAppSelector(selectActiveTime);
    const fromYear = useAppSelector(selectFromYear);
    const toYear = useAppSelector(selectToYear)
    const chosenPeriod = data[index - 1];
    const events = chosenPeriod?.events ? chosenPeriod?.events : [];

    return (

        <>
            <div className="timewheel__years">
                <div className="timewheel__year timewheel__year--from">
                    <Count data={{
                        "from": fromYear[0],
                        "to": fromYear[1],
                        "duration": 100
                    }} />
                </div>
                <div className="timewheel__year timewheel__year--to">
                    <Count data={{
                        "from": toYear[0],
                        "to": toYear[1],
                        "duration": 100
                    }} />
                </div>
            </div>
            <div className="timewheel__slider">
                <Slider>
                    {events?.map((item: any, index: any) =>
                        <EventItem key={index}{...item} />
                    )}
                </Slider>
            </div>
        </>

    )

}
