import { create, remove, update, query } from '../services/form';
import { parse } from 'qs';
import reqwest from 'reqwest';
export default {
  namespace: 'form',

  state: {
    list: [],
    field: '',
    keyword: '',
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
        if (location.pathname === '/form') {
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
          const id = yield select(({ form }) => form.currentItem.id);
          const newUser = { ...payload, id };
          //console.log(newUser);
          const data = yield call(update, newUser);
          if (data && data.success) {
            yield put({
              type: 'updateSuccess',
              payload: newUser,
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
          /*const mock = {
            total: 5, 
            current: 1, 
            loading: false, 
            list: [
              {
                id: 1,
                name: '张三',
                explain: '成都',
              },
              {
                id: 2,
                name: '李四',
                explain: '杭州',
              },
              {
                id: 3,
                name: '王五',
                explain: '上海',
              },
            ],

          };
          return {...state, ...mock, loading: false};*/
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
    }
}