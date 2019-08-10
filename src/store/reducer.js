import * as actions from './action'
const defaultState={
    search:"",
    hotList:[],
    tagList:{},
    result:[],
};
export default (state=defaultState,action)=>{
    var newState=JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actions.CHNAGE_SEARCH_VAL:
            newState.search=action.value;
            return  newState;
        case actions.CHANGE_RESULT_VAL:
            newState.result=action.result;
            return  newState;
        case actions.SET_HOT_LIST:
            newState.hotList=action.hotList;
            return  newState;
        case actions.SET_RESULT:
            newState.result=action.result;
            return  newState;
        case actions.SET_TAG_LIST:
            newState.tagList=action.tagList;
            return  newState;
        case actions.TOGGLE_TAG_CHOOSED:
            newState.tagList[action.tag]['choosed']=!newState.tagList[action.tag]['choosed'];//
            return  newState;
        default:
            return state;
    }

}