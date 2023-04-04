export type TariffRow = {
  descriptions: string
  hasGst: boolean
  unit: string
  unitPrice: number
  qty: number
}

export type Tariff = {
  serialNumber: string
  name: string
  currency: string
  rows: [TariffRow]
}