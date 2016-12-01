import dva from 'dva';
var request = require('../utils/request');
var product = require('../services/product');
import reqwest from 'reqwest';

export default {
  namespace: 'products',
  state: {
    data:[],
    loading: false,
    count: 0
  },
  //subscription 意为订阅，用于数据源的订阅。
  //为了方便在 effects 里调用，service 方法需要返回 promise 。
  //watchList 除外，service 方法不在 effects 里调用，而是在 subscriptions 里，用于实时更新列表数据。
  subscriptions: {
    setup({ dispatch, history }) {
      console.log(history,location,location.hash);
      if(/#\/products/.test(location.hash)){
        //请求调用effects:*fetchRemote方法
        dispatch({
          type: 'fetchRemote',
          loading: true
        });
      }else{
        console.log("subscriptions",location.hash);
      }
    },
  },
  //异步逻辑部分，写在 effects 里,call
  effects: {
    *fetchRemote(payload, { call, put }) {
       console.log('*fetchRemote',payload);
       const result = yield call(product.query, {currentPage:1,pageSize:10});
       yield put({type: 'list', loading: true,data:result.content.data});
    },
    *'fetch'(action, {put, call}) {
      console.log('*fetch',action);
      switch(action.count.action){
        case "edit":
          //Call async function. Support promise.e.g. call(asyncfunction,params)
          const result = yield call(product.query, {currentPage:1,pageSize:10});
          console.log("call edit:",result);
          yield put({type: 'edit',loading: true,data:result.content.data});
          break;
        case "delete":
          yield put({type: 'delete',loading: true});
          break;
        case "save":
          yield put({type: 'save',loading: true});
          break;
        default:
          break;
      }
      // //请求调用reducers:list方法
      // yield put({type: 'list', loading: true,data:action.data});

      // let count = yield call((count) => {
      //   console.log("call",count);
      //   return new Promise(resolve => {
      //     setTimeout(() => {
      //       resolve([{id:1,name:'robin'},{id:2,name:'robin2'}]);
      //     }, 1000);
      //   });
      // }, action.count);
      // console.log("count:",count);

    }
  },
  //reducers负责 state 更新
  reducers: {
    'list'(state,payload) {
      console.log('list',state,payload);
      state.loading = payload.loading;
      return {...state, ...payload};
    },
    'delete'(state, { payload: id }) {
      console.log('delete',state,payload);
      return {...state, ...payload};
    },
    'edit'(state, payload) {
      console.log('edit',state,payload);
      return {...state, ...payload};
    },
  },
};