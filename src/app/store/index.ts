import { proxy } from 'valtio'

export const state = proxy({
  searchValue: '',
  page: 1,
})
