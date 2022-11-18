
import type { Event } from './TimeWheel'

export default function EventItem({ year, text }: Event) {
    return (
        <div>
            <div className='timewheel__event-year'>{year}</div>
            <div className='timewheel__event-text'>{text}</div>
        </div>
    )
}
