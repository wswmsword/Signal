import { useEffect, useState } from 'react'

export default function useMedia(queries, values, defaultValue) {
  const match = () => {
    const matchedVal = values[queries.findIndex(q => matchMedia(q).matches)]
    return matchedVal == null ? defaultValue : matchedVal
  }
  const [value, set] = useState(match)
  useEffect(() => {
    const handler = () => set(match)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return value
}
