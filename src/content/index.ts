import { createSubtitleBox } from './subtitleBox';
import { startSubtitleLoop } from './subtitleLoop';

console.log('[DisneyLingo] 이중 자막 감지 시작');

// 자막 박스 초기 생성
createSubtitleBox();

// 자막 추적 시작
startSubtitleLoop();

// 팝업에서 보내는 설정 메시지 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TOGGLE_SUBTITLE') {
        const isEnabled = message.enabled;
        localStorage.setItem('disneylingo-enabled', isEnabled.toString());

        const box = document.querySelector('#disneylingo-box') as HTMLElement | null;
        if (box) {
            box.style.display = isEnabled ? 'block' : 'none';
        }

        sendResponse({ success: true });
    }

    return true; // 비동기 응답 허용
});
