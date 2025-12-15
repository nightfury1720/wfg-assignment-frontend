export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: any
}

export interface ChartConfig {
  id: string
  title: string
  editable: boolean
  data: ChartDataPoint[]
  customValues?: Record<string, any>
}

