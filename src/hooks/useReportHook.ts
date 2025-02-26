import useReport, { RequestReportSummary } from '@/services/reportApi'

const useReportHook = () => {
  const reportApi = useReport()
  const types = {
    async getAll() {
      const result = await reportApi.types.getAll()
      return result
    },
  }
  const progress = {
    getAllWithProgressAndType: async (progressId: string, typeId: string) => {
      const result = await reportApi.progress.getAllWithProgressAndType(
        progressId,
        typeId
      )
      return result
    },
    editFile: async (progressId: string, typeId: string, file: File) => {
      const result = await reportApi.progress.editFile(progressId, typeId, file)
      return result
    },
  }
  const summary = {
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
    progress,
    summary,
    types,
  }
}

export default useReportHook
