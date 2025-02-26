import { Box, Modal, Typography } from '@mui/material'

export default function ExcelViewModal({
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
      onClose={handleClose}
      onSubmit={onSubmit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}
