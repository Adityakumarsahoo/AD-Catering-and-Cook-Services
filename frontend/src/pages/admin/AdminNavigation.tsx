import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  Compass,
  Save,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit2,
  ExternalLink,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const AdminNavigation: React.FC = () => {
  const [navItems, setNavItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadNavigation = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminNavigation();
      if (res?.navigation) {
        setNavItems(res.navigation);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load navigation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNavigation();
  }, []);

  const handleLabelChange = (index: number, newLabel: string) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], name: newLabel };
    setNavItems(updated);
  };

  const handleToggleVisibility = (index: number) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    setNavItems(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...navItems];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    // Update sortOrder
    updated.forEach((item, i) => {
      item.sortOrder = i + 1;
    });
    setNavItems(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === navItems.length - 1) return;
    const updated = [...navItems];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    // Update sortOrder
    updated.forEach((item, i) => {
      item.sortOrder = i + 1;
    });
    setNavItems(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateAdminNavigation({ navigation: navItems });
      toast.success('Navigation menu configuration saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update navigation');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">Website Navigation Menu Manager</h3>
          <p className="text-xs text-slate-500">Configure public navigation link labels, display order, and visibility</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadNavigation}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Navigation'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Reorder & Edit Table */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Active Header Menu Links ({navItems.filter((i) => i.visible).length} visible)
          </span>
          <span className="text-[11px] text-slate-400">
            Reorder using arrows. Destinations match verified public routes.
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {navItems.map((item, index) => (
            <div
              key={item.id || index}
              className={`p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors ${
                !item.visible ? 'bg-slate-50/60 opacity-60' : 'hover:bg-slate-50/40'
              }`}
            >
              {/* Left: Ordering arrows + Label input */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(index)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <button
                    type="button"
                    disabled={index === navItems.length - 1}
                    onClick={() => handleMoveDown(index)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>

                <span className="w-6 text-center font-mono font-bold text-slate-400 text-xs">
                  #{index + 1}
                </span>

                <div className="flex-1 max-w-xs">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-[11px] text-slate-600">
                    {item.path}
                  </span>
                  {item.isVeg && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Veg Gem Pill
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Visibility Toggle & Preview */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(index)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    item.visible
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {item.visible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <a
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  title="Test route on public site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </form>
  );
};
