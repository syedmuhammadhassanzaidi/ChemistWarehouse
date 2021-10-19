import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import $ from 'jquery';
import { useHistory, Link } from 'react-router-dom';
import EditProduct from './EditProduct';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: 0,
            productName: '',
            price: 0,
            productType: '',
            active: 0
        }
        this.deleteData = this.deleteData.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount()
    {
        this.loadData();
    }

    componentDidUpdate()
    {
        this.loadData();
    }

    loadData()
    {
        fetch("api/products")
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                this.setState({ products: response });
            })
            .catch(error => console.log(error));
    }

    deleteData(id, productName, price, productType, active)
    {
        this.setState({ id: id, productName: productName, price: price, productType: productType, active: active })
        let data = { ID: this.state.id, ProductName: this.state.productName, Price: this.state.price, ProductType: this.state.productType, Active: this.state.active }
        $.ajax({
            url: "api/products/Delete",
            type: "DELETE",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (res) {
                console.log(res);
            }
        });
        //this.loadData();
    }

    editData(id)
    {
        this.setState({ id: id });
        let data = { ID: this.state.id }
        $.ajax({
            url: "api/products/edit",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (res) {
                console.log(res);
            }
        });
    }

  render () {
      return (
        <div className="app-container">
              <h1>Welcome to Chemist Warehouse!</h1>
              <Link to="/add-product" className="btn btn-primary">Add Product</Link>
              <Table celled striped>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>ID</Table.HeaderCell>
                          <Table.HeaderCell>Product Name</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Product Type</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>

                  <Table.Body>
                      {this.state.products.map(products => {
                          return (
                              <Table.Row key={products.id}>
                                  <Table.Cell>{products.id}</Table.Cell>
                                  <Table.Cell>{products.productName}</Table.Cell>
                                  <Table.Cell>{products.price}</Table.Cell>
                                  <Table.Cell>{products.productType}</Table.Cell>
                                  <Table.Cell>
                                      <Button color='yellow' onClick={() => this.deleteData(products.id)}>Edit</Button>
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Button negative onClick={() => this.editData(products.id, products.productName, products.price, products.productType, products.active)}>Delete</Button>
                                  </Table.Cell>
                              </Table.Row>
                          )
                      })}
                  </Table.Body>
              </Table>
        </div>
    );
  }
}
