/** Public routes: no auth required. Renders immediately. */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
