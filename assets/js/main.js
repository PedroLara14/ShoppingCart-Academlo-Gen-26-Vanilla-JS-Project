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
        <i class='bx bx-plus' id='${product.id}'></i>
        <h3>
          $${product.price}.00
          <span class="product__info--stock">Stock: ${product.quantity}</span>
        </h3>
        <p class="showModalProduct">
          ${product.name}
        </p>
      </div>
    </div>
    `;
  }

  productsHTML.innerHTML = html;
}

async function main() {
  const db = {
    products:
      JSON.parse(window.localStorage.getItem("products")) ||
      (await getProducts()),
    cart: {},
  };

  printProducts(db);
}

main();
