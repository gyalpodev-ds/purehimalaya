let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");



menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".team-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,

    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

breakpoints: {
  0: {
    slidesPerView: 2,
  },

  640: {
    slidesPerView: 3,
  },

  990: {
    slidesPerView: 4,
  },

  1024: {
    slidesPerView: 4,
  },

  1400: {
    slidesPerView: 4,
  },
},
});

const animations = [
  { id: 'animation1', path: '../animations/step1.json' },
  { id: 'animation2', path: '../animations/step2.json' },
  { id: 'animation3', path: '../animations/step3.json' },
  { id: 'animation4', path: '../animations/step4.json' },
  { id: 'animation5', path: '../animations/medi.json' }
];

animations.forEach(anim => {
  lottie.loadAnimation({
    container: document.getElementById(anim.id),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: anim.path
  });
});

// order form start
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let message = "🛒 *I want to do some quary about PURE HIMALAYA HERBAL, Thank you!!!";

    // basic info 
    const name = document.querySelector("input[name='name']").value;
    const phone = document.querySelector("input[name='phone']").value;
    const email = document.querySelector("input[name='email']").value;
    const address = document.querySelector("input[name='address']").value;
    const note = document.querySelector("textarea[name='message']").value;

    message += `👤 Name: ${name}%0A`;
    message += `📞 Phone: ${phone}%0A`;
    message += `✉️ Email: ${email}%0A`;

    if (address.trim() !== "") {
        message += `📍 Address: ${address}%0A`;
    }

    message += "%0A";


    // note (optional)
    if (note.trim() !== "") {
        message += `%0A📝 Message: ${note}`;
    }

    message += "%0A%0A🙏 Please reply when possible.";

    const number = "9779704826186";
    const url = `https://wa.me/${number}?text=${message}`;

    window.open(url, "_blank");
});
// order form end


