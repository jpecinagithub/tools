import { useEffect, useRef, useState } from 'react';
import type { Lang, Tool } from '../types';
import type { Strings } from '../i18n';
import { ToolIcon } from './ToolIcon';

interface Props {
  tool: Tool;
  lang: Lang;
  t: Strings;
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
}

export function ToolCard({ tool, lang, t, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const askDelete = () => {
    if (confirming) {
      onDelete(tool.id);
      return;
    }
    setConfirming(true);
    timer.current = window.setTimeout(() => setConfirming(false), 3000);
  };

  return (
    <article className="card">
      <div className="card-top">
        <ToolIcon tool={tool} />
        <div className="card-head">
          <h2 className="card-name">{tool.name}</h2>
          <a
            className="card-domain"
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            title={t.cardOpenTitle}
          >
            {tool.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        </div>
      </div>
      <p className="card-desc">{tool.desc[lang] || tool.desc.en}</p>
      <div className="card-actions">
        <a
          className="btn btn-primary"
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          title={t.cardOpenTitle}
        >
          {t.open} <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onEdit(tool)}
          aria-label={`${t.edit}: ${tool.name}`}
        >
          <span aria-hidden="true">✎</span> {t.edit}
        </button>
        <button
          type="button"
          className={`btn ${confirming ? 'btn-danger-confirm' : 'btn-ghost'}`}
          onClick={askDelete}
          aria-label={`${t.delete}: ${tool.name}`}
        >
          {confirming ? `⚠ ${t.yesDelete}` : <><span aria-hidden="true">🗑</span> {t.delete}</>}
        </button>
      </div>
      {confirming && <p className="card-confirm-hint">{t.confirmDelete}</p>}
    </article>
  );
}
