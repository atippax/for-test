import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import useAuthHook from '@/hooks/useAuthHook'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValidator, useInputValidator } from '@/hooks/useInputValidator'
import useUtils from '@/utils/utils'
import { useAuth } from '@/contexts/authContext'
function LoginPage() {
  const { login } = useAuthHook()
  const { user } = useAuth()
  const navigate = useNavigate()
  if (user) {
    window.location.replace('/')
    return
  }
  const util = useUtils()
  const { validatePassword, validateUsername } = useInputValidator()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setValidatePassword] = useState<FieldValidator>({
    isValid: true,
    message: '',
  })
  const [usernameError, setValidateUsername] = useState<FieldValidator>({
    isValid: true,
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      await login(username, password)
      navigate('/')
    } catch (ex) {
      util.errorLog(ex)
    }
  }
  useEffect(() => {
    if (password == '' || password == null) return
    setValidatePassword(_ => validatePassword(password))
  }, [password])
  useEffect(() => {
    if (username == '' || username == null) return
    setValidateUsername(_ => validateUsername(username))
  }, [username])
  return (
    <>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ margin: 'auto', width: '500px' }}>
          <Box sx={{ textAlign: 'center' }}>ลงชื่อเข้าใช้งาน</Box>
          <Card
            sx={{
              padding: '24px',
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '12px',
                width: '100%',
              }}
            >
              <span style={{ marginTop: '12px' }}>Username</span>
              <TextField
                helperText={usernameError.message}
                variant="outlined"
                sx={{
                  width: '100%',
                }}
                error={!usernameError.isValid}
                size="small"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '12px', width: '100%' }}>
              <span style={{ marginTop: '12px' }}>Password</span>
              <TextField
                helperText={passwordError.message}
                sx={{
                  width: '100%',
                }}
                variant="outlined"
                error={!passwordError.isValid}
                size="small"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: '12px' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={
                  username == '' ||
                  password == '' ||
                  !usernameError.isValid ||
                  !passwordError.isValid
                }
              >
                Login
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage
