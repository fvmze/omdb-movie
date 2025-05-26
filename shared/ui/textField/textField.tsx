'use client'

import type * as React from 'react'
import { forwardRef, useId } from 'react'

import { cn } from '@/shared/utils/classnames/cn'
import { Icon, type IconProps } from '../icon'
import styles from './textField.module.css'

interface BaseProps {
  label?: string
  error?: string
  iconName?: IconProps['name']
  className?: string
  required?: boolean
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseProps & { as?: 'input' }

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  BaseProps & { as: 'textarea' }

export type TextFieldProps = InputProps | TextareaProps

function renderInput(
  id: string,
  inputClassName: string,
  ref: React.Ref<HTMLInputElement>,
  props: InputProps,
) {
  const { as, iconName, error, label, className, required, ...rest } = props
  return <input id={id} ref={ref} className={inputClassName} {...rest} />
}

function renderTextarea(
  id: string,
  inputClassName: string,
  ref: React.Ref<HTMLTextAreaElement>,
  props: TextareaProps,
) {
  const { as, iconName, error, label, className, required, ...rest } = props
  return <textarea id={id} ref={ref} className={inputClassName} {...rest} />
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (props, ref) => {
    const generatedId = useId()
    const id = props.id ?? generatedId

    const { label, error, iconName, className, required } = props

    const inputClassName = cn(styles.input, error && styles.error, iconName && styles.withIcon)

    const field =
      props.as === 'textarea'
        ? renderTextarea(id, inputClassName, ref as React.Ref<HTMLTextAreaElement>, props)
        : renderInput(id, inputClassName, ref as React.Ref<HTMLInputElement>, props)

    return (
      <div className={cn(styles.wrapper, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.fieldWrapper}>
          {iconName && <Icon name={iconName} className={styles.icon} />}
          {field}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
