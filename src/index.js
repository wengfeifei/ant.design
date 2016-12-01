import './index.html';
import './index.less';
import dva from 'dva';
import 'antd/dist/antd.css';
import moment from 'moment';

moment.locale('zh-cn')

// 1. Initialize
// const app = dva();
const app = dva({
   initialState: {
	    products: {
	     data:[
	       { name: 'dva', id: 1 },
	       { name: 'antd', id: 2 },
	       { name: 'robin', id: 3 },
	     ]
	 	},
   },
 });

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));
app.model(require('./models/form.js'));
app.model(require('./models/field.js'));
app.model(require('./models/data.js'));
// app.model(require('./models/example'));
app.model(require('./models/products'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
