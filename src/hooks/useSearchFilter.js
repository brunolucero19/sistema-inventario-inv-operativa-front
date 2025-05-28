import { useState, useMemo } from 'react'

export const useSearchFilter = (items, key) => {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!query) return items
    return items.filter(item =>
      item[key].toLowerCase().includes(query.toLowerCase())
    )
  }, [items, query, key])

  return { query, setQuery, filteredItems }
}