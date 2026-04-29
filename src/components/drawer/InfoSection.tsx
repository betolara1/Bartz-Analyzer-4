import React from "react";
import { Clock, Folder, RotateCcw } from "lucide-react";
import { Row } from "../../types";

interface InfoSectionProps {
  data: Row | null;
  onReprocess: () => void;
  onOpenFolder: () => void;
}

export function InfoSection({ data, onReprocess, onOpenFolder }: InfoSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1 bg-[#1B1B1B] p-3 rounded-xl border border-[#232323] hover:border-[#333] transition-colors">
        <div className="text-[10px] uppercase font-bold text-[#A7A7A7] tracking-widest flex items-center gap-1.5">
          <Clock className="h-3 w-3" /> Data do Processamento
        </div>
        <div className="text-sm font-medium text-white">{data?.timestamp || "--/--/---- --:--"}</div>
      </div>
      
      <div className="space-y-1 bg-[#1B1B1B] p-3 rounded-xl border border-[#232323] hover:border-[#333] transition-colors">
        <div className="text-[10px] uppercase font-bold text-[#A7A7A7] tracking-widest">Ações Rápidas</div>
        <div className="flex gap-2">
          <button 
            onClick={onReprocess}
            className="flex-1 bg-[#232323] hover:bg-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-lg border border-white/5 flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="h-3 w-3" /> Reavaliar
          </button>
          <button 
            onClick={onOpenFolder}
            className="flex-1 bg-[#232323] hover:bg-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-lg border border-white/5 flex items-center justify-center gap-1.5 transition-all"
          >
            <Folder className="h-3 w-3" /> Pasta
          </button>
        </div>
      </div>

      <div className="sm:col-span-2 space-y-1 bg-[#1B1B1B] p-3 rounded-xl border border-[#232323] hover:border-[#333] transition-colors overflow-hidden">
        <div className="text-[10px] uppercase font-bold text-[#A7A7A7] tracking-widest">Caminho do Arquivo</div>
        <div className="text-[10px] font-mono text-zinc-500 break-all select-all leading-relaxed bg-[#111] p-2 rounded-lg border border-white/5">
          {data?.fullpath || "Caminho não disponível"}
        </div>
      </div>
    </div>
  );
}
