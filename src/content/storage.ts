// 로컬스토리지 on/off 상태 관리
export function getSubtitleEnabled(): boolean {
    return localStorage.getItem('disneylingo-enabled') !== 'false';
}
