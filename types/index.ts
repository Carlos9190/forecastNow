export type Search = {
    city: string
    country: string
}

export type ConsultResult = {
    main: {
        temp: number
        temp_min: number
        temp_max: number
    }
    name: string
    weather: [
        {
            icon: string
        }
    ]
}