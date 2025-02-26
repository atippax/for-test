import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
export default function ImportModal({
  open,
  handleClose,
  onSubmit,
}: {
  open: boolean
  handleClose: () => void
  onSubmit: () => void
}) {
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
          width: 280,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            เพิ่มหัวข้อการตรวจสอบ COA
          </Typography>
          <IconButton onClick={handleClose}>
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
          <span>COA Number</span>
          <span>
            <TextField variant="outlined" size="small" />
          </span>
          <span>รายละเอียด</span>
          <span>
            <TextField variant="outlined" size="small" />
          </span>
        </Box>
        <Box sx={{ textAlign: 'end' }}>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          <Button onClick={onSubmit}>add</Button>
        </Box>
      </Box>
    </Modal>
  )
}
