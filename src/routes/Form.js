import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import FormList from '../components/Form';
//import AddForm from '../components/AddForm';
import reqwest from 'reqwest';


// 引入对应的样式
// 可以暂时新建一个空的
import styles from './Form.less';

function Form({ location, dispatch, form }) {

  const {
    loading, list, total, current, name,
    currentItem, modalVisible, modalVisibleOne, modalType,getFieldDecorator
    } = form;
  const formListProps={
  		modalVisible: modalVisible,
  		modalVisibleOne: modalVisibleOne,
  		currentItem: currentItem,
        dataSource: list,
        total,
        loading,
        current,
        onDeleteItem(id) {
	        dispatch({
	        	type: 'form/delete',
	        	payload: id,
	        });
	    },
	    onEditItem(item) {
		    dispatch({
		        type: 'form/showModal',
		        payload: {
		            currentItem: item,
		        },
		    });
	    },
	    onCancel() {
	    	dispatch({
		        type: 'form/hideModal',
		    });
	    },
		onUpdate(item) {
		    dispatch({
		        type: 'form/update',
		        payload: {
		        	modalType: 'update',
		        	description: item.description,
		        	entityKey: item.entityKey,
		        	name: item.name,
		        },
		    });
		},
		onAdd(item) {
        	dispatch({
	        	type: 'form/create',
	        	payload: {
		            name: item.name,
	                entityKey: item.entityKey,
	                description: item.description,
	                appId: 1,
		        },
	        });
        },
        onPageChange(item) {
        	dispatch({
        		type: 'form/query',
	        	payload: {
	        		currentPage: item,
	        	}
        	});
        }
    };

  return (
    <div>
    	
    	<FormList {...formListProps} />
    </div>

  );
}


Form.propTypes = {
  form: PropTypes.object,
};
// 指定订阅数据，这里关联了 form
function mapStateToProps({ form }) {
  return {form};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Form);