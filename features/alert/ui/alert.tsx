'use client'

import { Button } from '@/shared/ui/button'
import { Icon, type iconRegistry } from '@/shared/ui/icon'
import { cn } from '@/shared/utils/classnames/cn'
import { useAlertStore } from '@features/alert'
import type { AlertType as AlertKind, Alert as AlertType } from '../model/alert.store'
import styles from './alert.module.css'

interface AlertItemProps {
  alert: AlertType
  onCloseAction: (id: string) => void
}

const alertIconMap: Record<AlertKind, keyof typeof iconRegistry> = {
  success: 'check',
  error: 'alertTriangle',
  warning: 'alertTriangle',
  info: 'circleQuestion',
}

export const AlertItem = ({ alert, onCloseAction }: AlertItemProps) => (
  <div role='alert' className={cn(styles.alert, styles[alert.type])}>
    <Icon name={alertIconMap[alert.type]} className={styles.icon} aria-hidden />
    <p className={styles.message}>{alert.message}</p>
    <Button
      iconName='x'
      iconSize={14}
      aria-label='Close alert'
      onClick={() => onCloseAction(alert.id)}
      className={styles.closeBtn}
    />
  </div>
)

export const AlertList = () => {
  const alerts = useAlertStore((state) => state.alerts)
  const removeAlert = useAlertStore((state) => state.removeAlert)

  if (alerts.length === 0) return null

  return (
    <div className={styles.alertList} aria-live='assertive' aria-atomic='true'>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onCloseAction={removeAlert} />
      ))}
    </div>
  )
}
