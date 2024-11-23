import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import _ from 'lodash'
import React from 'react'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const { id } = params
  const breadcrumb_list = [
    {
      title: 'Patient List',
      link: '/admin/patient-list',
    },
    {
      title: id,
    },
  ]
  const handle_render_breadcrumb = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {_.map(breadcrumb_list, (item, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item?.link}>
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumb_list.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  return (
    <section className='h-full'>
      {handle_render_breadcrumb()}
      {children}
    </section>
  )
}
