import React from "react";

import { useGlobalContext } from "./context";
import News from "./news";

const Stories = () => {
  const { list, isLoading } = useGlobalContext();
  const {hits}=list

  if (isLoading) {
    return <h1> LOADING ...</h1>;
  }
  return(
    <section className='stories'>
      {hits && hits.map(item=>{
        return <News id={item.objectID} {...item} />
      })}
    </section>

  )
};

export default Stories;
