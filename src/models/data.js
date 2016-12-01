import { create, remove, update, query, queryOther, queryColumn, search, searchTwo, queryFormList } from '../services/data';
import React, { PropTypes } from 'react';
import { parse } from 'qs';
import reqwest from 'reqwest';
export default {
  namespace: 'data',

  state: {
    list: [],
    fieldTypeOptions: [],
    field: '',
    keyword: '',
    column: [], //表头
    bu: [],
    ou: [],
    employee: [], //正式员工
    regularEmployee: [], //正式和离职员工
    currency: [], //币种
    date: [], //区间日期
    enumType: [], //枚举,enum为保留字，命名不能以enum命名！！！
    total: null, 
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    currentBU: '',
    currentOU: '',
    result: [],
    resultTwo: [],
    selectedOption: [],
    selectedOptionTwo: [],
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    formList: {},
  },

  /*componentDidMount() {
    this.props.dispatch({
        type: 'querySuccess',
    });
  },*/
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/data') {
          dispatch({
            type: 'queryList',
            payload: location.query,
          });
        }
      });
    },
  },
    effects: {
        *queryList({ payload }, { call, put }) {
          const data = yield call(queryFormList, payload);
          if(data) {
            yield put({
              type: 'queryListSuccess',
              payload: {formList: data}
            });
          }
        },
        *query({ payload }, { call, put }) {
          //获取数据和表头columns
          yield put({ type: 'showLoading' });
          let returnData = {};
          const columnData = yield call(queryColumn, payload);
          if(columnData){
            returnData.column = columnData;
            for(let i=0;i<columnData.length;i++){
              //如果表头含有下拉列表、人员信息、BU、OU、枚举、币种等，发送请求给后端获得数据
              if(columnData[i].type == 'BU'){
                const data = yield call(queryOther, 'BU');//请求BU数据
                if(data){
                  returnData = {...returnData, 'bu': data};
                }
              };
              if(columnData[i].type == 'separated_and_regular_employee'){
                const data = yield call(queryOther, 'separated_and_regular_employee');//请求BU数据//请求离职和正式员工信息
                if(data){
                  returnData = {...returnData, 'regularEmployee': data};
                }
              };
              if(columnData[i].type == 'regular_employee'){
                const data = yield call(queryOther, 'regular_employee');//请求正式员工信息
                if(data){
                  returnData = {...returnData, 'employee': data};
                }
              };
              if(columnData[i].type == 'OU'){
                const data = yield call(queryOther, 'OU');//请求OU数据
                if(data){
                  returnData = {...returnData, 'ou': data};
                }
              };
              if(columnData[i].type == 'currency'){
                const data = yield call(queryOther, 'currency');//请求币种
                if(data){
                  returnData = {...returnData, 'currency': data};
                }
              };
              if(columnData[i].type == 'enum_type'){
                const data = yield call(queryOther, {type: columnData[i].type,typeId: columnData[i].typeId});//请求枚举信息
                if(data){
                  returnData = {...returnData, 'enumType': data};
                }
              };
            };
          }
          const list = yield call(query,payload);
          if(list){
            returnData.list = list;
          }
          console.log('queryColumnSuccess',returnData);
          yield put({
              type: 'queryColumnSuccess',
              payload: returnData,
          });
          
        },
        *onSearch({ payload }, { call, put }) {
          const data = yield call(search, payload);
          if(data) {
            yield put({
              type: 'searchSuccess',
              payload: {result: data}
            });
          }
        },
        *onSearchTwo({ payload }, { call, put }) {
          const data = yield call(searchTwo, payload);
          if(data) {
            yield put({
              type: 'searchSuccessTwo',
              payload: {resultTwo: data}
            });
          }
        },
        *'delete'({ payload }, { call, put }) {
          yield put({ type: 'showLoading' });
          const data = yield call(remove, { id: payload });
          if (data && data.success) {
            yield put({
              type: 'deleteSuccess',
              payload,
            });
          }
        },
        *create({ payload }, { call, put }) {
          yield put({ type: 'hideModal' });
          yield put({ type: 'showLoading' });
          const data = yield call(create, payload);
          if (data && data.success) {
            yield put({
              type: 'createSuccess',
              payload,
              /*payload: {
                list: data.data,
                total: data.page.total,
                current: data.page.current,
                field: '',
                keyword: '',
              },*/
            });
          }
        },
        *update({ payload }, { select, call, put }) {
          yield put({ type: 'hideModal' });
          yield put({ type: 'showLoading' });
          //const id = yield select(({ form }) => form.currentItem.id);
          //const newUser = { ...payload, id };
          console.log('newUser',payload);
          const data = yield call(update, payload);
          if (data && data.success) {
            yield put({
              type: 'updateSuccess',
              payload: payload,
            });
          }
        },
    },
    reducers: {
        showLoading(state){
            return { ...state, loading: true };
        }, // 控制加载状态的 reducer
        showModal(state,action){
            //console.log(state);
            //console.log(action.payload);
            return { ...state, ...action.payload, modalVisible: true, modalVisibleOne: true };
        }, // 控制 Modal 显示状态的 reducer
        hideModal(state){
            return { ...state, modalVisible: false, modalVisibleOne: false };
        },
        // 使用静态数据返回
        queryColumnSuccess(state,action){
          return { ...state, ...action.payload, loading: false };
        },
        createSuccess(state,action){
            return { ...state, ...action.payload, loading: false };
        },
        deleteSuccess(state,action){
            const id = action.payload;
            const newList = state.list.filter(user => user.id !== id);
            return { ...state, list: newList, loading: false };
        },
        updateSuccess(state,action){
            const updateUser = action.payload;
            const newList = state.list.map(user => {
                if (user.id === updateUser.id) {
                    return { ...user, ...updateUser };
                }
                return user;
            });
            return { ...state, list: newList, loading: false };
        },
        updateQueryKey(state, action) {
            return { ...state, ...action.payload };
        },
        change(state,action) {
          return { ...state, ...action.payload };
        },
        searchSuccess(state,action) {
          return { ...state, ...action.payload };
        },
        searchSuccessTwo(state,action) {
          return { ...state, ...action.payload };
        },
        selectSuccess(state,action) {
          return { ...state, selectedOption: action.payload };
        },
        selectSuccessTwo(state,action) {
          return { ...state, selectedOptionTwo: action.payload };
        },
        queryListSuccess(state,action) {
          return { ...state, ...action.payload };
        }
    }
}