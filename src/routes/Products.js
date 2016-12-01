import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
var request = require('../utils/request');
import reqwest from 'reqwest';
var products = [];
const Products = (props) => {

  console.log("props：",props);
  function handleDelete(id) {
     props.fetch({action:'delete',id:id});
  }

  function handleEdit(id) {
      // props.dispatch({
      //   type: 'products/edit',
      //   payload: id,
      // });
      props.fetch({action:'edit',id:id});
  }

  function searchList(){
    reqwest({
      url: 'http://localhost:8080/chenxi/entity/search.jsonp',
      method: 'get',
      async:false,
      data:{currentPage:1,pageSize:10},
      type: 'jsonp',
    }).then(data => {
      return data.content.data;
      console.log("请求数据：",data.content.data);
      // this.setState({
      //   loading: false,
      //   total:data.content.totalCount,
      //   data: data.content.data
      // });
    }).catch(function(err){
      console.log("请求数据err：",err);
    });
  }

  console.log("Products",props);
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onEdit={handleEdit} onDelete={handleDelete} products={props.data} />
    </div>
  );
};

function mapStateToProps(state) {
  console.log('mapStateToProps',state);
  return state.products;
}

function mapDispatchToProps(dispatch) {
  return {
    fetch(count){
      dispatch({type: 'products/fetch', count});
    }
  }
}

// export default Products;
export default connect(mapStateToProps,mapDispatchToProps)(Products);