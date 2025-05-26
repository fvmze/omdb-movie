import type { StateCreator } from 'zustand'
import { asyncSlice } from 'zustand-async-slice'

type GetSetApi<State> = {
  get: Parameters<StateCreator<State>>[1]
  set: Parameters<StateCreator<State>>[0]
}

export function createNamedAsyncSlice<State extends object>() {
  return {
    withoutParams<Name extends string, Data>(config: {
      name: Name
      asyncFn: (api: GetSetApi<State>) => Promise<Data> | Data
    }) {
      return asyncSlice<State>()<Name, Data>(config)
    },

    withParams<Name extends string, Data, Params>(config: {
      name: Name
      asyncFn: (params: Params, api: GetSetApi<State>) => Promise<Data> | Data
    }) {
      return asyncSlice<State, Params>()<Name, Data>(config)
    },
  }
}
