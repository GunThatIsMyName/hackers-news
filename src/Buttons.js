import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const {isLoading,list:{nbPages,page},nextPage,prevPage} = useGlobalContext();
  console.log(page+1,"now page!")
  return <div className="btn-container">
    <button onClick={prevPage} >down</button>
    {!isLoading && 
    <p>{page + 1} of {nbPages}</p>
    }
    <button onClick={nextPage} >up</button>
  </div>
}


export default Buttons
