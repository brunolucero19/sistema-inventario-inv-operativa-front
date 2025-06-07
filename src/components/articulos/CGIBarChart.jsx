'use client'

import { BarChart } from '@mui/x-charts/BarChart'

const CGIBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>
  }

  const labels = data.map((item) => item.proveedor.nombre)
  const values = data.map((item) => item.cgi)
//color: '#1976d2',
  return (
    <div style={{ width: '100%', maxWidth: 600 }}>
      <BarChart
        xAxis={[
            {
            id: 'proveedores',
            data: labels,
            scaleType: 'band',
            label: 'Proveedor',
            },
        ]}
        series={[
            {
            data: values,
            label: 'CGI',
            color: '#1976d2',
            },
        ]}
        height={300}
        sx={{
            backgroundColor: '#121212',
            borderRadius: 2,
            padding: 2,
            '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
            fill: '#ffffff', // texto ticks
            },
            '& .MuiChartsAxis-tick': {
            color: '#ffffff',
            },
            '& .MuiChartsAxis-root .MuiChartsAxis-label': {
            fill: '#ffffff', // texto label eje
            },
            '& .MuiChartsAxis-root .MuiChartsAxis-line': {
            stroke: '#ffffff', // líneas de los ejes
            },
            '& .MuiChartsGrid-line': {
            stroke: '#ffffff',
            
            },
            '& .MuiChartsLegend-root': {
            color: '#ffffff',
            },
        }}
        />
    </div>
  )
}

export default CGIBarChart