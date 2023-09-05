import React from "react";

export default function Shoping_Cart({ handleCloseCart, loadData }) {
  // Hàm đóng Cart
  const handleClose = () => {
    handleCloseCart();
  };

  // Lấy dữ liệu giỏ hàng trên local
  const carts = JSON.parse(localStorage.getItem("carts")) || [];

  // Xóa sản phẩm trong Cart
  const handleDelete = (id) => {
    const updateCart = carts.filter((st) => st.id !== id);
    localStorage.setItem("carts", JSON.stringify(updateCart));
    loadData(updateCart);
  };

  const priceCart = (product) => {
    // Chuyển giá tiền từ chuỗi sang số và bỏ ký tự "$"
    const price = parseFloat(product.price.replace("$", ""));

    // Tính tổng tiền cho sản phẩm
    return price * product.quantity;
  };

  const totalPrice = (cart) => {
    let total = 0;

    // Lặp qua danh sách sản phẩm trong giỏ hàng
    for (let product of cart) {
      const price = parseFloat(product.price.replace("$", ""));
      total += price * product.quantity;
    }
    return total;
  };

  // Tính tổng số tiền của tất cả các sản phẩm trong giỏ hàng
  const total = totalPrice(carts);
  // console.log(total);

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          {/* <span className="absolute -inset-0.5" /> */}
                          {/* <span className="sr-only">Close panel</span> */}
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {carts.map((carts) => (
                            <li className="flex py-6" key={carts.id}>
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={carts.imageSrc}
                                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href="#">{carts.name}</a>
                                    </h3>
                                    <p className="ml-4">${priceCart(carts)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Quantity: {carts.quantity}
                                  </p>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => handleDelete(carts.id)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}

                          {/* More products... */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${total}</p>
                    </div>

                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
