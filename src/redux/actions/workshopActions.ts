import { Dispatch } from "redux";
import {
  WorkshopDispatchTypes,
  GET_WORKSHOP_FAIL,
  GET_WORKSHOP_REQUEST,
  GET_WORKSHOP_SUCCESS,
  RESET_WORKSHOP_LIST,
  INCREASE_PAGE_NUMBER,
  CHANGE_CATEGORY,
} from "./workshopActionTypes";

import * as API from "../../api";

export const getWorkshops =
  (page: number, category: string) =>
  async (dispatch: Dispatch<WorkshopDispatchTypes>, getState: any) => {
    try {

      dispatch({
        type: GET_WORKSHOP_REQUEST,
      });

      if (category !== "all") {
        const { data } = await API.getCategoryByPage(page, category);
        const allData = await API.getMaxCountOfCategory(category);
          dispatch({
            type: GET_WORKSHOP_SUCCESS,
            payload: {
              workshops: data,
              numberOfData: allData.data.length,
            },
          });
      } else {
        const { data } = await API.getAllCategoryByPage(page);
        const allData = await API.getMaxCountOfAllCategory();

        dispatch({
          type: GET_WORKSHOP_SUCCESS,
          payload: {
            workshops: data,
            numberOfData: allData.data.length,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: GET_WORKSHOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const resetWorkshopList =
  () => async (dispatch: Dispatch<WorkshopDispatchTypes>) =>
    dispatch({
      type: RESET_WORKSHOP_LIST,
    });

export const increasePage =
  () => async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    dispatch({
      type: INCREASE_PAGE_NUMBER,
    });
  };
export const changeCategory =
  (category: string) => async (dispatch: Dispatch<WorkshopDispatchTypes>) => {
    dispatch({
      type: CHANGE_CATEGORY,
      payload: {
        category: category,
      },
    });
  };
