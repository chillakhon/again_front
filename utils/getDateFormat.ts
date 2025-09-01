export const getDateFormat = () => {
    const formattedDate = ( date: string ) => {
        const parsedDate = new Date( date );
        return parsedDate.toLocaleString( 'ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        } );
    }

    return {
        formattedDate
    }
}