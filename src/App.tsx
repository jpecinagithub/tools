import { useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Lang, Tool } from './types';
import { getStrings } from './i18n';
import { loadState, saveState, resetState } from './storage';
import { ToolCard } from './components/ToolCard';
import { ToolModal } from './components/ToolModal';

export default function App() {
  const [initial] = useState(loadState);
  const [tools, setTools] = useState<Tool[]>(initial.tools);
  const [lang, setLang] = useState<Lang>(initial.lang);
  const [modal, setModal] = useState<{ open: boolean; tool: Tool | null }>({
    open: false,
    tool: null,
  });

  const t = getStrings(lang);

  useEffect(() => {
    saveState(tools, lang);
  }, [tools, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'es' : 'en'));
  }, []);

  const handleSave = useCallback((tool: Tool) => {
    setTools((prev) => {
      const idx = prev.findIndex((p) => p.id === tool.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = tool;
        return next;
      }
      return [...prev, tool];
    });
    setModal({ open: false, tool: null });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTools((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm(t.resetConfirm)) {
      const fresh = resetState();
      setTools(fresh.tools);
      setLang(fresh.lang);
    }
  }, [t]);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="30" height="30">
              <rect x="2" y="2" width="60" height="60" rx="14" fill="#0b0e14" />
              <g fill="#f5a524">
                <rect x="14" y="14" width="10" height="10" rx="3" />
                <rect x="27" y="14" width="10" height="10" rx="3" />
                <rect x="40" y="14" width="10" height="10" rx="3" />
                <rect x="14" y="27" width="10" height="10" rx="3" />
                <rect x="27" y="27" width="10" height="10" rx="3" fill="#ffd27a" />
                <rect x="40" y="27" width="10" height="10" rx="3" />
                <rect x="14" y="40" width="10" height="10" rx="3" />
                <rect x="27" y="40" width="10" height="10" rx="3" />
                <rect x="40" y="40" width="10" height="10" rx="3" />
              </g>
            </svg>
          </span>
          <div>
            <h1 className="brand-title">TOOLS</h1>
            <p className="brand-sub">{t.subtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-ghost lang-btn"
            onClick={toggleLang}
            title={t.langLabel}
            aria-label={t.langLabel}
          >
            {t.langName}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModal({ open: true, tool: null })}
          >
            <span aria-hidden="true">＋</span> {t.addTool}
          </button>
        </div>
      </header>

      <main className="main">
        {tools.length === 0 ? (
          <div className="empty">
            <p>{t.empty}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setModal({ open: true, tool: null })}
            >
              <span aria-hidden="true">＋</span> {t.addTool}
            </button>
          </div>
        ) : (
          <div className="grid">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                lang={lang}
                t={t}
                onEdit={(tl) => setModal({ open: true, tool: tl })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>
          {t.footerBuilt} · <a href="mailto:jpecina@gmail.com">jpecina@gmail.com</a>
        </span>
        <button type="button" className="link-btn" onClick={handleReset}>
          {t.reset}
        </button>
      </footer>

      {modal.open && (
        <ToolModal
          t={t}
          initial={modal.tool}
          onClose={() => setModal({ open: false, tool: null })}
          onSave={handleSave}
        />
      )}
      <Analytics />
    </div>
  );
}
