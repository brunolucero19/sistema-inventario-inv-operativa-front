import { useState, useEffect } from 'react'

export function useFetchData(fetchFunction) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err)
        console.error('Error:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchFunction])

  return { data, loading, error }
}