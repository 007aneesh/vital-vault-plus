export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4 bg-dashboard'>
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  )
}
