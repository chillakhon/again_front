export const getFilterParams = () => {
    const route = useRoute();
    const accessParams = [
        'search',
        'category_id',
        'page',
        'price_after',
        'price_before'
    ];

    let params = {};

    for ( const key in route.query  ) {
        if ( ! accessParams.includes( key ) ) {
            continue;
        }

        params[ key ] = route.query[key];
    }

    return params;
}