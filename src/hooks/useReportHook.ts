import useReport, { RequestReportSummary } from '@/services/reportApi'

const useReportHook = () => {
  const reportApi = useReport()
  const types = {
    async getAll() {
      const result = await reportApi.types.getAll()
      return result
    },
  }

  const summary = {
    getAllWithProgressAndType: async (progressId: string, typeId: string) => {
      const result = await reportApi.summary.getAllWithProgressAndType(
        progressId,
        typeId
      )
      return result
    },
    editFile: async (progressId: string, typeId: string, file: File) => {
      const result = await reportApi.summary.editFile(progressId, typeId, file)
      return result
    },
    createNewSummary: async (body: RequestReportSummary) => {
      const result = await reportApi.summary.createNewSummary(body)
      return result
    },
    getAllSummary: async () => {
      const result = await reportApi.summary.getAllSummary()
      return result
    },
    getOneSummary: async (id: string) => {
      const result = await reportApi.summary.getOneSummary(id)
      return result
    },
    verfify: async (id: string) => {
      const result = await reportApi.summary.verfify(id)
      return result
    },
  }
  return {
    summary,
    types,
  }
}

export default useReportHook
