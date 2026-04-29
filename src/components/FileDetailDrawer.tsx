import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "./ui/sheet";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { 
  X, 
  FileText,
  Package,
} from "lucide-react";

import { ChipStatus } from "./ChipStatus";
import { Row } from "../types";
import { useFileActions } from "../hooks/useFileActions";

// Sub-components
import { InfoSection } from "./drawer/InfoSection";
import { ErrorWarningSection } from "./drawer/ErrorWarningSection";
import { MachineSection } from "./drawer/MachineSection";
import { ImportKeySection } from "./drawer/ImportKeySection";
import { OrderInfoSection } from "./drawer/OrderInfoSection";
import { SpecialItemsSection } from "./drawer/SpecialItemsSection";
import { MuxarabiSection } from "./drawer/MuxarabiSection";
import { Es08Section } from "./drawer/Es08Section";
import { ErpSearchSection } from "./drawer/ErpSearchSection";
import { CoringaSection } from "./drawer/CoringaSection";
import { PendingRefSection } from "./drawer/PendingRefSection";

interface FileDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Row | null;
  onAction?: (path: string, action: string) => void;
  onFileMoved?: (oldPath: string, newPath: string) => void;
}

function FileDetailDrawer({ open, onOpenChange, data, onAction, onFileMoved }: FileDetailDrawerProps) {
  const actions = useFileActions(data, onAction, onFileMoved);

  if (!data && open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl bg-[#0D0D0D] border-l border-[#232323] p-0 overflow-hidden flex flex-col shadow-2xl">
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent shrink-0">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#A7A7A7] shadow-inner">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <SheetTitle className="text-xl font-bold text-white tracking-tight leading-none">
                    {data?.filename || "Detalhes do Arquivo"}
                  </SheetTitle>
                  <SheetDescription className="text-[10px] text-[#666] font-bold uppercase tracking-[0.2em]">
                    Análise técnica profunda do componente
                  </SheetDescription>
                </div>
              </div>
              <button 
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 bg-black/20 p-2 rounded-2xl border border-white/5 w-fit">
              <ChipStatus status={data?.status || 'ERRO'} />
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 px-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ID: {data?.id || '—'}</span>
              </div>
            </div>
          </SheetHeader>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8 pb-20">
            
            <InfoSection 
              data={data} 
              onReprocess={actions.handleReprocess} 
              onOpenFolder={actions.handleOpenFolder} 
            />

            <ErrorWarningSection data={data} />

            <MachineSection data={data} />

            <ImportKeySection data={data} />

            <OrderInfoSection 
              isOpen={actions.orderInfoOpen}
              onToggle={() => {
                const next = !actions.orderInfoOpen;
                actions.setOrderInfoOpen(next);
                if (next && actions.orderComments.length === 0) actions.fetchOrderComments();
              }}
              loading={actions.loadingComments}
              comments={actions.orderComments}
              onFetch={actions.fetchOrderComments}
            />

            <SpecialItemsSection 
              isOpen={actions.specialItemsOpen}
              onToggle={() => actions.setSpecialItemsOpen(!actions.specialItemsOpen)}
              data={data}
            />

            <MuxarabiSection 
              isOpen={actions.muxarabiOpen}
              onToggle={() => actions.setMuxarabiOpen(!actions.muxarabiOpen)}
              data={data}
            />

            <Es08Section 
              isOpen={actions.es08Open}
              onToggle={() => actions.setEs08Open(!actions.es08Open)}
              data={data}
              uniqueDrawings={actions.uniqueDrawings}
              dxfSearching={actions.dxfSearching}
              dxfResults={actions.dxfResults}
              dxfFixing={actions.dxfFixing}
              onSearchAll={actions.searchAllDrawings}
              onFix={actions.fixFresa37to18}
              onMoveToOk={actions.handleMoveToOk}
              onOpenConfirmMove={() => actions.setConfirmMoveOpen(true)}
            />

            <ErpSearchSection 
              isOpen={actions.erpSearchOpen}
              onToggle={() => actions.setErpSearchOpen(!actions.erpSearchOpen)}
              data={data}
              erpSearchCode={actions.erpSearchCode}
              setErpSearchCode={actions.setErpSearchCode}
              erpSearchDesc={actions.erpSearchDesc}
              setErpSearchDesc={actions.setErpSearchDesc}
              erpSearchType={actions.erpSearchType}
              setErpSearchType={actions.setErpSearchType}
              erpSearching={actions.erpSearching}
              erpSearchResults={actions.erpSearchResults}
              onSearch={actions.handleErpSearch}
              onSelectCode={(code) => {
                if (actions.filteredCoringaMatches.length > 0) {
                  actions.setIndCoringaAcronym(code);
                  actions.setCoringaTo(code);
                }
                const showRefPanel = ((data?.meta?.referenciaEmpty?.length ?? 0) > 0 || (data?.errors ?? []).some(er => String(er).toUpperCase().includes("ITEM SEM CÓDIGO")));
                if (showRefPanel) {
                  actions.setRefFillValue(code);
                }
                toast.success(`Código "${code}" selecionado`);
              }}
            />

            <CoringaSection 
              isOpen={actions.coringaOpen}
              onToggle={() => actions.setCoringaOpen(!actions.coringaOpen)}
              data={data}
              coringaFrom={actions.coringaFrom}
              setCoringaFrom={actions.setCoringaFrom}
              coringaTo={actions.coringaTo}
              setCoringaTo={actions.setCoringaTo}
              indCoringaAcronym={actions.indCoringaAcronym}
              setIndCoringaAcronym={actions.setIndCoringaAcronym}
              indCoringaSearching={actions.indCoringaSearching}
              indCoringaOptions={actions.indCoringaOptions}
              onCoringaSearch={actions.handleCoringaSearch}
              onApplyCoringa={() => actions.setConfirmCoringaOpen(true)}
              isReplacing={actions.isReplacing}
              lastReplace={actions.lastReplace}
              filteredCoringaMatches={actions.filteredCoringaMatches}
              coringa1Acronym={actions.coringa1Acronym}
              setCoringa1Acronym={actions.setCoringa1Acronym}
              coringa1Searching={actions.coringa1Searching}
              coringa1Options={actions.coringa1Options}
              coringa1Selected={actions.coringa1Selected}
              setCoringa1Selected={actions.setCoringa1Selected}
              coringa1Done={actions.coringa1Done}
              onApplyCoringa1={actions.onApplyCoringa1}
              coringa2Acronym={actions.coringa2Acronym}
              setCoringa2Acronym={actions.setCoringa2Acronym}
              coringa2Searching={actions.coringa2Searching}
              coringa2Options={actions.coringa2Options}
              coringa2Selected={actions.coringa2Selected}
              setCoringa2Selected={actions.setCoringa2Selected}
              coringa2Done={actions.coringa2Done}
              onApplyCoringa2={actions.onApplyCoringa2}
              cg1Acronym={actions.cg1Acronym}
              setCg1Acronym={actions.setCg1Acronym}
              cg1Searching={actions.cg1Searching}
              cg1Options={actions.cg1Options}
              cg1Replace={actions.cg1Replace}
              setCg1Replace={actions.setCg1Replace}
              cg1Done={actions.cg1Done}
              onApplyCg1={actions.onApplyCg1}
              cg2Acronym={actions.cg2Acronym}
              setCg2Acronym={actions.setCg2Acronym}
              cg2Searching={actions.cg2Searching}
              cg2Options={actions.cg2Options}
              cg2Replace={actions.cg2Replace}
              setCg2Replace={actions.setCg2Replace}
              cg2Done={actions.cg2Done}
              onApplyCg2={actions.onApplyCg2}
            />

            <PendingRefSection 
              isOpen={actions.pendingRefOpen}
              onToggle={() => actions.setPendingRefOpen(!actions.pendingRefOpen)}
              data={data}
              selectedRefSingle={actions.selectedRefSingle}
              setSelectedRefSingle={actions.setSelectedRefSingle}
              refFillValue={actions.refFillValue}
              setRefFillValue={actions.setRefFillValue}
              onConfirm={() => actions.setConfirmRefOpen(true)}
            />

          </div>
        </div>

        {/* MODALS */}
        <AlertDialog open={actions.confirmCoringaOpen} onOpenChange={actions.setConfirmCoringaOpen}>
          <AlertDialogContent className="bg-[#1a1a1a] border border-amber-500/30">
            <AlertDialogTitle className="text-white">Confirmar troca de cor coringa?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300">
              Você está prestes a substituir <span className="font-mono font-bold text-amber-300">{actions.coringaFrom}</span> por <span className="font-mono font-bold text-amber-300">{actions.coringaTo}</span>.
            </AlertDialogDescription>
            <div className="flex gap-2 justify-end">
              <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={actions.onApplyCoringa}
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                Confirmar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={actions.confirmRefOpen} onOpenChange={actions.setConfirmRefOpen}>
          <AlertDialogContent className="bg-[#1a1a1a] border border-rose-500/30">
            <AlertDialogTitle className="text-white">Confirmar preenchimento de REFERENCIA?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300">
              {(() => {
                const [selId, ...selDescParts] = (actions.selectedRefSingle || '').split('|');
                const selDesc = selDescParts.join('|');
                return (
                  <>
                    Você está prestes a preencher REFERENCIA do item:
                    <div className="mt-2 p-2 bg-white/5 rounded border border-white/10">
                      <div className="font-bold text-rose-300">ID: {selId}</div>
                      {selDesc && <div className="text-xs italic text-zinc-400">"{selDesc}"</div>}
                    </div>
                    <div className="mt-2">Novo código: <span className="font-mono font-bold text-rose-300">{actions.refFillValue}</span></div>
                  </>
                );
              })()}
            </AlertDialogDescription>
            <div className="flex gap-2 justify-end">
              <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={actions.onApplyRef}
                className="bg-rose-500 text-black hover:bg-rose-600"
              >
                Confirmar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={actions.confirmCgOpen} onOpenChange={actions.setConfirmCgOpen}>
          <AlertDialogContent className="bg-[#1a1a1a] border border-amber-500/30">
            <AlertDialogTitle className="text-white">Confirmar troca em lote (CG1/CG2)?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300">
              Você está prestes a substituir:
              <ul className="mt-2 ml-4 space-y-1 text-xs">
                {actions.cg1Replace && <li>• <span className="font-mono">CG1</span> → <span className="font-mono font-bold text-amber-300">{actions.cg1Replace}</span></li>}
                {actions.cg2Replace && <li>• <span className="font-mono">CG2</span> → <span className="font-mono font-bold text-amber-300">{actions.cg2Replace}</span></li>}
              </ul>
              <div className="mt-2 text-xs">Será criado um backup do arquivo original.</div>
            </AlertDialogDescription>
            <div className="flex gap-2 justify-end">
              <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={actions.onApplyCgBatch}
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                Confirmar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={actions.confirmMoveOpen} onOpenChange={actions.setConfirmMoveOpen}>
          <AlertDialogContent className="bg-[#1a1a1a] border border-amber-500/30">
            <AlertDialogTitle className="text-white">Ainda há desenhos duplados. Mover mesmo assim?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300 text-sm">
              Existem pendências de correção DXF identificadas nestes itens duplados (ES08).
            </AlertDialogDescription>
            <div className="flex gap-2 justify-end">
              <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  actions.setConfirmMoveOpen(false);
                  actions.handleMoveToOk();
                }}
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                Confirmar e Mover
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

      </SheetContent>
    </Sheet>
  );
}

export default React.memo(FileDetailDrawer);
