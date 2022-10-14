import React, { useEffect } from "react"
import { navigate } from "gatsby"

const Home = () => {

  const hash = typeof window !== 'undefined' ? window.location.hash : null

  useEffect(() => {
    if(hash === '#menu' ){
      navigate("/menu/", { replace: true })
    }
  }, [ hash ])

  return(

    <div>

    </div>
    
  )
}

export default Home