import { useState } from 'react';
import type { Tool } from '../types';

function domainOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function isImageIcon(icon: string): boolean {
  const v = icon.trim().toLowerCase();
  return (
    v.startsWith('http://') ||
    v.startsWith('https://') ||
    v.startsWith('data:image/') ||
    v.startsWith('/')
  );
}

/** Icon tile: custom emoji/image > site favicon > initial letter. */
export function ToolIcon({ tool }: { tool: Tool }) {
  const [stage, setStage] = useState(0);
  const custom = tool.icon?.trim();

  if (custom) {
    if (isImageIcon(custom)) {
      return (
        <span className="tile">
          <img
            src={custom}
            alt=""
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="tile-letter">{tool.name.charAt(0).toUpperCase()}</span>
        </span>
      );
    }
    return (
      <span className="tile tile-emoji" aria-hidden="true">
        {custom}
      </span>
    );
  }

  const domain = domainOf(tool.url);
  if (domain && stage === 0) {
    return (
      <span className="tile">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt=""
          loading="lazy"
          onError={() => setStage(1)}
        />
      </span>
    );
  }

  return (
    <span className="tile tile-letter" aria-hidden="true">
      {tool.name.charAt(0).toUpperCase()}
    </span>
  );
}
