import {defineStore, skipHydrate} from 'pinia';
import {hydrate} from "vue";
import {getFormatPrice} from "~/utils/getFormatPrice.js";

export const useCartStore = defineStore('cartStore', () => {
    const quantity = ref( 0 );
    const subtotal = ref( 0 );
    const total = ref( 0 );
    const sale = ref( 0 );
    const cart = useLocalStorage('cart', []);

    const init = () =>{
        countInCart();
        countCartTotal();
    }

    // const init = computed( () => {
    //     countInCart();
    //     countCartTotal();
    // } );

    const addToCart = async (product, quantity = 1, variant = null, color = null) => {
        // if ( auth.isAuthenticated ) {
        //     const { data: addToCart } = await useApi('/cart-items/add-to-cart', {
        //         body: {product_id: product.id,
        //             product_variant_id: variantId,
        //             color_id: colorId,
        //             price: product.price,
        //             qty: quantity
        //         }
        //     }, '', 'POST');
        //
        //     // TODO: Добавить логику ошибок
        // }

        // const item = cart.value.find((item) => item.id === product.id);
        // if (item) {
        //     if (item.quantity) {
        //         item.quantity += quantity;
        //     }
        // } else {
        //     cart.value.push({...product, quantity: quantity})
        // }

        // For simple product
        let item = cart.value.find((item) => item.id === product.id);
        if ( variant && color ){
            item = cart.value.find((item) => {
                return item.id === product.id
                && item.product_variant_id === variant.product_variant_id
                && item.color_id === color.id;
            } );
        } else {
            if ( variant ) {
                item = cart.value.find((item) => item.id === product.product_variant_id);
            }

            if ( color ) {
                item = cart.value.find((item) => item.id === product.product_variant_id);
            }
        }

        if ( item ){
            if (item.quantity) {
                item.quantity += quantity;
            }
        } else {
            cart.value.push( {...product,
                item_key: crypto.randomUUID(),
                quantity: quantity,
                color_id: color.id,
                product_variant_id: variant.product_variant_id,
                selected_color: color,
                selected_variant: variant
            } );
        }

        countCartTotal();
        countInCart();
    }

    const removeFromCart = async ( itemKey ) => {
        // if (auth.isAuthenticated) {
        //     const { data} = await useApi('/cart-items/remove-item', {
        //         body: {
        //             product_id: productId,
        //             product_variant_id: variantId
        //         }
        //     }, '', 'DELETE');
        //
        //     // TODO: Добавить логику ошибок
        // }

        const item = cart.value.find((item) => item.item_key === itemKey);

        if (item) {
            cart.value = cart.value.filter((item) => item.item_key !== itemKey)

            countInCart();
            countCartTotal();
        }
    }

    const getItemQuantity = ( itemKey ) => {
        const item = cart.value.find((item) => item.item_key === itemKey);
        return item?.quantity
    }

    const countInCart = () => {
        quantity.value = 0;

        cart.value.forEach( ( item ) => {
            quantity.value += item.quantity ? item.quantity : 1;
        } );
    }

    const countCartTotal = () => {
        total.value = 0;

        cart.value.forEach( ( item ) => {
            const quantity = item.quantity ? item.quantity : 1;
            const price = getFormatPrice().getNormalPrice( item.price, item.old_price );

            total.value += quantity * price;
        } );
    }

    // const countCartSubtotal = () => {
    //     subtotal.value = 0;
    //     cart.value.forEach( ( item ) => {
    //         const quantity = item.quantity ? item.quantity : 1;
    //         const price = item.price;
    //
    //         subtotal.value += quantity * price;
    //     })
    // }

    const setCartQuantity = ( itemKey, quantity ) => {
        const item = cart.value.find((item) => item.item_key === itemKey);
        if ( item ){
            item.quantity = quantity;

            countInCart();
            countCartTotal();
        }
    }

    const getCartForCheckout = () => {
        const items = [];
        cart.value.forEach( ( item ) => {
            items.push( {
                product_id: item.id,
                product_variant_id: item.product_variant_id,
                color_id: item.color_id,
                quantity: item.quantity,
                price: item.price
            } )
        } );

        return items;
    }

    const setEmptyCart = async () => {
        //const { data} = await useApi('/cart-items/cancel', {}, '', 'DELETE');

        cart.value = [];
        quantity.value = 0;
        subtotal.value = 0;
        total.value = 0;
        sale.value = 0;
    }

    return {
        cart: skipHydrate( cart ),
        addToCart,
        removeFromCart,
        getItemQuantity,
        setCartQuantity,
        init,
        getCartForCheckout,
        setEmptyCart,
        quantity,
        subtotal,
        total,
        sale
    }
} )