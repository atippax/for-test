import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

export default function ImportModal({
  open,
  handleClose,
  onSubmit,
}: {
  open: boolean
  handleClose: () => void
  onSubmit: (month: number, year: number) => void
}) {
  const [yearSelect, setYearSelect] = useState<Dayjs | null>(null)
  const [monthSelect, setMonthSelect] = useState<Dayjs | null>(null)

  const [monthList, setMonthList] = useState<number[]>([])
  function monthCondition(year: number) {
    const now = new Date()
    return Array.from({ length: 12 }, (_, i) => i).filter(
      x => year < now.getFullYear() || x < now.getMonth() + 1
    )
  }

  function handlerYearChange(e: dayjs.Dayjs | null) {
    if (!e) return
    const month = monthCondition(+e.get('year'))
    setMonthSelect(null)
    setYearSelect(e)
    setMonthList(month)
  }
  function importHandler() {
    onSubmit(+(yearSelect?.get('M') || 0) + 1, +(yearSelect?.get('year') || 0))
    setYearSelect(null)
    setMonthSelect(null)
  }
  function closeHandler() {
    handleClose()
    setYearSelect(null)
    setMonthSelect(null)
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            กรุณาเลือกรอบวันที่รายงาน
          </Typography>
          <IconButton onClick={closeHandler}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <span>ปี(พ.ศ.)</span>
          <span>
            <MobileDatePicker
              value={yearSelect}
              onChange={e => {
                handlerYearChange(e)
              }}
              sx={{ width: '100%' }}
              views={['year']}
              maxDate={dayjs()}
              slotProps={{ textField: { id: 'date' } }}
            />
          </span>
          <span>เดือน</span>
          <span>
            <MobileDatePicker
              value={monthSelect}
              onChange={e => {
                setMonthSelect(e)
              }}
              disabled={!yearSelect}
              sx={{ width: '100%' }}
              views={['month']}
              maxDate={
                yearSelect
                  ? dayjs(yearSelect).month(monthList[monthList.length - 1])
                  : undefined
              }
              slotProps={{ textField: { id: 'date' } }}
            />
          </span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            justifyContent: 'end',
          }}
        >
          <Button
            onClick={importHandler}
            variant="contained"
            disabled={!yearSelect || !monthSelect}
          >
            Import
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
