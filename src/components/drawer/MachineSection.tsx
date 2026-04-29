import React from "react";
import { Grid3X3, Zap, CheckCircle, XCircle } from "lucide-react";
import { Row } from "../../types";

interface MachineSectionProps {
  data: Row | null;
}

export function MachineSection({ data }: MachineSectionProps) {
  const machines = data?.meta?.machines || [];

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Grid3X3 className="h-4 w-4 text-zinc-500" />
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Maquinário / Plugins (Gerados)</h4>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {["2530", "2534", "2341", "2525"].map(id => {
          const m = machines.find(m => m.id === id);
          return (
            <div 
              key={id} 
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                m ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-[#1B1B1B] border-[#2C2C2C] text-[#444]'
              }`}
            >
              {m ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3 opacity-30" />}
              <span className="text-[11px] font-bold font-mono">{id}</span>
            </div>
          );
        })}
      </div>

      {machines.length > 0 && (
        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-2.5">
          <Zap className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-[10px] text-blue-200/60 leading-tight">
            Estes IDs representam os plugins de máquinas que processaram este XML com sucesso.
          </div>
        </div>
      )}
    </section>
  );
}
