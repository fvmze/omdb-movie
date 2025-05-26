'use client'

import { cn } from '@/shared/utils/classnames/cn'
import { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'

interface ModalProps {
  open: boolean
  onCloseAction: () => void
  children: ReactNode
  className?: string
}

export const Modal = ({ open, onCloseAction, children, className }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useDialogLifecycle(open, dialogRef)
  useEscapeKey(onCloseAction)

  if (typeof window === 'undefined') return null

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal='true'
      className={cn(styles.modal, className)}
      onClick={onCloseAction}
      onKeyDown={(e) => handleKeyboardClick(e, onCloseAction)}
    >
      <ModalContent onClose={onCloseAction}>{children}</ModalContent>
    </dialog>,
    document.body,
  )
}

function useDialogLifecycle(open: boolean, ref: React.RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open, ref])
}

function useEscapeKey(callback: () => void) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback()
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [callback])
}

function handleKeyboardClick(e: React.KeyboardEvent<HTMLElement>, callback: () => void) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    callback()
  }
}

function ModalContent({
  onClose,
  children,
}: {
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      role='document'
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type='button'
        onClick={onClose}
        onKeyDown={(e) => handleKeyboardClick(e, onClose)}
        className={styles.closeButton}
        aria-label='Закрыть'
      >
        &times;
      </button>
      {children}
    </div>
  )
}
