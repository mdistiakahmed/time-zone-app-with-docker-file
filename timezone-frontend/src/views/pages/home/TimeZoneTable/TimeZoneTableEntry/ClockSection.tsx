import { useEffect, useState } from 'react';
import Clock from './Clock';

const ClockSection = ({ hourDiff, minuteDiff }: ClockSectionProps) => {
    const [secondRatio, setSecondRatio] = useState(0);
    const [minuteRatio, setMinuteRatio] = useState(0);
    const [hourRatio, setHourRatio] = useState(0);
    const [digiTime, setDigiTime] = useState('');
    const [diff, setDiff] = useState('');

    const setClock = (hourDiff: number, minuteDiff: number) => {
        let offset = Math.abs(hourDiff) * 3600 * 1000 + minuteDiff * 60 * 1000;
        if (hourDiff < 0) {
            offset = offset * -1;
        }

        const currentDate: Date = new Date();
        const convertedDate: Date = new Date(
            currentDate.getTime() +
                currentDate.getTimezoneOffset() * 60 * 1000 +
                offset,
        );

        let secondRatio1 = convertedDate.getSeconds() / 60;
        let minuteRatio1 = (secondRatio1 + convertedDate.getMinutes()) / 60;
        let hourRatio1 = (minuteRatio1 + convertedDate.getHours()) / 12;
        setSecondRatio(secondRatio1);
        setMinuteRatio(minuteRatio1);
        setHourRatio(hourRatio1);
        setDigiTime(
            convertedDate.getHours() +
                ' : ' +
                convertedDate.getMinutes() +
                ' : ' +
                convertedDate.getSeconds(),
        );

        let timeDiff = '+';
        let diffBetweenBrowserTime =
            convertedDate.getTime() - currentDate.getTime(); // in milli
        if (diffBetweenBrowserTime > 0) {
            timeDiff = '-';
        }
        const hh = Math.floor(Math.abs(diffBetweenBrowserTime) / 3600000);
        diffBetweenBrowserTime =
            Math.abs(diffBetweenBrowserTime) - hh * 3600000;
        const mm = Math.floor(diffBetweenBrowserTime / 60000);
        timeDiff = timeDiff + '( ' + hh + ' : ' + mm + ' )';
        if (diffBetweenBrowserTime < 0) {
            timeDiff = '-' + timeDiff;
        }
        setDiff(timeDiff);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setClock(hourDiff, minuteDiff);
        }, 1000);
        return () => clearInterval(interval);
    }, [hourDiff, minuteDiff]);

    return (
        <Clock
            hourRatio={hourRatio}
            minuteRatio={minuteRatio}
            secondRatio={secondRatio}
            digitalTime={digiTime}
            browserTimeDifference={diff}
        />
    );
};

export default ClockSection;

type ClockSectionProps = {
    hourDiff: number;
    minuteDiff: number;
};
