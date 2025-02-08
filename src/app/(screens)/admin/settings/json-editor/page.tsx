/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/settings-editor.js
'use client'

import { useRef, useEffect, useState } from 'react'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// Define the list of settings category keys (for demo purposes)
const settingsCategories = [
  { value: 'providerSettings', label: 'Provider Settings' },
  { value: 'orgSettings', label: 'Organization Settings' },
  { value: 'employeeSettings', label: 'Employee Settings' },
]

// Sample default configurations for each settings category.
const defaultConfigurations = {
  providerSettings: {
    featureFlags: {
      enableBetaFeatures: true,
      maxAPIRequests: 1000,
    },
    uiSettings: {
      theme: 'dark',
      layout: 'grid',
    },
  },
  orgSettings: {
    orgPolicy: {
      allowUserSignup: true,
      maxUsers: 500,
    },
    customization: {
      logoUrl: '',
      colorScheme: 'blue',
    },
  },
  employeeSettings: {
    attendance: {
      clockInEnabled: true,
      allowedLateMinutes: 15,
    },
    permissions: {
      canAccessDashboard: true,
      canViewPayroll: false,
    },
  },
}

// A simple JSON schema to let the JSONEditor work in “free form” mode.
const schema = {
  type: 'object',
  title: 'Configuration Editor',
  additionalProperties: true,
}

export default function SettingsEditor() {
  const editorContainerRef = useRef(null)
  const editorInstanceRef = useRef(null)
  const [isChanged, setIsChanged] = useState(false)
  // Store the selected category as a string.
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loadedConfig, setLoadedConfig] = useState(null)

  // Initialize JSONEditor once when the component mounts.
  useEffect(() => {
    if (editorContainerRef.current && !editorInstanceRef.current) {
      const options = {
        mode: 'view',
        modes: ['code', 'tree', 'view', 'text'],
        schema,
        onChange: () => {
          try {
            editorInstanceRef.current?.get()
            setIsChanged(true)
          } catch (error) {
            setIsChanged(false)
          }
        },
        onError: (error: any) => {
          console.error('JSONEditor error:', error)
        },
      }
      editorInstanceRef.current = new JSONEditor(
        editorContainerRef.current,
        options,
      )
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy()
        editorInstanceRef.current = null
      }
    }
  }, [])

  // Load configuration for the selected settings category.
  const handleLoadConfiguration = () => {
    if (selectedCategory && defaultConfigurations[selectedCategory]) {
      const configToLoad = defaultConfigurations[selectedCategory]
      setLoadedConfig(configToLoad)
      if (editorInstanceRef.current) {
        editorInstanceRef.current.set(configToLoad)
        setIsChanged(false)
      }
    } else {
      console.error('No configuration found for selected category')
    }
  }

  // Save the current configuration (for example, call an API endpoint here).
  const handleSave = () => {
    if (editorInstanceRef.current) {
      const json = editorInstanceRef.current.get()
      console.log('Saved JSON:', json)
      setIsChanged(false)
      // Insert your API call or state update logic here.
    }
  }

  // Reset to the configuration loaded for the selected category.
  const handleReset = () => {
    if (editorInstanceRef.current && loadedConfig) {
      editorInstanceRef.current.set(loadedConfig)
      setIsChanged(false)
    }
  }

  // Download the current configuration as a JSON file.
  const handleDownload = () => {
    if (editorInstanceRef.current) {
      const json = editorInstanceRef.current.get()
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(json, null, 2))
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', 'configuration.json')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    }
  }

  // Copy the current configuration to the clipboard.
  const handleCopy = () => {
    if (editorInstanceRef.current) {
      const json = editorInstanceRef.current.get()
      navigator.clipboard.writeText(JSON.stringify(json, null, 2))
    }
  }

  return (
    <div className='md:p-6 md:max-w-7xl mx-auto'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-center'>
          Settings Configuration Editor
        </h1>
        <p className='mt-2 text-center text-gray-600'>
          Select a settings category and customize its configuration.
        </p>
      </header>

      {/* Dropdown to select settings category */}
      <div className='flex flex-col md:flex-row items-center mb-6 gap-10'>
        <Select
          onValueChange={(value: string) => setSelectedCategory(value)}
          value={selectedCategory}
        >
          <SelectTrigger className='h-10 md:w-auto flex-1'>
            <SelectValue placeholder='Select a configuration' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {settingsCategories.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={handleLoadConfiguration}
          disabled={!selectedCategory}
          variant={'secondary'}
          className='w-full md:w-auto'
        >
          Load Configuration
        </Button>
      </div>

      <div className='mb-10 border shadow-lg min-h-[500px]'>
        <div ref={editorContainerRef} className='h-full min-h-[500px]' />
      </div>

      {/* Action buttons */}
      <div className='flex flex-wrap justify-between items-center space-y-4'>
        <div className='flex space-x-4'>
          <button
            onClick={handleReset}
            className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors'
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`px-4 py-2 rounded transition-colors ${
              isChanged
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={handleDownload}
            className='px-4 py-2 border border-green-400 rounded hover:bg-green-50 transition-colors'
          >
            Download JSON
          </button>
          <button
            onClick={handleCopy}
            className='px-4 py-2 border border-indigo-400 rounded hover:bg-indigo-50 transition-colors'
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  )
}
