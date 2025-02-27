import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { IconButton, styled, TextField } from '@mui/material'
import ExcelViewModal from '../components/ExcelViewModal'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useParams } from 'react-router-dom'
import useReportHook from '@/hooks/useReportHook'
import {
  ResponseOneReportSummary,
  ResponseReportSummaryWithProgress,
  TypeResponse,
} from '@/services/reportApi'
import { Fragment, useEffect, useState } from 'react'
import { STATUS, Statuses } from '@/constants'
import useToast from '@/hooks/usetoast'
import useUtils from '@/utils/utils'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

function ImportReportPage() {
  dayjs.extend(buddhistEra)
  dayjs.locale('th')
  const toast = useToast()
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const { id } = useParams()
  const [typeField, setTypeField] = useState<TypeResponse[]>([])
  const reportApi = useReportHook()
  const [dialogData, setDialogData] = useState<
    ResponseReportSummaryWithProgress[]
  >([])
  const utils = useUtils()
  const [summaryReport, setSummaryReport] =
    useState<ResponseOneReportSummary | null>(null)
  async function fetchData() {
    if (!id) return
    try {
      const result = await reportApi.summary.getOneSummary(id)
      setSummaryReport(() => result)
      const type = await reportApi.types.getAll()
      setTypeField(() => type)
    } catch (ex) {
      utils.errorLog(ex)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
  const [fileList, setFileList] = useState<Map<string, File>>(new Map())

  function handleFileUpload(id: string, files: FileList | null) {
    if (!files || files.length === 0) return

    setFileList(prev => {
      const newMap = new Map(prev)
      newMap.set(id, files[0])
      return newMap
    })
  }

  async function openProgress(id: string) {
    try {
      const result = await reportApi.summary.getAllWithProgressAndType(
        summaryReport!.id.toString(),
        id
      )
      setDialogData(result)
    } catch (ex) {
      utils.errorLog(ex)
    }
    setOpenImportDialog(true)
    // setSummaryReport(() => result)
  }
  async function handlerCheckFile() {
    try {
      await reportApi.summary.verfify(id!)
    } catch (ex) {
      utils.errorLog(ex)
    }
  }
  async function uploadFile() {
    toast.info('uploading . . . ')
    for (const fileObject of fileList) {
      try {
        const result = await reportApi.summary.editFile(
          summaryReport!.id.toString(),
          fileObject[0],
          fileObject[1]
        )
        console.log(result)
        toast.success('success')
      } catch (ex) {
        utils.errorLog(ex)
      }
    }

    await fetchData()
  }
  if (!summaryReport) {
    return 'loading . . . '
  }
  return (
    <>
      <div>
        <Box
          sx={{
            margin: '48px 48px 0px 48px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <h1>Saha Life Report Tool</h1>
              <Box>
                รอบรายงาน :{' '}
                {dayjs(
                  new Date(`${summaryReport?.month}-01-${summaryReport?.year}`)
                ).format('MMMM BBBB')}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px', height: '100%' }}>
            <Box
              sx={{
                width: '100%',
                border: '1px solid gray',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ height: '100%' }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto auto auto',
                    gap: 1,
                    alignItems: 'center',
                    padding: '30px',
                  }}
                >
                  {typeField.map((x, index) => {
                    const file = fileList.get(x.id.toString())
                    const field = summaryReport?.reportProgresses.find(
                      f =>
                        f.reportType.mappingTable.toLocaleLowerCase() ==
                        x.name.toLocaleLowerCase()
                    )
                    const statusField = Statuses.find(
                      f => f.value == field?.status
                    )
                    return (
                      <Fragment key={index}>
                        <Box sx={{ fontWeight: 'bold' }}>{x.name}</Box>
                        <span>
                          <TextField
                            variant="outlined"
                            size="small"
                            value={file?.name ?? field?.fileName}
                            disabled
                          />
                        </span>
                        <span>
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                          >
                            browse file
                            <VisuallyHiddenInput
                              type="file"
                              accept=".xlsx,.xls"
                              onChange={event =>
                                handleFileUpload(
                                  x.id.toString(),
                                  event.target.files
                                )
                              }
                              multiple
                            />
                          </Button>
                        </span>
                        <span>
                          <IconButton onClick={() => openProgress(`${x.id}`)}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                        </span>
                        <span>status</span>
                        <span>
                          <Box
                            sx={{
                              color: statusField?.color || '',
                              padding: '8px 24px',
                              width: 'fit-content',
                              border: '1px solid gray',
                            }}
                          >
                            {!statusField ? STATUS.NEW : statusField.title}
                          </Box>
                        </span>
                      </Fragment>
                    )
                  })}
                </Box>
              </Box>

              <Box
                sx={{
                  margin: '24px',
                  display: 'flex',
                  justifyContent: 'end',
                  flexDirection: 'row',
                  gap: '12px',
                }}
              >
                <Button
                  disabled={fileList.size <= 0}
                  variant="contained"
                  color="warning"
                  onClick={uploadFile}
                >
                  บันทึก
                </Button>
                <Button
                  disabled={summaryReport?.reportProgresses.some(
                    x => x.fileName == ''
                  )}
                  variant="contained"
                  color="success"
                  onClick={handlerCheckFile}
                >
                  ตรวจสอบ
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '12px',
                width: '100%',
                border: '1px solid gray',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h1>Report Summary</h1>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <span>รอบรายงาน</span>
                <span>
                  {dayjs(
                    new Date(
                      `${summaryReport?.month}-01-${summaryReport?.year}`
                    )
                  ).format('MMMM BBBB')}
                </span>
                <span>จำนวนรายงาน</span>
                <span>{summaryReport?.reportProgresses.length}</span>
                <span>รายงานนำเข้าสำเร็จ</span>
                <span>
                  {
                    summaryReport?.reportProgresses.filter(
                      x => x.status == STATUS.PASSED
                    ).length
                  }
                </span>
                <span>รายงานนำเข้าไม่สำเร็จ</span>
                <span>
                  {
                    summaryReport?.reportProgresses.filter(
                      x => x.status == STATUS.FAILED
                    ).length
                  }
                </span>
              </Box>
              <Box
                sx={{
                  borderRadius: '12px',
                  border: '1px solid gray',
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  minHeight: '200px',
                }}
              >
                <Box
                  sx={{
                    overflow: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '24px',
                  }}
                >
                  {summaryReport?.reportProgresses.map(x => (
                    <div>{x.errorMessage}</div>
                  ))}
                </Box>
              </Box>
              <Box sx={{ textAlign: 'end' }}>
                <div>
                  <Button
                    variant="contained"
                    disabled={summaryReport?.reportProgresses.every(
                      x => x.status == STATUS.PASSED
                    )}
                    color="success"
                  >
                    Export File
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <Box sx={{ textAlign: 'end', margin: '24px 48px' }}>
        <div>
          <Button variant="outlined" href="../">
            Back
          </Button>
        </div>
      </Box>
      <ExcelViewModal
        open={openImportDialog}
        data={dialogData}
        handleClose={() => {
          setOpenImportDialog(false)
        }}
        onSubmit={() => {
          setOpenImportDialog(false)
        }}
      ></ExcelViewModal>
    </>
  )
}

export default ImportReportPage
