import React, { useState } from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const {handleSearch,setpage}=useGlobalContext();
  const [search,setSearch]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault();
    handleSearch(search)
    setpage(0)
    setSearch('')
  }
  return (
    <form className='search-form' onSubmit={handleSubmit} >
      <input className='form-input' type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
    </form>
  )
}



export default SearchForm
