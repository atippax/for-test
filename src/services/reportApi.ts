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
  remark: string
  reportProgresses: ReportAllSummaryData[]
  createdAt: string
  updatedAt: string
}
interface ReportType {
  createdAt: string
  description: string | null
  id: number
  mappingTable: string
  name: string
}
export interface ReportOneSummaryData {
  reportSummaryId: number
  reportType: ReportType
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
export interface ResponseReportSummaryWithProgress {
  createdAt: string
  errorCode: string
  errorMessage: string | null
  fileName: string
  headers: string[]
  id: number
  month: number
  reportSummaryId: number
  reportType: ReportType
  rows: DataTable[]
  status: string
  updatedAt: string
  year: number
}
export type DataTable = {
  id: number
  month: number
  year: number
  CLOS_YM: number
  POLICY_NO: string
  INSURED_NO: string | null
  TRAN_NO: string
  TRAN_DATE: string
  ACC_NO: string
  SUB_CODE1: string | null
  SUB_CODE2: string | null
  SUB_CODE3: string | null
  SUB_CODE4: string | null
  SUB_CODE5: string | null
  AMOUNT: number
  DRCR: string
  EFF_DATE: string
  PORT_LVL1: string | null
  PORT_LVL2: string | null
  BU: string | null
  COSTCENTER: string | null
  GOC: string
  RNA_CODE1: string
  RNA_CODE2: string | null
  NOTE1: string
  NOTE2: string | null
  NOTE3: string | null
  CREATED_DATE: string
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

  const summary = {
    getAllWithProgressAndType: async (progressId: string, typeId: string) => {
      const result = await axiosClient.get<ResponseReportSummaryWithProgress>(
        `${CONTROLLER.REPORT.SUMMARY}/${progressId}/progress/${typeId}`
      )
      return result.data
    },
    editFile: async (progressId: string, typeId: string, file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const result = await axiosClient.put(
        `${CONTROLLER.REPORT.SUMMARY}/${progressId}/progress/${typeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return result.data
    },
    createNewSummary: async (body: RequestReportSummary) => {
      const result = await axiosClient.post<ResponseReportSummary>(
        `${CONTROLLER.REPORT.SUMMARY}`,
        {
          ...body,
        }
      )
      return result.data
    },
    async getFileBinary(id: number) {
      const result = await axiosClient.get<Blob>(
        `${CONTROLLER.REPORT.SUMMARY}/${id}/export`,
        { responseType: 'blob' }
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
    editSummary: async ({ id, remark }: { id: number; remark: string }) => {
      const result = await axiosClient.put<ResponseReportSummary>(
        `${CONTROLLER.REPORT.SUMMARY}/${id}`,
        { remark }
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
    summary,
    types,
  }
}

export default useReportApi
