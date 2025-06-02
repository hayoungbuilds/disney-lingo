import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'disneylingo-enabled';

const Popup = () => {
    const [enabled, setEnabled] = useState<boolean>(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        setEnabled(stored !== 'false');
    }, []);

    const toggleEnabled = () => {
        const newValue = !enabled;
        setEnabled(newValue);
        localStorage.setItem(STORAGE_KEY, newValue.toString());

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.id !== undefined) {
                chrome.tabs.sendMessage(
                    tab.id,
                    {
                        type: 'TOGGLE_SUBTITLE',
                        enabled: newValue,
                    },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.error('[DisneyLingo] 메시지 전송 실패:', chrome.runtime.lastError.message);
                        }
                    }
                );
            }
        });
    };

    return (
        <div style={{ padding: '12px', width: '240px' }}>
            <h1 style={{ margin: '0 0 12px' }}>DisneyLingo</h1>
            <p style={{ marginBottom: '12px' }}>자막 설정을 켜고 끌 수 있어요.</p>
            <button
                onClick={toggleEnabled}
                style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: enabled ? '#ffeaa7' : '#dfe6e9',
                }}
            >
                {enabled ? '🔔 자막 끄기' : '🔕 자막 켜기'}
            </button>
        </div>
    );
};

export default Popup;
