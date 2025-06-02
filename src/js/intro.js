document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  // 탭 클릭 시 스크롤 이동
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = document.querySelector(btn.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 섹션이 화면에 보이면 탭 active 처리
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === `#${entry.target.id}`);
        });
      }
    });
  }, {
    threshold: 0.5
  });
  sections.forEach(section => observer.observe(section));
}); 