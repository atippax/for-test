import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  function logoutHandler() {
    logout()
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            onClick={() => {
              navigate('/')
            }}
          >
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 'bold' }}
            >
              SAHALIFE-R3S
            </Typography>
          </div>

          {user && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt={user.name} src="/user-avatar.png" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
