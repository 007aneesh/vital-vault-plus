'use client'

import dynamic from 'next/dynamic'
import React from 'react'
const JsonEditor = dynamic(() => import('../(json_editor)/JsonEditor'), {
  ssr: false, 
})
const SettingConfigurationPage: React.FC = () => {
  return (
    <div>
      <JsonEditor />
    </div>
  )
}

export default SettingConfigurationPage
