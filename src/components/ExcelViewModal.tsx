import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { ResponseReportSummaryWithProgress } from '@/services/reportApi'
import useToast from '@/hooks/usetoast'
import { Statuses } from '@/constants'
import dayjs from 'dayjs'
export default function ImportModal({
  open,
  handleClose,
  data,
}: {
  open: boolean
  data: ResponseReportSummaryWithProgress | null
  handleClose: () => void
  onSubmit: () => void
}) {
  const toast = useToast()
  if (!data) {
    if (open) toast.error('ไม่มีข้อมูล')
    return ''
  }
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1400,
          height: '800px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <span>Report Name</span>
            <span>{data.reportType.name}</span>
            <span>Report Status</span>
            <span>{Statuses.find(x => x.value == data.status)?.title}</span>
            <span>รอบรายงาน</span>
            <span>
              {dayjs(new Date(`${data.month}-01-${data.year}`)).format(
                'MMMM BBBB'
              )}
            </span>
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'space-between',
              justifyItems: 'space-between',
            }}
          >
            <Box sx={{ textAlign: 'end' }}>
              <IconButton onClick={handleClose} color="error">
                <CloseIcon></CloseIcon>
              </IconButton>
            </Box>
            <Box>
              Last Update {dayjs(new Date(data.updatedAt)).format('DD/MM/BBBB')}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Table
              stickyHeader
              sx={{ width: '100%' }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {data.headers.map(x => (
                    <TableCell align="right">{x}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.values(row).map(x => (
                      <TableCell align="right">{x}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  )
}
