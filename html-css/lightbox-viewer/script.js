const lightbox = document.querySelector(".lightbox");
function openLightbox(imageSrc) {
  lightbox.style.display = "flex";
  document.getElementById("lightbox-image").src = imageSrc;
}

function closeLightbox() {
  lightbox.style.display = "none";
}
