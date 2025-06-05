import { useState, useEffect } from 'react'

export function useFetchData(fetchFunction, params = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!fetchFunction) return setLoading(false)
      try {
        setLoading(true)

        const result = await fetchFunction(...params)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err)
        console.error('Error:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchFunction, ...params])

  return { data, loading, error }
}
