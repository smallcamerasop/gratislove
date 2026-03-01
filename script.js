document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openNotebook");
  const notebook = document.getElementById("notebookView");
  const closeBtn = document.getElementById("closeBtn");
  const notebookImg = document.getElementById("notebookImg");
  const pageCounter = document.getElementById("pageCounter");
  const imageWrapper = document.getElementById("imageWrapper");
  
  // 新增：取得左右疊加層的元素
  const leftOverlay = document.getElementById("leftOverlay");
  const rightOverlay = document.getElementById("rightOverlay");

  const pageImages = ['img/pages/00.jpg'];
  for (let i = 1; i <= 50; i++) {
    pageImages.push(`img/pages/${i.toString().padStart(2, '0')}.png`);
  }

  const pageData = pageImages.map(imagePath => {
    return {
      base: imagePath,
      left: "",
      right: ""
    };
  });

  // 1. 定義每一頁的資料結構
  

  let currentIndex = 0;

  // 2. 更新內容的函式
  function updateGallery() {
    const currentPage = pageData[currentIndex];
    
    // 更新圖片路徑
    notebookImg.src = currentPage.base;
    leftOverlay.src = currentPage.left;
    rightOverlay.src = currentPage.right;
    
    // 更新頁碼
    pageCounter.textContent = `${currentIndex + 1} / ${pageData.length}`;
    
    // 預設隱藏疊加層
    leftOverlay.style.opacity = "0";
    rightOverlay.style.opacity = "0";
  }

  // 3. 處理滑鼠移動 (顯示疊加圖)
  imageWrapper.addEventListener("mousemove", (e) => {
    const rect = imageWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width / 2;

    if (isLeftSide) {
      leftOverlay.style.opacity = "1";
      rightOverlay.style.opacity = "0";
      imageWrapper.style.cursor = "w-resize"; // 顯示左箭頭
    } else {
      leftOverlay.style.opacity = "0";
      rightOverlay.style.opacity = "1";
      imageWrapper.style.cursor = "e-resize"; // 顯示右箭頭
    }
  });

  // 滑鼠離開圖片區域時隱藏疊加圖
  imageWrapper.addEventListener("mouseleave", () => {
    leftOverlay.style.opacity = "0";
    rightOverlay.style.opacity = "0";
  });

  // 4. 處理點擊翻頁
  imageWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = imageWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x > rect.width / 2) {
      currentIndex = (currentIndex + 1) % pageData.length;
    } else {
      currentIndex = (currentIndex - 1 + pageData.length) % pageData.length;
    }
    updateGallery();
    
  });

  // 打開與關閉
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




// Shuffle the image grid items randomly on the index page
window.addEventListener('DOMContentLoaded', () => {
  // Only run this on the index page
  if (document.body.id !== 'index-page') {
    return;
  }

  const grid = document.querySelector('.image-grid');

  // Populate the grid from the galleryImages array (from works_data.js)
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

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // Remove current items and append them in shuffled order
  items.forEach(item => grid.appendChild(item));
});