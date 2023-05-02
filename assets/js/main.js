async function getProducts() {
  try {
    const data = await fetch(
      "https://ecommercebackend.fundamentos-29.repl.co/"
    );

    const res = await data.json();

    window.localStorage.setItem("products", JSON.stringify(res));

    return res;
  } catch (error) {
    console.log(error);
  }
}

function printProducts(db) {
  const productsHTML = document.querySelector(".products");

  let html = "";
  for (const product of db.products) {
    html += `
    <div class="product">

      <div class="product__img">
        <img src="${product.image}" alt="imagen" />
      </div>

      <div class="product__info">
        <h3>${product.name} <span> <b>Stock</b>: ${product.quantity}</span> </h3>
        <h4>
          ${product.price}
          <i class='bx bx-plus' id='${product.id}'></i>   
        </h4>
      </div>
    </div>
    `;
  }

  productsHTML.innerHTML = html;
}

function handleShowCart() {
  const openCartIconHTML = document.querySelector(".bx-shopping-bag")
  const cartHTML = document.querySelector(".contentCart");

  openCartIconHTML.addEventListener("click", function () {
    cartHTML.classList.add("contentCart_show");
  });

}

function handleCloseCart() {
  const closeIconCartHTML = document.querySelector(".bx-x");
  const cartHTML = document.querySelector(".contentCart");

  closeIconCartHTML.addEventListener("click", function () {
    cartHTML.classList.remove("contentCart_show");
  });

}

async function main() {
  const db = {
    products:
      JSON.parse(window.localStorage.getItem("products")) ||
      (await getProducts()),
    cart: {},
  };

  printProducts(db);
  handleShowCart();
  handleCloseCart(); 

  const productsHTML = document.querySelector(".products");

  productsHTML.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-plus")) {
      const id = Number(e.target.id);

      const productFind = db.products.find(product => product.id === id);

      if (db.cart[productFind.id]) {
        if (productFind.quantity === db.cart[productFind.id].amount) {
          return alert("No tenemos mas en bodega");
        }  
        db.cart[productFind.id].amount++;
      } else {
        db.cart[productFind.id] = {...productFind, amount: 1};
      }
    }
  })
}

main();
