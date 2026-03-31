import useAuth from '@/auth/store'
import { Button } from './ui/button'
import { NavLink } from 'react-router'

const Navbar = () => {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout)

  return (
    <nav className='py-5  dark:border-b border-gray-700 md:py-0 flex md:flex-row gap-4 md:gap-0 flex-col justify-around md:h-14 items-center '>
        {/*brand*/}
        <div className='font-semibold flex items-center gap-2'>

          <span className='inline-block text-center h-6 w-6 rounded-md bg-linear-to-r from-primary to-primary/40'>
            {"A"}
          </span>
            {/* text-base: font-size: 1rem;   => 16px Sets normal/default text size */}
            {/* tracking-tight letter-spacing: -0.025em; Reduces space between letters */}
            <NavLink to={'/'}>
              <span className='text-base tracking-tight'>Auth App</span>
            </NavLink>
        </div>
        <div className='flex gap-4 items-center '>
          {/* we will display nav bar according to if user is login or not*/}
            {checkLogin()
            
            ? 
            
            <>

            <NavLink to={'#!'}>{user?.name}</NavLink>{/* display  name*/}
            
              <Button onClick={() => {
                logout();
              }} size="sm" className='cursor-pointer' variant={'outline'}>
                Logout
              </Button>
            
              
            </> 
           
           : 
           
           <>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/login'}>
              <Button size="sm" className='cursor-pointer' variant={'outline'}>Login</Button>
            </NavLink>
            <NavLink to={'/signup'}>
              <Button size="sm" className='cursor-pointer' variant={'outline'}>Signup</Button>
            </NavLink>
            </>}

        </div>
    </nav>
  )
}

export default Navbar
