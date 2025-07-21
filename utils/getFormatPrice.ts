export const getFormatPrice = () => {
    const formattedPrice = ( price: number ) => {
        return price;
    }

    const getNormalPrice = ( price: number, oldPrice?: number ) => {
        return oldPrice ? oldPrice : price;
    }

    return {
        formattedPrice,
        getNormalPrice
    }
}