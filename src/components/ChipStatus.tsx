import { cn } from "./ui/utils"
import { Status } from "../types"

interface ChipStatusProps {
  variant?: Status
  status?: Status // Alias for backward compatibility
  className?: string
}

export function ChipStatus({ variant, status, className }: ChipStatusProps) {
  const v = variant || status || "-" as Status
  
  const getStatusStyles = (v: Status) => {
    switch (v) {
      case 'OK':
        return 'bg-[#27AE60] text-white'
      case 'ERRO':
        return 'bg-[#E74C3C] text-white'
      case 'FERRAGENS':
      case 'FERRAGENS-ONLY':
        return 'bg-[#F39C12] text-white'
      default:
        return 'bg-[#3498DB] text-white'
    }
  }

  const getStatusText = (v: Status) => {
    if (v === 'FERRAGENS') return 'FERRAGENS-ONLY'
    if (v === ("-" as Status)) return "-"
    return v
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider whitespace-nowrap",
        getStatusStyles(v),
        className
      )}
    >
      {getStatusText(v)}
    </span>
  )
}

// Componentes específicos para Figma / Compatibilidade
export const ChipStatusOK = () => <ChipStatus variant="OK" />
export const ChipStatusERRO = () => <ChipStatus variant="ERRO" />
export const ChipStatusFERRAGENS = () => <ChipStatus variant="FERRAGENS" />
