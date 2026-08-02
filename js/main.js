document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. GLightbox の初期化（画像・動画のポップアップ＆スライド）
  // ==========================================
  const lightbox = GLightbox({
    selector: '.glightbox', // 対象のクラス名
    loop: true,             // 最後の作品から最初に戻るスライド
    touchNavigation: true,  // スマホのフリック操作対応
    autoplayVideos: true,   // 開いた時に動画を自動再生する
  });


  // ==========================================
  // 2. 【ホバー再生】サムネイル上で動画を自動再生
  // ==========================================
  const videoItems = document.querySelectorAll('.gallery-item.video-item');

  videoItems.forEach(item => {
    const videoSrc = item.getAttribute('data-video-src');
    let hoverVideoElement = null;

    item.addEventListener('mouseenter', () => {
      if (!hoverVideoElement && videoSrc) {
        hoverVideoElement = document.createElement('video');
        hoverVideoElement.src = videoSrc;
        hoverVideoElement.autoplay = true;
        hoverVideoElement.loop = true;
        hoverVideoElement.muted = true;
        hoverVideoElement.playsInline = true;
        hoverVideoElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:1;pointer-events:none;';

        hoverVideoElement.addEventListener('canplay', () => {
          hoverVideoElement.play();
        });

        item.appendChild(hoverVideoElement);
      }
    });

    item.addEventListener('mouseleave', () => {
      if (hoverVideoElement) {
        hoverVideoElement.pause();
        hoverVideoElement.remove();
        hoverVideoElement = null;
      }
    });
  });

  // ==========================================
  // 3. 【右下固定ボタン】ぷるっと動く処理
  // ==========================================
  const fixedDecorBtn = document.getElementById('fixedDecorBtn');
  if (fixedDecorBtn) {
    fixedDecorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fixedDecorBtn.classList.add('clicked');
      setTimeout(() => {
        fixedDecorBtn.classList.remove('clicked');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    });
  }

});