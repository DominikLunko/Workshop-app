export const GET_WORKSHOP_REQUEST = "GET_WORKSHOP_REQUEST"
export const GET_WORKSHOP_SUCCESS = "GET_WORKSHOP_SUCCESS"
export const GET_WORKSHOP_FAIL = "GET_WORKSHOP_FAIL"


export const RESET_WORKSHOP_LIST = "RESET_WORKSHOP_LIST";
export const PAGE_AND_CATEGORY = "PAGE_AND_CATEGORY"

export const INCREASE_PAGE_NUMBER = "INCREASE_PAGE_NUMBER"

export const CHANGE_CATEGORY = "CHANGE_CATEGORY"


export type Workshop = {
    id: number,
    title: string,
    desc:string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
}

export interface WorkshopLoading {
    type: typeof GET_WORKSHOP_REQUEST
    
}

export interface WorkshopFail {
    type: typeof GET_WORKSHOP_FAIL,
    payload: string
}

export interface WorkshopSuccess {
    type: typeof GET_WORKSHOP_SUCCESS,
    payload: {
        workshops:Workshop[],
        numberOfData:number,
    }
}


export interface ResetWorkshopList {
    type: typeof RESET_WORKSHOP_LIST,
    
}

export interface IncreasePageNumber {
    type: typeof INCREASE_PAGE_NUMBER,
    
}

export interface ChangeCategory {
    type: typeof CHANGE_CATEGORY,
    payload:{
        category:string
       
    }
}

export type WorkshopDispatchTypes = WorkshopLoading | WorkshopFail | WorkshopSuccess | ResetWorkshopList /* | GetPageAndCategory */ | IncreasePageNumber | ChangeCategory
