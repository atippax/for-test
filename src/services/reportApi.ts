import { CONTROLLER } from '@/constants'
import axiosClient from './apiClient'

export type RequestReportSummary = {
  month: number
  year: number
}
export interface ReportAllSummaryData {
  month: number
  year: number
  errorCode: string
  errorMessage: string
  status: string
  createdAt: number
  updatedAt: number
}
export type ResponseReportSummary = {
  id: number
  month: number
  year: number
  status: string
  reportProgresses: ReportAllSummaryData[]
  createdAt: string
  updatedAt: string
}
export interface ReportOneSummaryData {
  reportSummaryId: number
  reportType: {
    createdAt: string
    description: string | null
    id: number
    mappingTable: string
    name: string
  }
  createdAt: string
  errorCode: string
  errorMessage: string
  fileName: string
  id: number
  month: number
  status: string
  updatedAt: string
  year: number
}
export type ResponseOneReportSummary = {
  id: number
  month: number
  year: number
  status: string
  reportProgresses: ReportOneSummaryData[]
  createdAt: string
  updatedAt: string
}
export type ResponseReportSummaryWithProgress = {
  month: number
  year: number
  status: string
  createdAt: string
  updatedAt: string
}
export interface TypeResponse {
  id: number
  name: string
  mappingTable: string
  description: string
  createdAt: string
  updatedAt: string
}

const useReportApi = () => {
  const types = {
    async getAll() {
      const result = await axiosClient.get<TypeResponse[]>(
        `${CONTROLLER.REPORT.TYPE}`
      )
      return result.data
    },
  }
  const progress = {
    getAllWithProgressAndType: async (progressId: string, typeId: string) => {
      const result = await axiosClient.get<ResponseReportSummaryWithProgress[]>(
        `${CONTROLLER.REPORT.PROGRESS}/${progressId}/progress/${typeId}`
      )
      return result.data
    },
    editFile: async (progressId: string, typeId: string, file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const result = await axiosClient.put(
        `${CONTROLLER.REPORT.PROGRESS}/${progressId}/progress/${typeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return result.data
    },
  }

  const summary = {
    createNewSummary: async (body: RequestReportSummary) => {
      const result = await axiosClient.post<ResponseReportSummary>(
        `${CONTROLLER.REPORT.SUMMARY}`,
        {
          ...body,
        }
      )
      return result.data
    },
    verfify: async (id: string) => {
      const result = await axiosClient.post(
        `${CONTROLLER.REPORT.SUMMARY}/${id}/verify`
      )
      return result.data
    },
    getAllSummary: async () => {
      const result = await axiosClient.get<ResponseReportSummary[]>(
        `${CONTROLLER.REPORT.SUMMARY}`
      )
      return result.data
    },
    getOneSummary: async (id: string) => {
      const result = await axiosClient.get<ResponseOneReportSummary>(
        `${CONTROLLER.REPORT.SUMMARY}/${id}`
      )
      return result.data
    },
  }
  return {
    progress,
    summary,
    types,
  }
}

export default useReportApi
