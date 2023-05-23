
interface Configuration {
    PORT: number | string,
    ORIGIN: string
}

export const Configuration: Configuration = {
    PORT: process.env.PORT || 7001,
    ORIGIN: process.env.CLIENT_URL || 'http://localhost:5173',
}
