const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainProductImage");
const zoomBtn = document.getElementById("zoomBtn");

let zoomed = false;

// Thumbnail image switch
if (thumbnails.length > 0 && mainImage) {

  thumbnails.forEach((thumbnail) => {

    thumbnail.addEventListener("click", () => {

      thumbnails.forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");

      const newImage = thumbnail.querySelector("img").src;

      mainImage.style.opacity = "0";

      setTimeout(() => {

        mainImage.src = newImage;
        mainImage.style.opacity = "1";

      }, 150);

    });

  });

}

// Zoom feature
if (zoomBtn && mainImage) {

  zoomBtn.addEventListener("click", () => {

    zoomed = !zoomed;

    if (zoomed) {

      mainImage.style.transform = "scale(2)";
      mainImage.style.cursor = "zoom-out";

    } else {

      mainImage.style.transform = "scale(1)";
      mainImage.style.cursor = "zoom-in";

    }

  });

}

