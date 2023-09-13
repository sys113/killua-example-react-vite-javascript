'use client';

import { Button } from '@nextui-org/react';
import { useKillua } from 'killua';
import cartIsEmpty from '../assets/img/cart-is-empty.png';
import trashIcon from '../assets/img/trash.svg';
import { thunderCart } from '../thunders/cart';

export default function ModalYourCart({ ...props }) {
  const {
    thunder: thunderCartState,
    setThunder: thunderCartSetState,
    selectors: thunderCartSelectors,
    reducers: thunderCartReducers,
  } = useKillua(thunderCart);

  return (
    <div
      className={`duration-400 fixed left-0 right-0 top-0 bottom-0 z-[60] flex h-screen w-screen items-center justify-center backdrop-blur-[2px] transition-all ${props.isOpenModal ? 'visible bg-black/50' : 'invisible opacity-0'
        }`}
    >
      <div
        className={`flex w-full items-center justify-center transition-all duration-300 ${props.isOpenModal
          ? 'scale-1 visible opacity-100'
          : 'invisible scale-75 lg:opacity-0'
          }`}
      >
        <div
          onClick={() => props.setIsOpenModal(false)}
          className="fixed left-0 right-0 top-0 bottom-0"
        ></div>
        <div
          className={`relative text-white flex w-[350px] rounded-xl bg-black px-3 py-2 sm:w-[450px] lg:w-auto`}
        >
          <div className="w-full lg:w-[400px]">
            {/* head */}
            <div className="flex items-center justify-between border-b border-[#d4d4d4]">
              {/* title */}
              <p className="pt-1 pb-2 text-lg font-semibold">
                Your cart
              </p>
              {/* close btn */}
              <button
                onClick={() => props.setIsOpenModal(false)}
                className="mt-1 mb-2 rounded-full border border-white p-1.5 transition-all duration-200 lg:p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  fill="none"
                  viewBox="0 0 11 11"
                >
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M1 10l9-9M1 1l9 9"
                  ></path>
                </svg>
              </button>
            </div>
            {/* body */}
            {thunderCartSelectors.cartIsEmpty() ? (
              <div className="flex flex-col items-center gap-4 pb-4 pt-8">
                <img src={cartIsEmpty} width={200} alt="cart is empty" />
                <p className="text-xl font-medium">cart is empty!</p>
              </div>
            ) : (
              <div>
                <ul className="flex flex-col gap-3 my-4 pr-2 max-h-[349px] overflow-y-auto custom-scrollbar">
                  {thunderCartState.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          className="bg-gray-500 rounded-lg"
                          src={item.img}
                          width={60}
                          height={60}
                          alt={item.title}
                        />
                        <div>
                          <p className="text-lg font-medium">
                            {item.title}
                          </p>
                          <p className="text-default-600">${item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          thunderCartReducers.removeFromCart(item.id)
                        }
                      >
                        <img
                          src={trashIcon}
                          alt="trash icon"
                          width={23}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="pb-2 pt-4 flex gap-4 border-t">
                  <div className="w-fit">
                    <p className="text-md whitespace-nowrap">
                      Total price: ${thunderCartSelectors.totalCartPrice()}
                    </p>
                    <p className="text-md whitespace-nowrap">
                      Total items: {thunderCartState.length}
                    </p>
                  </div>
                  <Button
                    onPress={() => thunderCartSetState([])}
                    color="danger"
                    radius="sm"
                    className="font-semibold w-full h-12"
                  >
                    Clear cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
