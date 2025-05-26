import { type AlertType, useAlertStore } from './model/alert.store'

export const useAlert = () => {
  const addAlert = useAlertStore((state) => state.addAlert)

  const showAlert = (
    message: string,
    type: AlertType = 'info',
    autoClose = true,
    duration = 3000,
  ) => {
    addAlert({ message, type, autoClose, duration })
  }

  return { showAlert }
}
