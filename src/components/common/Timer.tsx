'use client'

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Clock from '../images/Clock'

interface TimerProps {
    min: number
}

const Timer = forwardRef(({ min }: TimerProps, ref) => {
    const [seconds, setSeconds] = useState<number>(min * 60)
    const [timerActive, setTimerActive] = useState<boolean>(true)

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSeconds(min * 60)
            setTimerActive(true)
        },
    }))

    useEffect(() => {
        if (seconds > 0 && timerActive) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else {
            setTimerActive(false)
        }
    }, [seconds, timerActive])

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
