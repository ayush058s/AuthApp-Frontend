import useAuth from '@/auth/store'
import { Navigate, Outlet } from 'react-router'

const UserLayout = () => {

  // protect the dashboard
  const checkLogin = useAuth((state) => state.checkLogin);
  // if login then return this page else navigate to login
  if(checkLogin())
    return (
    <div>
      <Outlet />
    </div>
  )
  else return <Navigate to={"/login"} />;
  
  
}

export default UserLayout;