'use client';

import React, { createContext, useContext, useState } from 'react'

interface TabContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export function useTabContext() {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('general')
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}
