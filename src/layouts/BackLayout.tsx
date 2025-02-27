import { Box, Button } from '@mui/material'
import { ReactNode } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
type Props = {
  children: ReactNode
}
const ProtectedRoute = ({ children }: Props) => {
  return (
    <Box
      sx={{
        margin: '24px 48px',
        justifyContent: 'start',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Button sx={{ display: 'flex', gap: '12px' }} href="../">
        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        <div>ย้อนกลับ</div>
      </Button>
      <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>
    </Box>
  )
}

export default ProtectedRoute
