import React from "react";
import { Trash2, CheckCircle2, ChevronDown, AlertTriangle } from "lucide-react";
import { Row } from "../../types";

interface SemFilhoSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  data: Row | null;
  onMoveToOk: () => void;
}

export function SemFilhoSection({ isOpen, onToggle, data, onMoveToOk }: SemFilhoSectionProps) {
  const hasError = data?.tags?.includes('sem_filho');

  if (!hasError) return null;

  return (
    <section className="rounded-xl border border-rose-500/20 bg-[#1B1B1B] overflow-hidden shadow-sm transition-all duration-300 hover:border-rose-500/40">
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Itens sem Componentes</h3>
            <p className="text-[10px] text-[#A7A7A7] font-medium uppercase tracking-widest">Verificação de itens vazios (Preço 0.01)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse" />
          <div className={`p-2 rounded-full bg-[#111] border border-[#232323] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="h-4 w-4 text-[#666]" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 space-y-4">
          <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/10 text-xs text-rose-200/70 leading-relaxed">
            Este arquivo contém itens que possuem preço <span className="text-rose-400 font-bold">0.01</span> mas não possuem componentes internos (filhos). 
            Isso geralmente ocorre em componentes lineares ou acessórios que não foram gerados corretamente.
          </div>

          {(data?.meta?.semFilhoItems || []).length > 0 && (
            <div className="space-y-2">
              <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest px-1">Itens Identificados:</p>
              <div className="rounded-lg border border-[#232323] bg-[#111] overflow-hidden">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#1B1B1B] text-[#666] border-b border-[#232323]">
                    <tr>
                      <th className="text-left px-3 py-2 uppercase font-bold tracking-widest text-[8px]">Referência</th>
                      <th className="text-left px-3 py-2 uppercase font-bold tracking-widest text-[8px]">ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#232323]">
                    {(data?.meta?.semFilhoItems as any[]).map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-3 py-2 text-rose-400 font-mono">{item.referencia}</td>
                        <td className="px-3 py-2 text-white/60 font-mono text-[10px]">{item.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveToOk();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all group active:scale-95"
            >
              <CheckCircle2 className="h-4 w-4" />
              <div className="text-left">
                <div className="text-[11px] font-bold uppercase tracking-tight">Ignorar e Mover</div>
                <div className="text-[9px] opacity-60">Mandar para pasta OK</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
