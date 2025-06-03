

// 팝업 스크립트
function openPopup(popupId) {
    document.getElementById(popupId).classList.add('active');
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove('active');
}

// 팝업 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 팝업 열기 버튼
    document.querySelectorAll('.popup-open').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            if (targetId) {
                openPopup(targetId);
            }
        });
    });

    // 팝업 닫기
    document.querySelectorAll('.popup-wrap').forEach(popup => {
        // 닫기 버튼
        const closeBtn = popup.querySelector('.popup-wrap__content__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
            });
        }

        // ESC 키로 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popup.classList.remove('active');
            }
        });

        // 외부 클릭시 닫기
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });
});
