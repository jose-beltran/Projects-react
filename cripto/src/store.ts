import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getCryptos, FetchCurrentCryptoPrice } from './services/CryptoService'
import { Cryptocurrency, CryptoPrice, Pair } from './types'

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = (await getCryptos()) || []
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await FetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))