import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ImportCoaSettingModal from '../components/ImportCoaSettingModal'
function createData(order: number, coaNumber: number, description: string) {
  return { order, coaNumber, description }
}

const rows = [
  createData(1, 1, 'ธันวาคม 2567'),
  createData(2, 1, 'พฤศจิกายน 2567'),
  createData(3, 1, 'ตุลาคม 2567'),
  createData(4, 1, 'กันยายน 2567'),
  createData(5, 1, 'สิงหาคม 2567'),
]
function CoaSetting() {
  const [openImportDialog, setOpenImportDialog] = React.useState(false)
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
          <div>ตั้งค่า COA สำหรับตรวจสอบ</div>
        </Box>
        <Box sx={{ textAlign: 'end', display: 'flex', gap: '12px' }}>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                setOpenImportDialog(true)
              }}
            >
              เพิ่ม
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
                <TableCell align="right">COA Number</TableCell>
                <TableCell align="right">รายละเอียด</TableCell>
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
                  <TableCell align="right">{row.coaNumber}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ textAlign: 'end', width: '100%' }}>
        <Button href="../">Back</Button>
      </Box>
      <ImportCoaSettingModal
        open={openImportDialog}
        handleClose={() => {
          setOpenImportDialog(false)
        }}
        onSubmit={() => {
          setOpenImportDialog(false)
        }}
      ></ImportCoaSettingModal>
    </>
  )
}

export default CoaSetting
