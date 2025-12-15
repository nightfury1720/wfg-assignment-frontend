'use client'

interface OverwriteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  oldValues: Record<string, any>
  newValues: Record<string, any>
  chartTitle: string
}

export default function OverwriteModal({
  isOpen,
  onClose,
  onConfirm,
  oldValues,
  newValues,
  chartTitle,
}: OverwriteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Previous Values Found</h2>
        <p className="text-gray-600 mb-4">
          We found previous custom values for <strong>{chartTitle}</strong>. Do you want to overwrite them?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Previous Values</h3>
            <div className="space-y-2">
              {Object.entries(oldValues).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-600">{key}:</span>{' '}
                  <span className="text-gray-800">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-semibold text-blue-700 mb-2">New Values</h3>
            <div className="space-y-2">
              {Object.entries(newValues).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-blue-600">{key}:</span>{' '}
                  <span className="text-blue-800">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
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
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Overwrite
          </button>
        </div>
      </div>
    </div>
  )
}

