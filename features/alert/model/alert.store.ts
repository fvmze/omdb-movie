import { createSliceStore } from '@/shared/lib/zustand/createSlice'
import { useRef, useSyncExternalStore } from 'react'
import type { StoreApi } from 'zustand'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface Alert {
  id: string
  type: AlertType
  message: string
  autoClose?: boolean
  duration?: number
}

export interface AlertState {
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'id'>) => void
  removeAlert: (id: string) => void
  clearAlerts: () => void
}

let nextAutoCloseAt = Date.now()

export const alertStore: StoreApi<AlertState> = createSliceStore<AlertState>((set, get) => ({
  alerts: [],
  addAlert: (alert) => {
    const id = crypto.randomUUID()
    const duration = alert.duration ?? 5000
    const now = Date.now()
    const delayUntil = Math.max(nextAutoCloseAt, now)
    nextAutoCloseAt = delayUntil + duration

    set((state) => ({
      alerts: [...state.alerts, { ...alert, id }],
    }))

    if (alert.autoClose) {
      const timeout = nextAutoCloseAt - now
      setTimeout(() => {
        get().removeAlert(id)
      }, timeout)
    }
  },
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    }))
  },
  clearAlerts: () => set({ alerts: [] }),
}))

export const useAlertStore = <T>(selector: (state: AlertState) => T): T => {
  const selectorRef = useRef(selector)
  selectorRef.current = selector

  return useSyncExternalStore(
    alertStore.subscribe,
    () => selectorRef.current(alertStore.getState()),
    () => selectorRef.current(alertStore.getState()),
  )
}
