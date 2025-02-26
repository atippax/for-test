import { CONTROLLER } from '@/constants'
import axiosClient from '@/services/apiClient'

export type RequestCOA = {
  coaNumber: number
  description: string
}
export type ResponseAllCOA = {
  id: number
  coaNumber: number
  description: string
  createdAt: string
  updatedAt: string
}

const useCoaNumber = () => {
  async function getAllCoaNumber() {
    const result = await axiosClient.get<ResponseAllCOA[]>(`${CONTROLLER.COA}`)
    return result.data
  }

  async function createCoaNumber(body: RequestCOA) {
    const result = await axiosClient.post(`${CONTROLLER.COA}`, { ...body })
    return result.data
  }

  async function editCoaNumber(id: string, body: RequestCOA) {
    const result = await axiosClient.put<ResponseAllCOA[]>(
      `${CONTROLLER.COA}/${id}`,
      { ...body }
    )
    return result.data
  }

  async function removeCoaNumber(id: string) {
    const result = await axiosClient.delete(`${CONTROLLER.COA}/${id}`)
    return result.data
  }

  return {
    getAllCoaNumber,
    createCoaNumber,
    editCoaNumber,
    removeCoaNumber,
  }
}

export default useCoaNumber
