'use client'

import { useState } from 'react'
import EmailModal from '@/components/EmailModal'
import OverwriteModal from '@/components/OverwriteModal'
import ChartCard from '@/components/ChartCard'
import { ChartConfig } from '@/types/charts'
import { supabase } from '@/lib/supabase'

const initialCharts: ChartConfig[] = [
  {
    id: 'call-volume',
    title: 'Call Volume Over Time',
    editable: true,
    data: [
      { name: 'Mon', value: 120 },
      { name: 'Tue', value: 145 },
      { name: 'Wed', value: 138 },
      { name: 'Thu', value: 165 },
      { name: 'Fri', value: 152 },
      { name: 'Sat', value: 98 },
      { name: 'Sun', value: 87 },
    ],
  },
  {
    id: 'call-duration',
    title: 'Average Call Duration by Day',
    editable: true,
    data: [
      { name: 'Mon', value: 4.2 },
      { name: 'Tue', value: 5.1 },
      { name: 'Wed', value: 4.8 },
      { name: 'Thu', value: 5.3 },
      { name: 'Fri', value: 4.9 },
      { name: 'Sat', value: 3.7 },
      { name: 'Sun', value: 3.2 },
    ],
  },
  {
    id: 'agent-performance',
    title: 'Agent Performance Metrics',
    editable: true,
    data: [
      { name: 'Alice', value: 92 },
      { name: 'Bob', value: 87 },
      { name: 'Charlie', value: 95 },
      { name: 'Diana', value: 89 },
      { name: 'Eve', value: 91 },
    ],
  },
  {
    id: 'call-success-rate',
    title: 'Call Success Rate Distribution',
    editable: true,
    data: [
      { name: 'Successful', value: 65 },
      { name: 'Failed', value: 20 },
      { name: 'Pending', value: 10 },
      { name: 'Cancelled', value: 5 },
    ],
  },
]

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isOverwriteModalOpen, setIsOverwriteModalOpen] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState<{
    chartId: string
    customValues: Record<string, any>
  } | null>(null)
  const [oldValues, setOldValues] = useState<Record<string, any>>({})
  const [charts, setCharts] = useState<ChartConfig[]>(initialCharts)
  const [loading, setLoading] = useState(false)
  const [pendingChartEdit, setPendingChartEdit] = useState<string | null>(null)
  const [triggerEdit, setTriggerEdit] = useState<string | null>(null)

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email)
    setIsEmailModalOpen(false)
    if (pendingChartEdit) {
      setTriggerEdit(pendingChartEdit)
      setPendingChartEdit(null)
    }
  }

  const requestEmail = (chartId: string) => {
    setPendingChartEdit(chartId)
    setIsEmailModalOpen(true)
  }

  const handleChartUpdate = async (chartId: string, customValues: Record<string, any>) => {
    if (!userEmail) {
      requestEmail(chartId)
      return
    }

    setLoading(true)
    try {
      const { data: existingData, error: fetchError } = await supabase
        .from('chart_custom_values')
        .select()
        .eq('email', userEmail)
        .eq('chart_id', chartId)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (existingData && existingData.custom_values) {
        setOldValues(existingData.custom_values)
        setPendingUpdate({ chartId, customValues })
        setIsOverwriteModalOpen(true)
        setLoading(false)
        return
      }

      await saveCustomValues(chartId, customValues)
    } catch (error) {
      console.error('Error checking for previous values:', error)
      alert('Error saving values. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const saveCustomValues = async (chartId: string, customValues: Record<string, any>) => {
    if (!userEmail) return

    try {
      const { error } = await supabase
        .from('chart_custom_values')
        .upsert(
          {
            email: userEmail,
            chart_id: chartId,
            custom_values: customValues,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'email,chart_id',
          }
        )

      if (error) throw error

      setCharts((prevCharts) =>
        prevCharts.map((chart) =>
          chart.id === chartId
            ? { ...chart, customValues, data: updateChartData(chart, customValues) }
            : chart
        )
      )

      setIsOverwriteModalOpen(false)
      setPendingUpdate(null)
    } catch (error) {
      console.error('Error saving custom values:', error)
      alert('Error saving values. Please try again.')
    }
  }

  const updateChartData = (chart: ChartConfig, customValues: Record<string, any>) => {
    return chart.data.map((item) => ({
      ...item,
      value: customValues[item.name] ?? item.value,
    }))
  }

  const handleOverwriteConfirm = () => {
    if (pendingUpdate) {
      saveCustomValues(pendingUpdate.chartId, pendingUpdate.customValues)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Call Analytics Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart) => (
            <ChartCard
              key={chart.id}
              config={chart}
              onUpdate={handleChartUpdate}
              userEmail={userEmail}
              onRequestEmail={() => requestEmail(chart.id)}
              triggerEdit={triggerEdit === chart.id}
              onEditTriggered={() => setTriggerEdit(null)}
            />
          ))}
        </div>
      </main>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />

      <OverwriteModal
        isOpen={isOverwriteModalOpen}
        onClose={() => {
          setIsOverwriteModalOpen(false)
          setPendingUpdate(null)
        }}
        onConfirm={handleOverwriteConfirm}
        oldValues={oldValues}
        newValues={pendingUpdate?.customValues || {}}
        chartTitle={charts.find((c) => c.id === pendingUpdate?.chartId)?.title || ''}
      />
    </div>
  )
}
