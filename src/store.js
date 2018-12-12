import { combineReducers } from 'redux';
const allState = {
  isLogin: false,
  name:localStorage.getItem('name') || '张三'
}
const allRedux =  (state = allState, action) => {
  switch (action.type) {
    case 'GO_LOGIN':
      localStorage.setItem('name',action.data)
      return {
        ...state,
        name:action.data
      }
    case 'OUT_LOGIN':
      localStorage.setItem('name',action.data)
      return {
        ...state,
        name:action.data
      }
    default:
      return state;
  }
}

//合并 reducer
const Reducer = combineReducers({
	allRedux
})
export default Reducer


