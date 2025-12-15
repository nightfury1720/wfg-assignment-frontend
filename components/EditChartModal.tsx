'use client'

import { useState, FormEvent } from 'react'
import { ChartConfig } from '@/types/charts'

interface EditChartModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (customValues: Record<string, any>) => void
  chartConfig: ChartConfig
}

export default function EditChartModal({
  isOpen,
  onClose,
  onSave,
  chartConfig,
}: EditChartModalProps) {
  const [customValues, setCustomValues] = useState<Record<string, any>>(
    chartConfig.customValues || {}
  )

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(customValues)
  }

  const updateValue = (key: string, value: string) => {
    const numValue = parseFloat(value)
    setCustomValues((prev) => ({
      ...prev,
      [key]: isNaN(numValue) ? value : numValue,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit {chartConfig.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            {chartConfig.data.map((item, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.name}
                </label>
                <input
                  type="number"
                  value={customValues[item.name] ?? item.value}
                  onChange={(e) => updateValue(item.name, e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                  step="0.01"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

