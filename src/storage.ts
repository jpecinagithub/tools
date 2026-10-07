import type { Lang, Tool } from './types';
import { SEED_TOOLS } from './seed';

const KEY = 'tools.app.v1';

interface Stored {
  tools: Tool[];
  lang: Lang;
}

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (!Array.isArray(parsed.tools)) return null;
    return {
      tools: parsed.tools.filter(
        (t): t is Tool =>
          !!t && typeof t.id === 'string' && typeof t.name === 'string' && typeof t.url === 'string',
      ),
      lang: parsed.lang === 'es' ? 'es' : 'en',
    };
  } catch {
    return null;
  }
}

export function loadState(): Stored {
  return readStored() ?? { tools: SEED_TOOLS, lang: 'en' };
}

export function saveState(tools: Tool[], lang: Lang): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ tools, lang } satisfies Stored));
  } catch {
    // Storage full or unavailable — the app still works in memory.
  }
}

export function resetState(): Stored {
  const fresh: Stored = { tools: SEED_TOOLS, lang: 'en' };
  saveState(fresh.tools, fresh.lang);
  return fresh;
}

export function makeId(): string {
  return `tool-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
