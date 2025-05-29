console.log('[DisneyLingo] Content script loaded');

// 현재 재생 상태와 마지막 자막 저장 변수
let isPlaying = false;
let lastSubtitle = '';

// video 요소 찾기
const video = document.querySelector('video');

if (video) {
    // 재생/일시정지 상태 추적
    video.addEventListener('play', () => {
        isPlaying = true;
        console.log('[DisneyLingo] ▶️ 영상 재생 중');
    });

    video.addEventListener('pause', () => {
        isPlaying = false;
        console.log('[DisneyLingo] ⏸️ 영상 일시정지');
    });
} else {
    console.warn('[DisneyLingo] ⚠️ video 요소를 찾을 수 없음');
}

// 자막 DOM 변화 감지
const observer = new MutationObserver(() => {
    const cue = document.querySelector('.hive-subtitle-renderer-line');
    const text = cue?.textContent?.trim();

    // 조건: 자막 있음 + 재생 중 + 이전 자막과 다름
    if (cue && text && isPlaying && text !== lastSubtitle) {
        lastSubtitle = text;
        console.log('[자막]', text);
    }
});

// 자막 DOM 변화 감지 시작
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
