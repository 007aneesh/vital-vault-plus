/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef, useEffect, useState } from 'react'
import JSONEditor, { JSONEditorMode } from 'jsoneditor'
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

const _keys = [
  { value: 'tenant_setting_keys', label: 'Tenant Settings' },
  { value: 'organisation_settings', label: 'Organization Settings' },
  { value: 'employee_settings', label: 'Employee Settings' },
]

const default_configurations: any = {
  tenant_setting_keys: {
    feature_flags: {
      enable_beta_features: true,
      max_api_requests: 1000,
    },
    ui_settings: {
      theme: 'dark',
      layout: 'grid',
    },
  },
  organisation_settings: {
    org_policy: {
      allow_user_signup: true,
      max_users: 500,
    },
    customization: {
      logo_url: '',
      color_scheme: 'blue',
    },
  },
  employee_settings: {
    attendance: {
      clockInEnabled: true,
      allowedLateMinutes: 15,
    },
    permissions: {
      canAccessDashboard: true,
      can_view_payroll: false,
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
  const editorInstanceRef = useRef<JSONEditor | null>(null)
  const [isChanged, setIsChanged] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [loadedConfig, setLoadedConfig] = useState<any>({})

  useEffect(() => {
    if (editorContainerRef.current && !editorInstanceRef.current) {
      const options = {
        mode: 'tree' as JSONEditorMode,
        modes: ['code', 'tree', 'view', 'text'] as JSONEditorMode[],
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
    if (selectedCategory && default_configurations[selectedCategory]) {
      const configToLoad = default_configurations[selectedCategory]
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
      <header className='mb-6'>
        <h1 className='text-2xl font-bold'>Settings Configuration Editor</h1>
        <p className='mt-2'>
          Select a settings category and customize its configuration.
        </p>
      </header>

      <div className='flex flex-col md:flex-row items-center mb-6 gap-10'>
        <Select
          onValueChange={(value: any) => setSelectedCategory(value)}
          value={selectedCategory || undefined}
        >
          <SelectTrigger className='h-10 md:w-auto flex-1'>
            <SelectValue placeholder='Select a configuration' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {_keys.map((item) => (
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

      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex gap-4 w-full md:w-auto mb-4'>
          <Button
            onClick={handleReset}
            variant='destructive'
            className='flex-1'
          >
            Reset to Default
          </Button>
          <Button
            variant='secondary'
            onClick={handleSave}
            disabled={!isChanged}
            className='flex-1'
          >
            Save Changes
          </Button>
        </div>
        <div className='flex gap-4 w-full md:w-auto justify-end mb-4'>
          <Button
            variant='outline'
            onClick={handleDownload}
            className='flex-1 border-green-400 hover:bg-green-300 transition-colors'
          >
            Download JSON
          </Button>
          <Button
            variant='outline'
            onClick={handleCopy}
            className='flex-1 border-indigo-400 hover:bg-indigo-300 transition-colors'
          >
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  )
}
