const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORIES":
      return {
        ...state,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        isLoading: false,
      };
    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter(
          (curElem) => curElem.objectID !== action.payload
        ),
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    case "NEXT_PAGE":
      let pageNo = state.page;
      if (pageNo > state.nbPages) {
        pageNo = 0;
      } else {
        pageNo = pageNo + 1;
      }

      return {
        ...state,
        page: pageNo,
      };

    case "PREV_PAGE":
      let pageNum = state.page;

      if (pageNum >= 0) {
        pageNum = 0;
      } else {
        pageNum = pageNum - 1;
      }

      return {
        ...state,
        page: pageNum,
      };
  }
  return state;
};

export default reducer;
