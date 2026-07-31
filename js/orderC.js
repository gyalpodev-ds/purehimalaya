const products = [
  {
    name: "冥想香",
    price: 3.5,
    img: "../images/fp/brown.png",
  },
  {
    name: "药师佛香",
    price: 3,
    img: "../images/fp/blue.png",
  },
  {
    name: "赞巴拉香",
    price: 3.5,
    img: "../images/fp/orange.png",
  },
  {
    name: "日沃桑却香",
    price: 3.5,
    img: "../images/fp/red.png",
  },
  {
    name: "绿度母香 ",
    price: 3.5,
    img: "../images/fp/green.png",
  },
  {
    name: "玛萨拉茶",
    price: 6,
    img: "../images/fp/tea.JPG",
  },
  {
    name: "高级香粉",
    price: 4.5,
    img: "../images/others/powder_front.jpeg",
  },
  {
    name: "普通香粉",
    price: 2,
    img: "../images/others/rega.png",
  },
  // {
  //     name:"Himalayan Salt",
  //     price:2,
  //     img:"../images/fp/salt.png"
  // },
  // {
  //     name:"Turmeric Powder",
  //     price:1.5,
  //     img:"../images/fp/tumeric.png"
  // }
];

let selectedQty = 1;
let cart = {};

const select = document.getElementById("productSelect");

products.forEach((product) => {
  select.innerHTML += `
    <option value="${product.name}">
        ${product.name}
    </option>`;
});

function updatePrice() {
  const selected = products.find((p) => p.name === select.value);

  document.getElementById("priceDisplay").innerText = selected
    ? `$ ${selected.price}`
    : "$ 0";

  // Reset quantity when product changes
  selectedQty = 1;
  document.getElementById("qty").innerText = selectedQty;
}

function changeQty(change) {
  selectedQty += change;

  if (selectedQty < 1) {
    selectedQty = 1;
  }

  document.getElementById("qty").innerText = selectedQty;
}

function addProduct() {
  const name = select.value;

  if (!name) {
    alert("Select a product");
    return;
  }

  const product = products.find((p) => p.name === name);

  if (cart[name]) {
    cart[name].qty += selectedQty;
  } else {
    cart[name] = {
      ...product,
      qty: selectedQty,
    };
  }

  renderOrder();
}

function changeCartQty(name, change) {
  cart[name].qty += change;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  renderOrder();
}

function deleteItem(name) {
  delete cart[name];
  renderOrder();
}

function renderOrder() {
  const orderList = document.getElementById("orderList");

  orderList.innerHTML = "";

  let totalItems = 0;
  let grandTotal = 0;

  for (let item in cart) {
    const p = cart[item];

    totalItems += p.qty;
    grandTotal += p.qty * p.price;

    orderList.innerHTML += `
        <div class="order-item">

            <div class="order-left">
                <img src="${p.img}">
                <div class="item-name">
                    ${p.name}
                </div>
            </div>

            <div class="order-right">

                <div class="small-qty">
                    <button onclick="changeCartQty('${p.name}',-1)">−</button>
                    <span>${p.qty}</span>
                    <button onclick="changeCartQty('${p.name}',1)">+</button>
                </div>

                <div class="amount">
                    $ ${p.qty * p.price}
                </div>

                <button class="delete-btn"
                    onclick="deleteItem('${p.name}')">
                    🗑
                </button>

            </div>

        </div>
        `;
  }

  document.getElementById("totalItems").innerText = totalItems;

  document.getElementById("grandTotal").innerText = `$ ${grandTotal}`;
}

function sendWhatsApp() {
  const name = document.getElementById("customerName").value.trim();
  const countryCode = document.getElementById("countryCode").value;
  const phoneInput = document.getElementById("customerPhone").value.trim();

  if (!name) {
    alert("请输入您的姓名");
    return;
  }

  if (!phoneInput) {
    alert("请输入您的电话号码");
    return;
  }

  if (Object.keys(cart).length === 0) {
    alert("您的购物车是空的");
    return;
  }

  let total = 0;
  let totalItems = 0;

  let message = "*订单详情*%0A%0A";

  message += `姓名: ${name}%0A`;
  message += `电话: ${countryCode} ${phoneInput}%0A%0A`;

  message += "```%0A"; // start code block

  message += "商品            |数量| |金额|%0A";
  message += "---------------------------%0A";

  for (let item in cart) {
    const p = cart[item];

    let lineTotal = p.qty * p.price;

    // FIXED WIDTH ALIGNMENT
    let itemName = p.name.padEnd(16, " ");
    let qty = String(p.qty).padEnd(4, " ");

    message += `${itemName}${qty}${lineTotal}%0A`;

    total += lineTotal;
    totalItems += p.qty;
  }

  message += "---------------------------%0A";
  message += `总件数: ${totalItems}%0A`;
  message += `总金额 : $ ${total}%0A`;

  message += "```"; // end code block

  const phone = "9779704826186";

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
