import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const settingsTabs = [
  { id: 'general', label: 'General' },
  { id: 'password', label: 'Password' },
  { id: 'exchange', label: 'Import / Export' },
  { id: 'access-management', label: 'Access Management' }
]

export default function SettingsSidebar({
  activeTab,
  onTabChange,
  content
}: {
  activeTab: string
  onTabChange: (tab: string) => void
  content?: any
}) {
  return (
    <div>
      {/* Accordion for Mobile (sm breakpoint) */}
      <div className='block md:hidden rounded-xl'>
        <Accordion type='single' collapsible>
          {settingsTabs.map((tab) => (
            <AccordionItem key={tab.id} value={tab.id}>
              <AccordionTrigger>{tab.label}</AccordionTrigger>
              {/* Rendered Content */}
              <AccordionContent>
                <div className='p-4'>
                  {content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Sidebar for Desktop (md and larger) */}
      <nav className='hidden md:block space-y-2'>
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            className={`block w-full p-3 text-left rounded ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
