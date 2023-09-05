import React, { useState } from "react";
import Shoping_Cart from "./Shoping_Cart";

const products = [
  {
    id: 1,
    name: "Black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "White",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$20",
    color: "Black",
  },
  {
    id: 3,
    name: "Red",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$30",
    color: "Black",
  },
  {
    id: 4,
    name: "Blue",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$45",
    color: "Black",
  },
];

export default function Product_List() {
  const [carts, setCarts] = useState(() => {
    const cartLocal = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocal;
  });

  const [showCart, setShowCart] = useState(false);

  // Hàm hiện Cart
  const handleShowCart = () => {
    setShowCart(true);
  };

  // Hàm đóng Cart
  const handleCloseCart = () => {
    setShowCart(false);
  };

  const addItemToCart = (id) => {
    // Tìm sản phẩm theo id
    const findIndex = products.find((st) => st.id === id);
    // console.log(findIndex);
    if (!findIndex) {
      // Nếu không tìm thấy sản phẩm, không thực hiện gì cả
      return;
    }
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const checkCartItem = carts.find((item) => item.id === id);
    // console.log(checkCartItem);
    if (checkCartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      checkCartItem.quantity += 1;

      localStorage.setItem("carts", JSON.stringify(carts));
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng
      const newCartItem = {
        ...findIndex,
        quantity: 1,
      };
      const newCart = [...carts, newCartItem];
      setCarts(newCart);
      // Lưu giỏ hàng vào local
      localStorage.setItem("carts", JSON.stringify(newCart));
    }
  };

  // Xóa sản phẩm trong giỏ hàng
  const loadData = (item) => {
    setCarts(item);
  };

  return (
    <>
      {showCart ? (
        <Shoping_Cart handleCloseCart={handleCloseCart} loadData={loadData} />
      ) : (
        <></>
      )}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="head">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h2>
            <button onClick={handleShowCart}>
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                <button
                  className="btn_addToCart"
                  onClick={() => addItemToCart(product.id)}
                >
                  Add to card
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
