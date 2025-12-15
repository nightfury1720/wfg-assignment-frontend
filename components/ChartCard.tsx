'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartConfig } from '@/types/charts'
import EditChartModal from './EditChartModal'

interface ChartCardProps {
  config: ChartConfig
  onUpdate: (chartId: string, customValues: Record<string, any>) => void
  userEmail: string | null
  onRequestEmail: () => void
  triggerEdit?: boolean
  onEditTriggered?: () => void
}

export default function ChartCard({ config, onUpdate, userEmail, onRequestEmail, triggerEdit, onEditTriggered }: ChartCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    if (triggerEdit && userEmail) {
      setIsEditModalOpen(true)
      onEditTriggered?.()
    }
  }, [triggerEdit, userEmail, onEditTriggered])

  const handleEdit = () => {
    if (!userEmail) {
      onRequestEmail()
      return
    }
    setIsEditModalOpen(true)
  }

  const handleSave = (customValues: Record<string, any>) => {
    onUpdate(config.id, customValues)
    setIsEditModalOpen(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{config.title}</h3>
        {config.editable && (
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
      <div className="h-64">
        {config.id === 'call-volume' && <CallVolumeChart data={config.data} />}
        {config.id === 'call-duration' && <CallDurationChart data={config.data} />}
        {config.id === 'agent-performance' && <AgentPerformanceChart data={config.data} />}
        {config.id === 'call-success-rate' && <CallSuccessRateChart data={config.data} />}
      </div>
      {isEditModalOpen && (
        <EditChartModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          chartConfig={config}
        />
      )}
    </div>
  )
}

function CallVolumeChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

function CallDurationChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function AgentPerformanceChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function CallSuccessRateChart({ data }: { data: any[] }) {
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

