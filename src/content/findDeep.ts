// Shadow DOM 안 깊숙한 요소도 찾는 유틸
export function findDeep(selector: string, root: Document | ShadowRoot = document): Element | null {
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
