import { container } from '@/infra/di/container'
import { QueryClient } from '@tanstack/react-query'

export const getQueryClient = (): QueryClient => {
  return container.resolve(QueryClient)
}
