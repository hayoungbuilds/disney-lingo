import { findDeep } from './findDeep';
import { getSubtitleEnabled } from './storage';

let lastHtml = '';
let lastText = '';
let lastUpdated = Date.now();

export function startSubtitleLoop() {
    setInterval(() => {
        if (!getSubtitleEnabled()) {
            const box = document.querySelector('#disneylingo-box') as HTMLElement | null;
            if (box) box.style.display = 'none';
            return;
        }

        const cueWindow = findDeep('.hive-subtitle-renderer-cue-window') as HTMLElement | null;
        const box = document.querySelector('#disneylingo-box') as HTMLElement | null;
        const inner = document.querySelector('#disneylingo-inner') as HTMLElement | null;

        if (!cueWindow || !box || !inner) {
            if (box) box.style.display = 'none';
            return;
        }

        const lines = cueWindow.querySelectorAll('.hive-subtitle-renderer-line');
        const text = Array.from(lines)
            .map((el) => el.textContent?.trim())
            .join('\n')
            .trim();

        const html = cueWindow.innerHTML;
        const now = Date.now();

        const rect = cueWindow.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;

        if (html === lastHtml && !isVisible) {
            if (now - lastUpdated > 1500) {
                box.style.display = 'none';
            }
            return;
        }

        if (isVisible) {
            lastHtml = html;
            lastText = text;
            lastUpdated = now;

            inner.textContent = `[번역] ${text}`;
            box.style.display = 'block';

            const cueRect = cueWindow.getBoundingClientRect();
            let topPos = cueRect.bottom + 10;
            if (topPos + 60 > window.innerHeight) {
                topPos = cueRect.top - 60;
            }
            box.style.top = `${topPos}px`;
        }
    }, 300);
}
