export interface Countries {
    success: boolean,
    countries: Country[]
}

export interface Country {
    id: number,
    name: string,
    code: string
}

export interface Cities {
    success: boolean,
    cities: Country[]
}

export interface City {
    id: number,
    name: string,
    region_id: number
}
