'use client'

import React from 'react'
import useSWR from 'swr'
import { dashboard_service } from '@/configs/dashboard'
import {
  Users,
  Calendar,
  Clock,
  Stethoscope,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

export default function Page() {
  const { data: response, error, isLoading } = useSWR(
    'dashboard-stats',
    dashboard_service.getStats
  )

  const stats = response?.data || {
    overview: {},
    recentActivity: [],
    weeklyStats: []
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-10 text-destructive">
        <Clock className="h-12 w-12" />
        <p className="text-lg font-medium">Failed to load dashboard data</p>
      </div>
    )
  }

  const { overview, recentActivity, weeklyStats } = stats

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={overview.totalPatients || 0}
          icon={Users}
          description={`${overview.todayPatients || 0} new today`}
          trend="+2.1%" // Placeholder for trend
          className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-200/20 dark:border-blue-800/20"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Appointments Today"
          value={overview.appointmentsToday || 0}
          icon={Calendar}
          description="Scheduled visits"
          className="bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent border-violet-200/20 dark:border-violet-800/20"
          iconColor="text-violet-500"
        />
        <StatsCard
          title="Pending Requests"
          value={overview.pendingAppointments || 0}
          icon={Clock}
          description="Requires confirmation"
          className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-200/20 dark:border-orange-800/20"
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Active Staff"
          value={overview.totalStaff || 0}
          icon={Stethoscope}
          description="Doctors & Nurses"
          className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-200/20 dark:border-emerald-800/20"
          iconColor="text-emerald-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Charts Section */}
        <Card className="col-span-4 p-6 flex flex-col gap-4" noHover={true}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Appointment Trends</h3>
              <p className="text-sm text-muted-foreground">Weekly patient visits overview</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyStats}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Section */}
        <Card className="col-span-3 p-6 flex flex-col gap-4" noHover={true}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            <button className="text-sm text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((app: any) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {app.patient?.first_name?.[0] || 'P'}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {app.patient?.first_name} {app.patient?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dr. {app.employee?.first_name} {app.employee?.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 capitalize">
                      {app.status?.toLowerCase() || 'scheduled'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Calendar className="h-8 w-8 mb-2 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconColor
}: {
  title: string,
  value: string | number,
  icon: any,
  description: string,
  trend?: string,
  className?: string,
  iconColor?: string
}) {
  return (
    <Card className={cn("relative overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg bg-background/80 backdrop-blur-sm", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3" />
              {trend}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">{title}</p>
        </div>
        <p className="text-xs text-muted-foreground/80 pt-2 border-t border-border/50">
          {description}
        </p>
      </div>
    </Card>
  )
}
