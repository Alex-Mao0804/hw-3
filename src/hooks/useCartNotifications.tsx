import { useEffect, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
import CartStore from "@/stores/RootStore/CartStore";
const useCartNotifications = (
  cartProductsCount: CartStore["totalProducts"],
) => {
  const [cartProductsCountState, setCartProductsCountState] =
    useState(cartProductsCount);

  useEffect(() => {
    if (cartProductsCount > cartProductsCountState) {
      enqueueSnackbar("", {
        content: (key) => (
          <CustomSnackbar
            message="Product added to cart"
            variant="success"
            onClose={() => closeSnackbar(key)}
          />
        ),
      });
    } else if (
      cartProductsCount < cartProductsCountState &&
      cartProductsCount > 0
    ) {
      enqueueSnackbar("", {
        content: (key) => (
          <CustomSnackbar
            message="Product removed from cart"
            variant="remove"
            onClose={() => closeSnackbar(key)}
          />
        ),
      });
    } else if (cartProductsCount === 0 && cartProductsCountState > 0) {
      enqueueSnackbar("", {
        content: (key) => (
          <CustomSnackbar
            message="Cart cleared"
            variant="remove"
            onClose={() => closeSnackbar(key)}
          />
        ),
      });
    }

    setCartProductsCountState(cartProductsCount);
  }, [cartProductsCount, cartProductsCountState]);
};

export default useCartNotifications;
