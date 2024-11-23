import Script from 'next/script'

const CalendlyForm = ({ type }: { type?: string }) => {
  const username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME
  const showDetails: boolean = false
  const showCookies: boolean = false

  return (
    <>
      <div
        className='calendly-inline-widget w-full h-full'
        data-url={`https://calendly.com/${username}${type ? `/${type}` : ''}?hide_landing_page_details=${showDetails}&hide_gdpr_banner=${showCookies}`}
      ></div>

      <Script
        type='text/javascript'
        src='https://assets.calendly.com/assets/external/widget.js'
        async
      />
    </>
  )
}

// use case
{
  /* <div className='fixed inset-0 flex items-center justify-center'>
        <div className='relative w-[80%] md:w-full h-[80vh] md:h-screen'>
          <CalendlyForm />
        </div>
      </div> */
}

export default CalendlyForm
