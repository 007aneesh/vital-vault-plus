const render_analytics = () => {
  return (
    <div className='flex flex-col md:flex-row w-full gap-4'>
      <div className='flex flex-col gap-4 md:w-2/6 h-auto'>
        <div className='rounded-lg p-5 h-2/6 bg-secondary-foreground flex flex-col items-center justify-center text-center gap-3'>
          <h1 className='sub-heading'>Total Patients</h1>
          <p className='text-2xl font-semibold py-2'>pat</p>
        </div>
        <div className='p-5 rounded-lg h-2/6 bg-secondary-foreground flex flex-col items-center justify-center text-center gap-3'>
          <h1 className='sub-heading'>Today&apos;s entries</h1>
          <p className='text-2xl font-semibold py-2'>Today</p>
        </div>
        <div className='p-5 rounded-lg h-2/6 bg-secondary-foreground flex flex-col items-center justify-center text-center gap-3'>
          <h1 className='sub-heading'>Yesterday&apos;s entries</h1>
          <p className='text-2xl font-semibold py-2'>Yesterday&apos;s</p>
        </div>
      </div>

      <div className='p-5 rounded-lg md:w-4/6 overflow-hidden bg-secondary-foreground flex items-center justify-center'>
        Web Analytics or something Coming Soon
      </div>
    </div>
  )
}

const render_feedbacks = () => {
  return (
    <div className='bg-card flex flex-col items-center p-5 w-full rounded-lg h-auto'>
      <h1 className='sub-heading'>Patient Feedbacks Coming Soon</h1>
    </div>
  )
}

export default function Page() {
  return (
    <div className='w-full h-full flex flex-col gap-y-4'>
      {render_analytics()} {render_feedbacks()}
    </div>
  )
}
