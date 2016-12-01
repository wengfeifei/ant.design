import { create, remove, update, query, queryType } from '../services/field';
import React, { PropTypes } from 'react';
import { parse } from 'qs';
import reqwest from 'reqwest';
export default {
  namespace: 'field',

  state: {
    list: [],
    fieldTypeOptions: [],
    field: '',
    keyword: '',
    entityId: null,
    total: null, 
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalVisibleOne: false,
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
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
        if (location.pathname === '/field') {
          dispatch({
            type: 'getEntityId',
            payload: location.query,
          });
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
    effects: {
        *query({ payload }, { call, put }) {
          yield put({ type: 'showLoading' });
          yield put({ type: 'updateQueryKey', payload });
          const data = yield call(query, payload);
          if (data && data.success) {
            yield put({
                type: 'querySuccess',
                payload: {
                  list: data.content.data,
                  total: data.content.totalCount,
                  current: data.content.currentPage
                }
            });
          }
        },
        *queryType({ payload }, { call, put }) {
          yield put({ type: 'showModal' });
          const data = yield call(queryType, payload);
          if (data && data.success) {
            yield put({
                type: 'queryTypeSuccess',
                payload: {
                  ...payload,
                  typeList: data.content
                }
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
          const id = yield select(({ field }) => field.currentItem.id);
          const newUser = { ...payload, id };
          console.log('newUser',newUser);
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
        querySuccess(state,action){
          return { ...state, ...action.payload, loading: false };
        },
        queryTypeSuccess(state,action){
            const fieldType = action.payload.typeList;
            return { ...state, ...action.payload, fieldTypeOptions: fieldType, loading: false };
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
        getEntityId(state,action) {
          return{ ...state, ...action.payload };
        }
    }
}