import React, { useState } from 'react';
import { X, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { exportStateJson, importStateJson, resetToDefaults } = useTrip();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleDownload = () => {
    const jsonStr = exportStateJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ixhuatan_and_beyond_trip_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importStateJson(importJsonText);
    if (success) {
      setImportStatus('success');
      setTimeout(() => {
        setImportStatus('idle');
        onClose();
      }, 1000);
    } else {
      setImportStatus('error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm(language === 'es' ? '¿Restaurar los datos originales del viaje?' : 'Reset to default trip data?')) {
      resetToDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>⚙️</span>
              <span>{t.adminMode}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'es'
                ? 'Gestiona respaldos, importa cambios o restaura la configuración.'
                : 'Manage backups, import custom JSON, or restore default state.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Action */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t.exportData}</span>
          </h3>
          <p className="text-xs text-emerald-800/90 leading-relaxed">
            {language === 'es'
              ? 'Guarda una copia de seguridad con todos los votos, checklists y notas para compartirla o conservarla.'
              : 'Save a backup file with all votes, packing progress, and notes to share or archive.'}
          </p>
          <button
            onClick={handleDownload}
            className="mt-2 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'es' ? 'Descargar Archivo .JSON' : 'Download .JSON File'}</span>
          </button>
        </div>

        {/* Import JSON */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>{t.importData}</span>
          </h3>
          
          <div className="flex items-center gap-2">
            <label className="cursor-pointer py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200">
              <span>{language === 'es' ? 'Subir archivo' : 'Upload file'}</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
            <span className="text-[11px] text-slate-400">
              {language === 'es' ? 'o pega el código JSON abajo:' : 'or paste JSON text below:'}
            </span>
          </div>

          <textarea
            value={importJsonText}
            onChange={e => setImportJsonText(e.target.value)}
            placeholder='{"tripTitle": "Ixhuatan & Beyond", ...}'
            rows={4}
            className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />

          {importStatus === 'success' && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <Check className="w-4 h-4" />
              <span>{language === 'es' ? '¡Datos cargados con éxito!' : 'Data loaded successfully!'}</span>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <AlertCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'JSON inválido. Revisa el formato.' : 'Invalid JSON format.'}</span>
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!importJsonText.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs transition-colors"
          >
            {language === 'es' ? 'Aplicar Datos Importados' : 'Apply Imported Data'}
          </button>
        </div>

        {/* Reset to Default */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-800">{t.resetDefaults}</h4>
            <p className="text-[11px] text-slate-400">
              {language === 'es' ? 'Vuelve a la configuración original sugerida.' : 'Restores the original suggested itinerary.'}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Restaurar' : 'Reset'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
