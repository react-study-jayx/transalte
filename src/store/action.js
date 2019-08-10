import {getHot,getLangs,getResult} from '../api/index'
export const CHNAGE_SEARCH_VAL='change_search_val';
export const CHANGE_RESULT_VAL='change_result_val';
export const SET_HOT_LIST='set_hot_list';
export const SET_TAG_LIST='set_tag_list';
export const TOGGLE_TAG_CHOOSED='toggle_tag_choosed';
export const SET_RESULT='set_result';

export const changeSearhAction=(value)=>{
    return{
        type:CHNAGE_SEARCH_VAL,
        value:value,
    }
}

export const changeResultAction=(result)=>{
        return {
            type:CHANGE_RESULT_VAL,
            result:result
        }    
}
/* export const setHotList=(hotList)=>{
    return {
        type:SET_HOT_LIST,
        hotList:hotList
    }   
} */
export const setHotList=()=>{
    return dispath=>{
            getHot().then(res=>{
                let hotList=res.data.data;
                let action={
                    type:SET_HOT_LIST,
                    hotList:hotList
                }
                dispath(action);
            }) 
    }
}
export const setTagList=(tagList)=>{
    return {
        type:SET_TAG_LIST,
        tagList:tagList
    }   
}
/* export const setTagList=(dispath=>{
    return dispath=>{
        getLangs().then(res=>{
            let action ={
                type:SET_TAG_LIST,
                tagList:res.data.data
            }
            dispath(action);
        })
    }
}) */
export const setResult=(result)=>{
    return {
        type:SET_RESULT,
        result:result
    }   
}
export const toggleTagChoosed=(tag)=>{
    return {
        type:TOGGLE_TAG_CHOOSED,
        tag:tag
    }
}