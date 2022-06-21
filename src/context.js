import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialstate = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};

// create context
const AppContext = React.createContext();

// AppProvider Function
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
      //   isLoading = false;
    } catch (error) {
      console.log(error);
    }
  };

  // To Remove Post
  const removePost = (post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: post_ID });
  };

  // searchPost Function
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  // getPrevPage, getNextPage Function
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  // useEffect
  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <>
      <AppContext.Provider
        value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}
      >
        {children}
      </AppContext.Provider>{" "}
    </>
  );
};

// custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
