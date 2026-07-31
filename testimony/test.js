const reviews = [
  {
    name: "Urgen",
    text:
      "<span>T</span>he masala tea was very rich in flavour. I recommend using on cold season, the cardamom helps very well " +
      "It feels refreshing yet calming, and got strong aroma of herbs. Overall, a flavorful and satisfying cup.",
  },
  {
    name: "Cai Ruifang",
    text:
      "<span>这</span>款熏香，气味好闻，具藏香特色" +
      "用于供佛很殊胜。打坐时燃上一支，那股清香驱散昏沉， " +
      "让人神识清明，安坐于尘嚣。平时用于净化空间也很不错 ",
  },
  {
    name: "Elena Rossi",
    text:
      "<span>I</span> Tried this incense powder and honestly, it feels very natural compared to the usual sticks. The smell is more earthy and herbal, not that strong artificial type. It’s especially nice during quiet time or meditation — the smoke is smooth and not irritating." +
      "<br><br>Suggestion: Maybe improve the packaging a bit and add a small guide, since beginners might not know how much to use.",
  },
  {
    name: "Lan Ge",
    text:
      "<span>I</span> tried Green Tara, Riwo Sangchö, and Zambala. All are gentle, smooth, and easy to enjoy. " +
      "Green Tara is light and soft, Riwo Sangchö is balanced and my favorite, and Zambala is richer with a unique character."+
      "Overall, they feel harmonious, not overpowering, and work well in any space.",
  },
    {
    name: "Sunying",
    text:
      "<span>这</span>款赞巴拉的香味稍微浓一些，略微有一点刺激感" +
      "不过绿度母和药师的香味就比较柔和，带一点甜味，整体闻起来很顺滑、舒服",
  },
  {
    name: "Meng. Xiao Chun",
    text:
      "<span>炷</span>藏香燃起，药沉，烟温， 纯厚，" +
      "回甘，能把藏域寺庙的梵音带到你的生命里",
  },
 
];

const cards = [...document.querySelectorAll(".reviewer-card")];
const quote = document.querySelector("#reviewText");
const visibleSlots = ["top", "middle", "bottom"];
let visibleStart = 0;
let timerId;

function applySlots() {
  cards.forEach((card) => {
    const cardIndex = Number(card.dataset.index);
    const offset = (cardIndex - visibleStart + reviews.length) % reviews.length;
    const slot = offset < visibleSlots.length ? visibleSlots[offset] : "hidden";

    card.dataset.slot = slot;
    card.setAttribute("aria-pressed", slot === "middle" ? "true" : "false");
  });
}

function updateQuote() {
  const activeIndex = (visibleStart + 1) % reviews.length;

  quote.classList.add("is-changing");
  window.setTimeout(() => {
    quote.innerHTML = reviews[activeIndex].text;
    quote.classList.remove("is-changing");
  }, 220);
}

function rotate(nextStart = (visibleStart + 1) % reviews.length) {
  visibleStart = nextStart;
  applySlots();
  updateQuote();
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const clickedIndex = Number(card.dataset.index);
    rotate((clickedIndex - 1 + reviews.length) % reviews.length);
    restartTimer();
  });
});

function restartTimer() {
  window.clearInterval(timerId);
  timerId = window.setInterval(() => rotate(), 8000);
}

applySlots();
restartTimer();


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