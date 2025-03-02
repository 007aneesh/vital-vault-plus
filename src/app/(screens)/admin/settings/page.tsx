/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useTabContext } from './context'
import {
  change_password_schema,
  change_password_form_config,
} from '@/configs/ChangePasswordConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import JsonEditor from './(json_editor)/json_editor'
import RolesTable from './role-management/page'

export default function SettingsSidebar() {
  const { activeTab } = useTabContext()

  const form = useForm<z.infer<typeof change_password_schema>>({
    resolver: zodResolver(change_password_schema),
  })

  async function onSubmit(values: z.infer<typeof change_password_schema>) {
    try {
      console.log('Password successfully changed', values)
    } catch (err) {
      console.error('Invalid')
    }
  }

  const render_form = () => {
    return (
      <div>
        {_.map(change_password_form_config?.fields, (fieldConfig: any) => (
          <FormField
            key={fieldConfig.id}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }: any) => (
              <>
                <FormItem>
                  <Input
                    type={fieldConfig.type}
                    className='mb-4'
                    placeholder={fieldConfig.placeholder}
                    {...field}
                  />
                </FormItem>
              </>
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {activeTab === 'general' && <div>General</div>}
      {activeTab === 'password' && (
        <div className='h-full'>
          <h1 className='mb-4'>Change Password</h1>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=''>
              {render_form()}

              <Button
                type='submit'
                variant={'secondary'}
                className='border-border mt-2'
              >
                Change Password
              </Button>
            </form>
          </FormProvider>
        </div>
      )}
      {activeTab === 'exchange' && <div>exchange</div>}
      {activeTab === 'access-management' && <div>access-management</div>}
      {activeTab === 'setting_configuration' && (
        <div>
          <JsonEditor />
        </div>
      )}
      {activeTab === 'role_management' && (
        <div>
          <RolesTable />
        </div>
      )}
    </div>
  )
}
