import {defineStore, skipHydrate} from 'pinia';
import {v4 as uuidv4} from 'uuid';

export const useCartStore = defineStore('cartStore', () => {
    const quantity = ref(0);
    const subtotal = ref(0);
    const total = ref(0);
    const sale = ref(0);
    const cart = useLocalStorage('cart', []);

    // Данные промокода
    const promoCode = ref('');
    const promoData = ref(null);
    const promoMessage = ref('');
    const promoClass = ref('');
    const promoType = ref('');
    const promoDiscount = ref(0); // Скидка только от промокода
    const regularDiscount = ref(0); // Скидка только от товаров

    const init = () => {
        countInCart();
        countCartTotal();
    }

    const addToCart = async (product, quantity = 1, variant = null, color = null) => {
        let item = cart.value.find((item) => item.id === product.id);
        if (variant && color) {
            item = cart.value.find((item) => {
                return item.id === product.id
                    && item.product_variant_id === variant.id
                    && item.color_id === color.id;
            });
        } else {
            if (variant) {
                item = cart.value.find((item) => item.id === product.product_variant_id);
            }

            if (color) {
                item = cart.value.find((item) => item.id === product.product_variant_id);
            }
        }

        if (item) {
            if (item.quantity) {
                item.quantity += quantity;
            }
        } else {
            cart.value.push({
                ...product,
                item_key: uuidv4(),
                quantity: quantity,
                color_id: color ? color.id : null,
                product_variant_id: variant ? variant.id : null,
                selected_color: color,
                selected_variant: variant
            });
        }

        countCartTotal();
        countInCart();
    }

    const removeFromCart = async (itemKey) => {
        const item = cart.value.find((item) => item.item_key === itemKey);

        if (item) {
            cart.value = cart.value.filter((item) => item.item_key !== itemKey)

            countInCart();
            countCartTotal();
        }
    }

    const getItemQuantity = (itemKey) => {
        const item = cart.value.find((item) => item.item_key === itemKey);
        return item?.quantity
    }

    const countInCart = () => {
        quantity.value = 0;

        cart.value.forEach((item) => {
            quantity.value += item.quantity ? item.quantity : 1;
        });
    }

    const countCartTotal = () => {
        total.value = 0;
        subtotal.value = 0;
        sale.value = 0;
        promoDiscount.value = 0;
        regularDiscount.value = 0;

        cart.value.forEach((item) => {
            const qty = item.quantity ?? 1;

            // Если есть данные с промокодом, используем их
            if (item.promo_code_applied && item.final_price) {

                const finalPrice = parseFloat(item.final_price);
                const originalPrice = parseFloat(item.original_price || item.old_price || item.price);
                const priceAfterDiscount = parseFloat(item.price_after_discount || item.price);

                total.value += qty * finalPrice;
                subtotal.value += qty * originalPrice;

                // Считаем скидку от товара (до промокода)
                const itemRegularDiscount = originalPrice - priceAfterDiscount;
                regularDiscount.value += qty * itemRegularDiscount;

                // Считаем скидку от промокода
                const itemPromoDiscount = item.savings?.promo_savings || 0;
                promoDiscount.value += qty * itemPromoDiscount;

                // Общая скидка
                sale.value += qty * (originalPrice - finalPrice);
            } else {

                // Обычный расчет без промокода
                const unitPrice = parseFloat(item.price ?? 0);
                const unitOldPrice = item.old_price ? parseFloat(item.old_price) : unitPrice;


                total.value += qty * unitPrice;
                subtotal.value += qty * unitOldPrice;

                const itemDiscount = unitOldPrice - unitPrice;
                regularDiscount.value += qty * itemDiscount;
                sale.value += qty * itemDiscount;
            }
        });

        if (total.value < 0) total.value = 0;
        if (sale.value < 0) sale.value = 0;
        if (promoDiscount.value < 0) promoDiscount.value = 0;
        if (regularDiscount.value < 0) regularDiscount.value = 0;
    }

    const countCartPromocode = (code, type, amount) => {
        if (type === 'percentage') {
            subtotal.value = total.value;
            sale.value = (total.value * (parseFloat(amount) / 100));
            total.value = total.value - sale.value;
        }

        if (type === 'fixed') {
            subtotal.value = total.value;
            sale.value = parseFloat(amount);
            total.value = total.value - parseFloat(amount);
        }

        promoCode.value = code;
    }

    const setCartQuantity = (itemKey, quantity) => {
        const item = cart.value.find((item) => item.item_key === itemKey);
        if (item) {
            item.quantity = quantity;

            countInCart();
            countCartTotal();
        }
    }

    const getCartForCheckout = () => {
        const items = [];
        cart.value.forEach((item) => {
            items.push({
                product_id: item.id,
                product_variant_id: item.product_variant_id,
                color_id: item.color_id,
                quantity: item.quantity,
                price: item.final_price || item.price // Используем финальную цену с промокодом
            })
        });

        return items;
    }

    const setEmptyCart = async () => {
        cart.value = [];
        quantity.value = 0;
        subtotal.value = 0;
        total.value = 0;
        sale.value = 0;
        promoDiscount.value = 0;
        regularDiscount.value = 0;

        // Очищаем промокод
        promoCode.value = '';
        promoData.value = null;
        promoMessage.value = '';
        promoClass.value = '';
        promoType.value = '';

        localStorage.removeItem('promoCode')
    }

    const applyPromoToCart = (responseData) => {
        const {promo_code, applicable_products, not_applicable_products, message} = responseData;

        if (!promo_code || !applicable_products) {
            console.error('Invalid promo data');
            return false;
        }

        promoCode.value = promo_code.code;
        promoData.value = promo_code;


        switch (promo_code.discount_behavior) {
            case 'replace':
                promoMessage.value = 'Промокод заменяет текущие скидки на товарах';
                break;
            case 'stack':
                promoMessage.value = 'Промокод суммируется с другими скидками';
                break;
            case 'skip':
                promoMessage.value = 'Промокод не применяется к товарам, уже участвующим в акциях';
                break;
            default:
                promoMessage.value = message || 'Промокод применен';
        }

        // promoMessage.value =  message;

        // Определяем тип сообщения
        if (not_applicable_products && not_applicable_products.length > 0) {
            promoType.value = 'warning';
            promoClass.value = 'warning';
        } else {
            localStorage.setItem('promoCode', promoCode.value);
            promoType.value = 'success';
            promoClass.value = 'success';
        }

        // Обновляем товары в корзине
        let appliedCount = 0;
        let notAppliedCount = 0;

        cart.value.forEach((item) => {
            // Ищем этот товар в applicable_products
            const foundApplicable = applicable_products.find(
                (product) =>
                    (product.product_id === item.id && !product.variant_id && !item.product_variant_id) ||
                    (product.product_id === item.id && product.variant_id === item.product_variant_id) ||
                    (product.product_id === item.id && product.variant_id === item.selected_variant?.id)
            );


            if (foundApplicable) {
                // Применяем данные с промокодом
                item.price = parseFloat(foundApplicable.final_price);
                item.final_price = parseFloat(foundApplicable.final_price);
                item.original_price = parseFloat(foundApplicable.original_price);
                item.old_price = parseFloat(foundApplicable.old_price || foundApplicable.original_price);
                item.price_after_discount = parseFloat(foundApplicable.price_after_discount);
                item.savings = foundApplicable.savings;
                item.promo_code_info = foundApplicable.promo_code_info;
                item.promo_code_applied = foundApplicable.promo_code_applied;
                item.discount = foundApplicable.discount;
                appliedCount++;
            } else {
                // Ищем в not_applicable_products
                const foundNotApplicable = not_applicable_products?.find(
                    (product) =>
                        (product.product_id === item.id && !product.variant_id && !item.product_variant_id) ||
                        (product.product_id === item.id && product.variant_id === item.product_variant_id) ||
                        (product.product_id === item.id && product.variant_id === item.selected_variant?.id)
                );

                if (foundNotApplicable) {
                    // Обновляем данные без промокода
                    item.final_price = parseFloat(foundNotApplicable.final_price);
                    item.original_price = parseFloat(foundNotApplicable.original_price);
                    item.old_price = parseFloat(foundNotApplicable.old_price || foundNotApplicable.original_price);
                    item.price_after_discount = parseFloat(foundNotApplicable.price_after_discount);
                    item.savings = foundNotApplicable.savings;
                    item.promo_code_applied = false;
                    item.promo_code_info = null;
                    item.discount = foundNotApplicable.discount;
                    notAppliedCount++;
                }
            }
        });

        countCartTotal();

        return true;
    };

    /**
     * Удалить промокод из корзины
     */
    const removePromoFromCart = () => {
        // Очищаем данные промокода из товаров

        localStorage.removeItem('promoCode');

        cart.value.forEach((item) => {
            if (item.promo_code_applied) {
                // Возвращаем цену после скидки товара (без промокода)
                item.final_price = item.price_after_discount || item.price;
                item.price = item.price_after_discount || item.price;
                delete item.promo_code_info;
                delete item.promo_code_applied;
                delete item.savings;
            }
        });

        // Очищаем данные промокода
        promoCode.value = '';
        promoData.value = null;
        promoMessage.value = '';
        promoClass.value = '';
        promoType.value = '';

        // Пересчитываем
        countCartTotal();
    };

    /**
     * Получить информацию о товаре (для отображения)
     */
    const getItemInfo = (item) => {
        return {
            hasPromo: item.promo_code_applied || false,
            hasDiscount: item.discount?.has_discount || false,
            finalPrice: item.final_price || item.price,
            originalPrice: item.original_price || item.old_price || item.price,
            savings: item.savings || null,
            promoInfo: item.promo_code_info || null
        };
    };

    return {
        cart: skipHydrate(cart),
        addToCart,
        removeFromCart,
        getItemQuantity,
        setCartQuantity,
        init,
        getCartForCheckout,
        setEmptyCart,
        countCartPromocode,
        applyPromoToCart,
        removePromoFromCart,
        getItemInfo,
        quantity,
        subtotal,
        total,
        sale,
        promoCode,
        promoData,
        promoClass,
        promoMessage,
        promoType,
        promoDiscount,
        regularDiscount
    }
})