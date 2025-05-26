import type { IconProps } from '../icon'

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  error?: string
  iconName?: IconProps['name']
  as?: 'input' | 'textarea'
}
