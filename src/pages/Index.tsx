import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ImportModal from '../components/ImportModal'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
import useReportHook from '@/hooks/useReportHook'
import { ResponseReportSummary } from '@/services/reportApi'
import useToast from '@/hooks/usetoast'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { Types } from '@/constants'
import { TextField } from '@mui/material'
import useUtils from '@/utils/utils'
interface ResponseReportSummaryExtension extends ResponseReportSummary {
  isEdit: boolean
}
function IndexPage() {
  dayjs.extend(buddhistEra)
  dayjs.locale('th')
  let navigate = useNavigate()
  const reportApi = useReportHook()
  const toast = useToast()
  const util = useUtils()

  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [dataSummary, setDataSummary] = useState<
    ResponseReportSummaryExtension[]
  >([])
  async function submitCreateNewReport(month: number, year: number) {
    try {
      setOpenImportDialog(false)
      const result = await reportApi.summary.createNewSummary({ month, year })
      toast.success('สร้างรายงานใหม่สำเร็จ')
      navigate(`/import-report/${result.id}`)
    } catch (ex) {
      util.errorLog(ex)
    }
  }
  async function updateRemark({
    itemId,
    remark,
  }: {
    itemId: number
    remark: string
  }) {
    try {
      const result = await reportApi.summary.editSummary({ id: itemId, remark })
      setDataSummary(prev =>
        prev.map(item =>
          item.id === itemId ? { ...result, isEdit: false } : item
        )
      )
      toast.success('แก้ไขหมายเหตุสำเร็จ')
    } catch (ex) {
      util.errorLog(ex)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await reportApi.summary.getAllSummary()
        setDataSummary(() => result.map(x => ({ ...x, isEdit: false })))
      } catch (ex) {
        util.errorLog(ex)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <Box
        sx={{
          margin: '48px 48px 0px 48px',
          display: 'flex',
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
          <h1>รายการสำหรับนำเข้าระบบ TFTS 17</h1>
        </Box>
        <Box sx={{ textAlign: 'end', display: 'flex', gap: '12px' }}>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                setOpenImportDialog(true)
              }}
            >
              Import
            </Button>
          </div>
        </Box>
      </Box>

      <Box sx={{ margin: '48px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ลำดับที่</TableCell>
                <TableCell align="right">รอบเดือน</TableCell>
                <TableCell align="right">วันที่เเก้ไขล่าสุด</TableCell>
                <TableCell align="right">สถานะ</TableCell>
                <TableCell align="right">ดู</TableCell>
                <TableCell align="right">หมายเหตุ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSummary?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(new Date(`${row?.month}-01-${row?.year}`)).format(
                      'MMMM BBBB'
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(new Date(row.updatedAt)).format('DD/MM/BBBB')}
                  </TableCell>
                  <TableCell align="right">
                    {Types.find(x => x.value == row.status)?.text}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton href={`/import-report/${row.id}`}>
                      <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        justifyContent: 'end',
                      }}
                    >
                      {row.isEdit ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.remark}
                          onChange={e =>
                            setDataSummary(prev =>
                              prev.map(item =>
                                item.id === row.id
                                  ? { ...item, remark: e.target.value }
                                  : item
                              )
                            )
                          }
                        ></TextField>
                      ) : (
                        <Box>{row.remark}</Box>
                      )}
                      {row.isEdit ? (
                        <Button
                          size="small"
                          color="info"
                          variant="contained"
                          onClick={() =>
                            updateRemark({ itemId: row.id, remark: row.remark })
                          }
                        >
                          บันทึก
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          onClick={() =>
                            setDataSummary(prev =>
                              prev.map(item =>
                                item.id === row.id
                                  ? { ...item, isEdit: true }
                                  : item
                              )
                            )
                          }
                        >
                          แก้ไข
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ImportModal
        open={openImportDialog}
        handleClose={() => {
          setOpenImportDialog(false)
        }}
        onSubmit={submitCreateNewReport}
      ></ImportModal>
    </>
  )
}

export default IndexPage
