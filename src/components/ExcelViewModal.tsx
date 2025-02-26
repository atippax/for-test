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
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
export default function ImportModal({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
  onSubmit: () => void
}) {
  function createData(
    order: number,
    month: string,
    importAt: string,
    status: string,
    isSee: boolean,
    remark: string
  ) {
    return { order, month, importAt, status, isSee, remark }
  }

  const rows = [
    createData(1, 'ธันวาคม 2567', '10/01/2568', 'กำลังจัดส่ง', true, ''),
    createData(2, 'พฤศจิกายน 2567', '10/01/2568', 'กำลังจัดส่ง', true, ''),
    createData(3, 'ตุลาคม 2567', '10/01/2568', 'กำลังจัดส่ง', true, ''),
    createData(4, 'กันยายน 2567', '10/01/2568', 'กำลังจัดส่ง', true, ''),
    createData(5, 'สิงหาคม 2567', '10/01/2568', 'กำลังจัดส่ง', true, ''),
  ]
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            height: '100%',
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
            <span>PASS</span>
            <span>รอบรายงาน</span>
            <span>ธันวาคม 2567</span>
          </Box>
          <Box
            sx={{
              height: '100%',
              position: 'relative',
              backgroundColor: 'red',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '0px',
                right: '0',
                translate: '-50% -50%',
              }}
            >
              <IconButton onClick={handleClose} color="error">
                <CloseIcon></CloseIcon>
              </IconButton>
            </Box>
            <Box>Last Update 15/01/2025</Box>
          </Box>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ลำดับที่</TableCell>
                  <TableCell align="right">รอบเดือน</TableCell>
                  <TableCell align="right">วันที่นำเข้า</TableCell>
                  <TableCell align="right">สถานะ</TableCell>
                  <TableCell align="right">ดู </TableCell>
                  <TableCell align="right">หมายเหตุ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.order}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell align="right">{row.month}</TableCell>
                    <TableCell align="right">{row.importAt}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">
                      <IconButton href="/import-report">
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
      </Box>
    </Modal>
  )
}
