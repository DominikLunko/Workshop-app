import { Dispatch } from "redux";
import {
  WorkshopDetailsDispatchTypes,
  GET_WORKSHOP_DETAILS_REQUEST,
  GET_WORKSHOP_DETAILS_SUCCESS,
  GET_WORKSHOP_DETAILS_FAIL,
  WORKSHOP_DETAILS_RESET,
} from "./workshopDetailsActionTypes";

import * as API from "../../api";

export const getWorkshopDetail =
  (id: number) =>
  async (dispatch: Dispatch<WorkshopDetailsDispatchTypes>, getState: any) => {
    try {
      dispatch({
        type: GET_WORKSHOP_DETAILS_REQUEST,
      });
      const resWorkshop = await API.getWorkshopById(id);
      const resUser = await API.getUserByWorkshopUserID(
        resWorkshop.data.userId
      );
      const similarWorkshops = await API.getSimilarWorkshops(
        resWorkshop.data.category,
        id
      );

      dispatch({
        type: GET_WORKSHOP_DETAILS_SUCCESS,
        payload: {
          workshop: resWorkshop.data,
          user: resUser.data,
          similarWorkshops: similarWorkshops.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_WORKSHOP_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const workshopDetailReset =
  () => (dispatch: Dispatch<WorkshopDetailsDispatchTypes>) => {
    dispatch({
      type: WORKSHOP_DETAILS_RESET,
    });
  };
