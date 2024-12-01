import { useTabContext } from '@/app/(screens)/admin/settings/context'
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
  { id: 'access-management', label: 'Access Management' },
]

export default function SettingsSidebar({ content }: { content?: any }) {
  const { activeTab, setActiveTab } = useTabContext()
  return (
    <div>
      <div className='block md:hidden rounded-xl'>
        <Accordion type='single' collapsible>
          {settingsTabs.map((tab) => (
            <AccordionItem key={tab.id} value={tab.id}>
              <AccordionTrigger onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </AccordionTrigger>
              <AccordionContent className='border-t-2'>
                <div className='p-4'>{content}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <nav className='hidden md:block space-y-2'>
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            className={`block w-full p-3 text-left rounded ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
