/**
 * contentagent.space — Demo Agent Embed Widget
 * 
 * Drop this script on ANY webpage to add the floating chat agent.
 * 
 * Usage:
 *   <script
 *     src="https://yoursite.netlify.app/widget.js"
 *     data-endpoint="https://yoursite.netlify.app/.netlify/functions/agent"
 *     data-business="Cooper Built Homes"
 *     data-agent="Emma"
 *     data-accent="#7c6ef0"
 *   ></script>
 */

(function () {
  'use strict';

  const script = document.currentScript;
  const endpoint = script?.dataset?.endpoint || '/.netlify/functions/agent';
  const businessName = script?.dataset?.business || 'this business';
  const agentName = script?.dataset?.agent || 'Alex';
  const accentColor = script?.dataset?.accent || '#7c6ef0';

  // Prevent double init
  if (document.getElementById('ca-widget-root')) return;

  // ── Inject styles ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #ca-widget-root * { box-sizing: border-box; margin: 0; padding: 0; }
    #ca-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      width: 56px; height: 56px; border-radius: 50%;
      background: ${accentColor}; border: none; cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; transition: transform 0.2s, box-shadow 0.2s;
    }
    #ca-fab:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(0,0,0,0.45); }
    #ca-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9999;
      width: 360px; height: 520px;
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,0.5);
      transform: scale(0.92) translateY(12px);
      opacity: 0; pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s;
    }
    #ca-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1; pointer-events: auto;
    }
    #ca-panel iframe {
      width: 100%; height: 100%; border: none;
    }
    @media (max-width: 440px) {
      #ca-panel {
        width: calc(100vw - 24px); right: 12px; bottom: 84px;
        height: 70svh;
      }
    }
  `;
  document.head.appendChild(style);

  // ── FAB button ───────────────────────────────────────────────────────────────
  const root = document.createElement('div');
  root.id = 'ca-widget-root';

  const fab = document.createElement('button');
  fab.id = 'ca-fab';
  fab.setAttribute('aria-label', 'Open chat');
  fab.textContent = '💬';

  // ── Panel (iframe) ───────────────────────────────────────────────────────────
  const panel = document.createElement('div');
  panel.id = 'ca-panel';
  panel.setAttribute('aria-hidden', 'true');

  // Build iframe src with query params so the widget page reads them
  const iframeSrc = new URL(script?.src || window.location.href);
  iframeSrc.pathname = '/'; // point to chat page
  iframeSrc.searchParams.set('endpoint', endpoint);
  iframeSrc.searchParams.set('business', businessName);
  iframeSrc.searchParams.set('agent', agentName);
  iframeSrc.searchParams.set('accent', accentColor);

  const iframe = document.createElement('iframe');
  iframe.src = iframeSrc.toString();
  iframe.title = `Chat with ${agentName}`;
  iframe.allow = 'autoplay';

  panel.appendChild(iframe);
  root.appendChild(fab);
  root.appendChild(panel);
  document.body.appendChild(root);

  // ── Toggle logic ─────────────────────────────────────────────────────────────
  let open = false;
  fab.addEventListener('click', () => {
    open = !open;
    fab.textContent = open ? '✕' : '💬';
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
  });
})();
