export const getFormatPrice = () => {
    const formattedPrice = ( price: number ) => {
        return price.toLocaleString();
    }

    const getNormalPrice = ( price: number, oldPrice?: number ) => {
        //return oldPrice ? formattedPrice( oldPrice ) : formattedPrice( price );
        return formattedPrice( price );
    }

    return {
        formattedPrice,
        getNormalPrice
    }
}