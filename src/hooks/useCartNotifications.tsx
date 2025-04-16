import { useEffect, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CustomSnackbar from "@/components/CustomSnackbar/CustomSnackbar";
import CartStore from "@/stores/RootStore/CartStore";
const useCartNotifications = (cartProductsCount: CartStore["totalProducts"]) => {
	const [cartProductsCountState, setCartProductsCountState] = useState(cartProductsCount);

	useEffect(() => {
		if (cartProductsCount > cartProductsCountState) {
			enqueueSnackbar('', {
				content: (key) => (
					<CustomSnackbar
						message='Товар добавлен в корзину'
						variant='success'
						onClose={() => closeSnackbar(key)}
					/>
				),
			});
		} else if (cartProductsCount < cartProductsCountState && cartProductsCount > 0) {
			enqueueSnackbar('', {
				content: (key) => (
					<CustomSnackbar
						message='Товар удален из корзины'
						variant='remove'
						onClose={() => closeSnackbar(key)}
					/>
				),
			});
		} else if (cartProductsCount === 0 && cartProductsCountState > 0) {
			enqueueSnackbar('', {
				content: (key) => (
					<CustomSnackbar
						message='Корзина очищена'
						variant='remove'
						onClose={() => closeSnackbar(key)}
					/>
				),
			});
		}

		setCartProductsCountState(cartProductsCount);
	}, [cartProductsCount]);
};

export default useCartNotifications;
