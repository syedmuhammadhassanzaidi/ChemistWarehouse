import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AddProduct } from './components/AddProduct';
import { EditProduct } from './components/EditProduct';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/add-product' component={AddProduct} />
        <Route path='/edit-product' component={EditProduct} />
      </Layout>
    );
  }
}
