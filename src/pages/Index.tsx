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

function IndexPage() {
  dayjs.extend(buddhistEra)
  dayjs.locale('th')
  let navigate = useNavigate()
  const reportApi = useReportHook()
  const toast = useToast()
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [dataSummary, setDataSummary] = useState<ResponseReportSummary[]>([])
  async function submitCreateNewReport(month: number, year: number) {
    setOpenImportDialog(false)
    const result = await reportApi.summary.createNewSummary({ month, year })
    navigate(`/import-report/${result.id}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await reportApi.summary.getAllSummary()
        setDataSummary(() => result)
      } catch (ex) {
        toast.error((ex as any).message)
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
                <TableCell align="right">วันที่นำเข้า</TableCell>
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
                    {dayjs(new Date(row.createdAt)).format('DD MMMM BBBB')}
                  </TableCell>
                  <TableCell align="right">
                    {Types.find(x => x.value == row.status)?.text}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton href={`/import-report/${row.id}`}>
                      <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{row.remark}</TableCell>
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
