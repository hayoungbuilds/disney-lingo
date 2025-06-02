// Shadow DOM 안 깊숙한 요소도 찾는 유틸
function findDeep(selector: string, root: Document | ShadowRoot = document): Element | null {
    const el = root.querySelector(selector);
    if (el) return el;

    const elems = Array.from(root.querySelectorAll('*')) as HTMLElement[];
    for (const node of elems) {
        if (node instanceof HTMLElement && node.shadowRoot) {
            const found = findDeep(selector, node.shadowRoot);
            if (found) return found;
        }
    }
    return null;
}

console.log('[DisneyLingo] 이중 자막 감지 시작');

let lastText = '';
let lastHtml = '';
let lastUpdated = Date.now();

// 자막 박스 생성
function createSubtitleBox() {
    if (document.querySelector('#disneylingo-box')) return;

    const box = document.createElement('div');
    box.id = 'disneylingo-box';
    box.style.position = 'fixed';
    box.style.left = '0';
    box.style.width = '100%';
    box.style.textAlign = 'center';
    box.style.zIndex = '999999';
    box.style.pointerEvents = 'none';

    const inner = document.createElement('div');
    inner.id = 'disneylingo-inner';
    inner.style.display = 'inline-block';
    inner.style.background = 'rgba(0,0,0,0.7)';
    inner.style.color = 'white';
    inner.style.fontSize = '28px';
    inner.style.padding = '8px 16px';
    inner.style.borderRadius = '8px';
    inner.style.textShadow = '1px 1px 2px black';
    inner.style.whiteSpace = 'pre-wrap';
    inner.style.wordBreak = 'break-word';
    inner.style.maxWidth = '80%';
    inner.textContent = '';

    box.appendChild(inner);
    document.body.appendChild(box);
}

// 초기 셋업
createSubtitleBox();

setInterval(() => {
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

    // 자막이 안 보이는 상태가 일정 시간 지속될 때만 숨기기
    if (html === lastHtml && !isVisible) {
        if (now - lastUpdated > 1500) {
            box.style.display = 'none';
        }
        return;
    }

    // 자막이 보이면 항상 보여주기
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
