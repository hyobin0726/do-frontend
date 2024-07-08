import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Clock from '../images/Clock'

interface TimerProps {
    min: number
    handleTimeExpired: () => void
}

const Timer = forwardRef(({ min, handleTimeExpired }: TimerProps, ref) => {
    const [seconds, setSeconds] = useState<number>(min * 60)

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSeconds(min * 60)
        },
    }))

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(timer)
                    handleTimeExpired() // 타이머가 만료되면 handleTimeExpired 함수 호출
                }
                return Math.max(0, prevSeconds - 1)
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [min])

    const formatTime = (secs: number) => {
        if (isNaN(secs)) return '0:00'
        const minutes = Math.floor(secs / 60)
        const remainingSeconds = secs % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    return (
        <div className="flex flex-row items-center space-x-1">
            <Clock />
            <p className="text-[12px] font-Pretendard text-hobbing-red font-bold  mr-2">{formatTime(seconds)}</p>
        </div>
    )
})

Timer.displayName = 'Timer'

export default Timer
