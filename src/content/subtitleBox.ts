/** 자막 박스 생성 (최초 1회) */
export function createSubtitleBox() {
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
