import { courts } from '../data/courts'

export function useCourts() {
  return { courts, loading: false, error: null }
}
