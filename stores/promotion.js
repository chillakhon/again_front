import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePromotionStore = defineStore('promotionStore', () => {
    // ========================================
    // STATE
    // ========================================

    // Текущая применимая акция (самая приоритетная)
    const activePromotion = ref(null);

    // Все применимые акции
    const applicablePromotions = ref([]);

    // Выбранный подарок (product из gift_products)
    const selectedGift = ref(null);

    // Выбор пользователя: 'gift' или 'discount'
    const userChoice = ref('gift');

    // Флаг загрузки
    const isLoading = ref(false);

    // Сообщение для пользователя
    const message = ref('');
    const messageClass = ref('');

    // ========================================
    // COMPUTED
    // ========================================

    // Есть ли активная акция
    const hasPromotion = computed(() => !!activePromotion.value);

    // Разрешены ли промокоды с этой акцией
    const allowPromoCodes = computed(() => {
        if (!activePromotion.value) return true;
        return !!activePromotion.value.allow_promo_codes;
    });

    // Список подарков из акции
    const giftProducts = computed(() => {
        if (!activePromotion.value) return [];
        return activePromotion.value.gift_products || [];
    });

    // Пользователь выбрал скидку/промокод вместо подарка
    const useDiscountInstead = computed(() => {
        return userChoice.value === 'discount';
    });

    // ========================================
    // ACTIONS
    // ========================================

    /**
     * Проверить применимые акции для текущей корзины
     */
    const checkApplicable = async (cartItems, cartTotal) => {
        if (!cartItems || cartItems.length === 0) {
            reset();
            return;
        }

        isLoading.value = true;

        try {
            const items = cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity ?? 1,
                price: item.selected_variant?.price ?? item.price,
            }));

            const { data, error } = await useApi('/public/promotions/check-applicable', {
                body: { items, total: cartTotal },
            }, '', 'POST');

            if (error.value) {
                console.error('Promotion check error:', error.value);
                reset();
                return;
            }

            if (data.value?.success && data.value.data?.length > 0) {
                applicablePromotions.value = data.value.data;
                // Берём самую приоритетную (первую, т.к. бек сортирует по priority desc)
                activePromotion.value = data.value.data[0];

                // Автоматически выбираем первый подарок
                if (activePromotion.value.gift_products?.length > 0) {
                    selectedGift.value = activePromotion.value.gift_products[0];
                }

                // Если промокоды не разрешены — принудительно выбираем подарок
                if (!activePromotion.value.allow_promo_codes) {
                    userChoice.value = 'gift';
                }

                message.value = '';
                messageClass.value = '';
            } else {
                reset();
            }
        } catch (err) {
            console.error('Promotion check failed:', err);
            reset();
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Выбрать подарок
     */
    const selectGift = (gift) => {
        selectedGift.value = gift;
        userChoice.value = 'gift';
    };

    /**
     * Выбрать скидку/промокод вместо подарка
     */
    const selectDiscount = () => {
        if (!allowPromoCodes.value) {
            message.value = 'Промокоды и скидки недоступны с этой акцией';
            messageClass.value = 'warning';
            return;
        }
        userChoice.value = 'discount';
        selectedGift.value = null;
    };

    /**
     * Получить данные для отправки в заказ
     */
    const getDataForOrder = () => {
        if (!activePromotion.value) return {};

        const data = {
            promotion_id: activePromotion.value.id,
            use_discount_instead: useDiscountInstead.value,
        };

        if (!useDiscountInstead.value && selectedGift.value) {
            data.gift_product_id = selectedGift.value.id;
        }

        return data;
    };

    /**
     * Сброс состояния
     */
    const reset = () => {
        activePromotion.value = null;
        applicablePromotions.value = [];
        selectedGift.value = null;
        userChoice.value = 'gift';
        message.value = '';
        messageClass.value = '';
    };

    return {
        // State
        activePromotion,
        applicablePromotions,
        selectedGift,
        userChoice,
        isLoading,
        message,
        messageClass,

        // Computed
        hasPromotion,
        allowPromoCodes,
        giftProducts,
        useDiscountInstead,

        // Actions
        checkApplicable,
        selectGift,
        selectDiscount,
        getDataForOrder,
        reset,
    };
});
