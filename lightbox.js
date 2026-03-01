document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const gridImages = document.querySelectorAll(".image-grid .grid-item img, .item-image img, .workshop-grid img");
  const closeLightbox = document.querySelector(".close-lightbox");

  gridImages.forEach(image => {
    image.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = image.src;
    });
  });

  const close = () => {
    lightbox.style.display = "none";
  }

  closeLightbox.addEventListener("click", close);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      close();
    }
  });
});
