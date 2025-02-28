import { baseUrl } from '@/services/apiClient'
import { ReportOneSummaryData } from '@/services/reportApi'
import { useEffect, useState, useCallback } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const receiveFieldStatus = useCallback(
    (
      summaryId: string,
      calbackFunction: (data: ReportOneSummaryData) => void
    ) => {
      const key = `report-summary-${summaryId}`
      if (socket) {
        socket.emit('joinRoom', key)
        socket.on('update-field-status', calbackFunction)
      }
    },
    [socket]
  )
  function leaveRoomReport(summaryId: string) {
    if (summaryId && socket) {
      socket.emit('leaveRoom', summaryId)
      socket.disconnect()
    }
  }

  useEffect(() => {
    const newSocket = socketIOClient(`${baseUrl}socket`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    })
    setSocket(newSocket)
    socket?.on('joinedRoom', (data: string) => {
      console.log(data)
    })
  }, [])

  return { receiveFieldStatus, socket, leaveRoomReport }
}

export default useSocket
