
interface ProtectedRouteProps {
  children: React.ReactNode
  allow_all?: boolean
}

const AuthRoute = ({ children, allow_all }: ProtectedRouteProps) => {
  const is_logged_in = true

  if (allow_all && !is_logged_in) {
    return children
  }

  return !is_logged_in ? children : <div>Not Allowed</div>
}

export default AuthRoute
