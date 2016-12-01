import React from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Form from './routes/Form';
import Field from './routes/Field';
import Data from './routes/Data';
import Products from './routes/Products';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/form" component={Form} />
      <Route path="/field" component={Field} />
      <Route path="/data" component={Data} />
      <Route path="/products" component={Products} />
    </Router>
  );
}