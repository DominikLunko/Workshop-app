import {
    Workshop,
    User,
    WorkshopDetailsDispatchTypes,
    GET_WORKSHOP_DETAILS_FAIL,
    GET_WORKSHOP_DETAILS_REQUEST,
    GET_WORKSHOP_DETAILS_SUCCESS,
    WORKSHOP_DETAILS_RESET,
  } from "../actions/workshopDetailsActionTypes";
  
  interface DefaultStateI {
    loading?: boolean;
    workshop?: Workshop;
    user?:User,
    error?: string;
    similarWorkshops?: Workshop [];
    backToHomePage:boolean
  }
  const defaultState: DefaultStateI = {
    loading: false,
    error:"",
    backToHomePage:false
  };
  const workshopDetailsReducer = (
    state: DefaultStateI = defaultState,
    action: WorkshopDetailsDispatchTypes
  ): DefaultStateI => {
    switch (action.type) {
      case GET_WORKSHOP_DETAILS_REQUEST:
              return {
                ...state,
                loading: true,
                
              };
          
      case WORKSHOP_DETAILS_RESET:
              return{
                ...state,
                workshop:undefined,
                user:undefined,
                similarWorkshops:undefined,
              }
      
      case GET_WORKSHOP_DETAILS_SUCCESS:
          return {
            ...state,
            loading: false,
            workshop: action.payload.workshop,
            user: action.payload.user,
            similarWorkshops: action.payload.similarWorkshops,
            backToHomePage:true

          };
        
      case GET_WORKSHOP_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default workshopDetailsReducer;