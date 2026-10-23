document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openNotebook");
  const notebook = document.getElementById("notebookView");
  const closeBtn = document.getElementById("closeBtn");
  const notebookImg = document.getElementById("notebookImg");
  const pageCounter = document.getElementById("pageCounter");
  const imageWrapper = document.getElementById("imageWrapper");
  if (!openBtn) return;

  const pages = ['img/pages/00.jpg'];
  for (let i = 1; i <= 50; i++) {
    pages.push(`img/pages/${i.toString().padStart(2, '0')}.png`);
  }

  let currentIndex = 0;

  function updateGallery() {
    notebookImg.src = pages[currentIndex];
    pageCounter.textContent = `${currentIndex + 1} / ${pages.length}`;
  }

  imageWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = imageWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x > rect.width / 2) {
      currentIndex = (currentIndex + 1) % pages.length;
    } else {
      currentIndex = (currentIndex - 1 + pages.length) % pages.length;
    }
    updateGallery();
  });

  openBtn.addEventListener("click", () => {
    currentIndex = 0;
    updateGallery();
    notebook.classList.add("visible");
  });

  const closeNotebook = () => notebook.classList.remove("visible");
  closeBtn.addEventListener("click", closeNotebook);
  notebook.addEventListener("click", (e) => {
    if (e.target === notebook) closeNotebook();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.id !== 'index-page') return;

  const grid = document.querySelector('.image-grid');

  if (typeof galleryImages !== 'undefined' && Array.isArray(galleryImages)) {
    galleryImages.forEach(image => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';

      const img = document.createElement('img');
      img.src = image.path;
      img.alt = "Gallery image";

      if (image.link) {
        const link = document.createElement('a');
        link.href = image.link;
        link.appendChild(img);
        gridItem.appendChild(link);
      } else {
        gridItem.appendChild(img);
      }

      grid.appendChild(gridItem);
    });
  }

  const items = Array.from(grid.children);

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  items.forEach(item => grid.appendChild(item));
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.index-links p a').forEach(link => {
    const letters = link.textContent.split('');
    link.textContent = '';
    letters.forEach(ch => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      link.appendChild(span);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hints = document.querySelectorAll('#scrollHint, footer.object-caption');
  if (!hints.length) return;

  const updateScrollHint = () => {
    hints.forEach(el => el.classList.toggle('hidden', window.scrollY > 0));
  };

  updateScrollHint();
  window.addEventListener('scroll', updateScrollHint);
});

document.addEventListener("DOMContentLoaded", () => {
  const isMobile =
    window.matchMedia("(max-width: 768px)").matches ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  try {
    if (sessionStorage.getItem("desktopNoticeSeen")) return;
  } catch (e) {}

  const notice = document.createElement("div");
  notice.className = "desktop-notice";
  notice.innerHTML = `
    <div class="desktop-notice-box" role="dialog" aria-modal="true" aria-labelledby="desktopNoticeText">
      <p id="desktopNoticeText">♥︎ For the best experience, we recommend viewing this website on a computer. ♥︎</p>
      <button type="button" class="desktop-notice-close">Continue anyway</button>
    </div>
  `;
  document.body.appendChild(notice);

  notice.querySelector(".desktop-notice-close").addEventListener("click", () => {
    notice.remove();
    try {
      sessionStorage.setItem("desktopNoticeSeen", "1");
    } catch (e) {}
  });
});
