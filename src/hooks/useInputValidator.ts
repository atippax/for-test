export interface FieldValidator {
  isValid: boolean
  message: string
}
export function useInputValidator() {
  const validateUsername = (username: string): FieldValidator => {
    const usernameRegex = /^[a-z0-9]{5,}$/
    if (!usernameRegex.test(username)) {
      return {
        isValid: false,
        message:
          'Username ต้องเป็นตัวพิมพ์เล็กและตัวเลข และต้องมีมากกว่า 6 ตัวอักษร',
      }
    }
    return { isValid: true, message: '' }
  }

  const validatePassword = (password: string): FieldValidator => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message:
          'Password ต้องมีตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข, สัญลักษณ์ และมากกว่า 8 ตัวอักษร',
      }
    }
    return { isValid: true, message: '' }
  }

  return { validateUsername, validatePassword }
}
