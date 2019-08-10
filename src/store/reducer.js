import {combineReducers} from 'redux'
import langsReducer from './langs'
export default combineReducers({
    langs:langsReducer
})