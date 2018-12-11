import { combineReducers } from 'redux';
const allState = {
  isLogin: 123,
  name:localStorage.getItem('name') || '张三'
}

const allRedux =  function indexRedux(state = allState, action) {
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


