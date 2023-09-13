import cartIsEmpty from "../assets/img/cart-is-empty.png";
import trashIcon from "../assets/img/trash.svg";
import { thunderCart } from "../thunders/cart";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useKillua } from "killua";

export default function ModalYourCart() {
  const {
    thunder: thunderCartState,
    setThunder: thunderCartSetState,
    selectors: thunderCartSelectors,
    reducers: thunderCartReducers,
  } = useKillua(thunderCart);

  // open and close modal cart
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="relative">
        <p className="text-white absolute z-20 -right-2.5 -top-2.5 border border-black text-sm font-semibold bg-success w-[28px] h-[28px] flex justify-center items-center rounded-full">
          {thunderCartState.length}
        </p>
        <Button
          onPress={onOpen}
          size="lg"
          color="success"
          radius="sm"
          className="font-semibold"
        >
          Your cart
        </Button>
      </div>
      <Modal
        backdrop="blur"
        className="text-white dark w-[340px] fixed top-1/2 -translate-y-1/2 sm:w-[400px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                Your cart
              </ModalHeader>
              <ModalBody>
                {thunderCartSelectors.cartIsEmpty() ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <img src={cartIsEmpty} width={200} alt="cart is empty" />
                    <p className="text-xl font-medium">cart is empty!</p>
                  </div>
                ) : (
                  <div>
                    <ul className="flex flex-col gap-3 mt-1 pr-2 mb-5 max-h-[349px] overflow-y-auto custom-scrollbar">
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
