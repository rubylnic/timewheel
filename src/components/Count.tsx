import React, { useEffect, useState } from 'react';

type CountProps = {
    data: DataInnerProps
}
type DataInnerProps = {
    from: number,
    to: number | undefined,
    duration: number
}
const Count = (props: CountProps) => {
    const { from, to, duration } = props.data
    const [count, setCount] = useState(from)

    useEffect(() => {
        let start = from;
        let end = to ? to : start;

        if (start === end) return;

        let incrementTime = (duration / end) * 1000;

        let timer = setInterval(() => {
            if (start > end) {
                setCount(start - 1)
                start -= 1;
            } else {
                setCount(start + 1)
                start += 1;
            }

            if (start === end) clearInterval(timer)
        }, incrementTime);

    }, [from, to, duration]);

    return (
        <>{count}</>
    );
}

export default Count;