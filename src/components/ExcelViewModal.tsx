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
export default function ImportModal({
  open,
  handleClose,
  data,
}: {
  open: boolean
  data: ResponseReportSummaryWithProgress[]
  handleClose: () => void
  onSubmit: () => void
}) {
  if (!data || data.length == 0) {
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
            <span>RD_POLICY</span>
            <span>Report Status</span>
            <span>Pass</span>
            <span>รอบรายงาน</span>
            <span>ธันวาคม 2567</span>
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
            <Box>Last Update 15/01/2025</Box>
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
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map(x => (
                    <TableCell align="right">{x}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
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
