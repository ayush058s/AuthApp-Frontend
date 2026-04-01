import React from 'react'
import { Button } from './ui/button'
import { Chrome, Github } from 'lucide-react'
import { NavLink } from 'react-router'

const OAuth2Buttons = () => {
  return (
    <div className="flex flex-col gap-3">
              <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8080"}/oauth2/authorization/google`}>
                <Button
                type='button'
                variant="outline"
                className="cursor-pointer w-full h-11 flex items-center justify-center"
              >
                <Chrome size={18}/>
                Continue with Google
              </Button>
              </NavLink>

              <NavLink to={`${import.meta.env.VITE_BASE_URL ||  "http://localhost:8080"}/oauth2/authorization/github`}>
                <Button
                type='button'
                variant="outline"
                className="cursor-pointer w-full h-11 flex items-center justify-center gap-2"
              >
                <Github size={18} />    
                Continue with GitHub
              </Button>
              </NavLink>
            </div>
  )
}

export default OAuth2Buttons