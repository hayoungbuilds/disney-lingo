/**
 * popup.tsx
 *
 * 크롬 확장 프로그램의 팝업(Popup UI) 진입점입니다.
 *
 * - HTML: public/popup.html 에서 <div id="root" /> 에 연결됩니다.
 * - UI 컴포넌트: src/components/Popup.tsx
 * - React DOM의 createRoot를 사용하여 팝업 콘텐츠를 렌더링합니다.
 *
 * 🔗 manifest.json에서 "action.default_popup" 항목으로 연결됨
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './components/Popup';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<Popup />);
}
