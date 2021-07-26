import {
    Workshop,
    WorkshopDispatchTypes,
    GET_WORKSHOP_FAIL,
    GET_WORKSHOP_REQUEST,
    GET_WORKSHOP_SUCCESS,
    RESET_WORKSHOP_LIST,
    INCREASE_PAGE_NUMBER,
    CHANGE_CATEGORY,
  } from "../actions/workshopActionTypes";
  
  export interface DefaultStateI {
    loading?: boolean;
    workshops: Workshop[];
    error?: string;
    page?: number;
    category?: string;
    numberOfData?: number;
    hasMore?: boolean;
  }
  const defaultState: DefaultStateI = {
    loading: false,
    workshops: [],
    page: 1,
    category: "all",
    hasMore: true,
  };
  const workshopReducer = (
    state: DefaultStateI = defaultState,
    action: WorkshopDispatchTypes
  ): DefaultStateI => {
    switch (action.type) {
      case INCREASE_PAGE_NUMBER:
        if (state.page && state.numberOfData) {
          if ((state.page + 1) * 9 >= state.numberOfData) {
            return {
              ...state,
              page: state.page + 1,
              hasMore: false,
            };
          }
          return {
            ...state,
            page: state.page + 1,
          };
        }
        return {
          ...state,
        };
  
      case CHANGE_CATEGORY:
        if (state.page) {
          return {
            ...state,
            page: 1,
            category: action.payload.category,
            hasMore: true,
          };
        }
  
        return {
          ...state,
        };
     
      case RESET_WORKSHOP_LIST:
        return {
          ...state,
          workshops: [],
        };
      case GET_WORKSHOP_REQUEST:
        if (state.workshops?.length > 0) {
          return {
            ...state,
          };
        } else {
          return {
            ...state,
            loading: true,
            workshops: [],
          };
        }
  
      case GET_WORKSHOP_SUCCESS:
        if (state.workshops) {
          return {
            ...state,
            loading: false,
            numberOfData:action.payload.numberOfData,
            workshops: [...state.workshops, ...action.payload.workshops].sort((a, b) => (a.date > b.date ? 1 : -1)),
          };
        } else {
          return {
            ...state,
            loading: false,
            numberOfData:action.payload.numberOfData,
            workshops: action.payload.workshops,
          };
        }
      case GET_WORKSHOP_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          workshops: [],
        };
      default:
        return {
          ...state,
        };
    }
  };
  
  export default workshopReducer;
  