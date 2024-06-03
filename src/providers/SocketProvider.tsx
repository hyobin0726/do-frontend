'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

const WebSocketContext = createContext<WebSocket | null>(null)

export const useWebSocket = () => {
    return useContext(WebSocketContext)
}

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        const webSocketUrl = `ws://localhost:8080/ws`
        const webSocket = new WebSocket(webSocketUrl)

        webSocket.onopen = () => {
            console.log('Connected to ' + webSocketUrl)
        }

        webSocket.onclose = (error) => {
            console.log('Disconnected from ' + webSocketUrl)
            console.log(error)
        }

        webSocket.onerror = (error) => {
            console.log('Connection error ' + webSocketUrl)
            console.log(error)
        }

        setWs(webSocket)

        return () => {
            webSocket.close()
        }
    }, [])

    return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}

export default WebSocketProvider
