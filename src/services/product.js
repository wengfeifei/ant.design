import request from '../utils/request';

export async function query(params) {
  	console.log('product.query',params);
  	return request({
		  url: 'http://localhost:8080/chenxi/entity/search.jsonp',
		  method: 'get',
		  data:params,
		  type: 'jsonp',
		});
}
