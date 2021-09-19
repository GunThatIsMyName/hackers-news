import React, { useContext, useEffect, useReducer, useState } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading:false,
  list:[],
  page:0,
  search:"korea"
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("korea");

  const getNews = async () => {
    setLoading(true);
    try {
      const getData = await fetch(
        `${API_ENDPOINT}query=${search}&page=${page}`
      );
      const data = await getData.json();
      console.log(data, "data");
      setList(data);
    } catch {
      console.log(`can't get a data`);
    } finally {
      setLoading(false);
    }
  };
  const removeItem = (id) => {
    const newNews = list.hits.filter((item) => item.objectID !== id);
    console.log(newNews, "dd");
    console.log(list, "list");
    setList((old) => {
      return { ...old, hits: newNews };
    });
  };
  const nextPage = () => {
    setpage((old) => {
      console.log(old,"old")
      console.log(list.nbPages,"list.nbPages")
      if (list.nbPages === old) {
        return 0;
      }
      return old + 1;
    });
  };
  const prevPage = () => {
    setpage((old)=>{
      if(old === 0){
        return list.nbPages -1
      }
      return old -1;
    });
  };
  const handleSearch = (data) => {
    setSearch(data);
    getNews();
  };
  useEffect(() => {
    getNews();
  }, [search, page]);
  return (
    <AppContext.Provider
      value={{
        nextPage,
        prevPage,
        setpage,
        removeItem,
        handleSearch,
        isLoading,
        list,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
