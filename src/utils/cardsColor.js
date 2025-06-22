import { estadosOC } from './constants'

export const getCardColor = (estadoId) => {
  if (estadoId === estadosOC.pendiente) {
    return 'bg-white'
  } else if (estadoId === estadosOC.cancelada) {
    return 'bg-red-200'
  } else if (estadoId === estadosOC.enviada) {
    return 'bg-yellow-200'
  } else if (estadoId === estadosOC.finalizada) {
    return 'bg-green-200'
  } else {
    return 'bg-gray-100' // Default case
  }
}
