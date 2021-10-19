import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            productName: '',
            price: 0,
            productType: '',
            active: true
        }
        this.addData = this.addData.bind(this);
        this.Validation = this.Validation.bind(this);
    }

    addData()
    {
        let data = { ProductName: this.state.fields["name"], Price: this.state.fields["price"], ProductType: this.state.fields["type"], Active: this.state.active }
        $.ajax({
            url: "api/products/AddProduct",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (res) {
                console.log(res);
            }
        });
    }

    Validation()
    {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"])
        {
            formIsValid = false;
            errors["name"] = "Product Name cannot be empty";
        }

        if (typeof fields["name"] !== "undefined")
        {
            if (!fields["name"].match(/^[a-zA-Z]+$/))
            {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        if (!fields["price"])
        {
            formIsValid = false;
            errors["price"] = "Product Price cannot be empty";
        }

        if (!fields["type"])
        {
            formIsValid = false;
            errors["type"] = "Product Type cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    Submit(e) {
        e.preventDefault();

        if (this.Validation())
        {
            console.log(this.state.fields["name"]);
            console.log(this.state.fields["price"]);
            console.log(this.state.fields["type"]);
            this.addData();
        }
        else
        {
            console.log(this.state.fields["name"]);
            console.log(this.state.fields["price"]);
            console.log(this.state.fields["type"]);
            //alert("Form has errors.");
        }
    }

    handleChange(field, e)
    {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div className="app-container">
                <h1>Add Product</h1>
                <form name="productForm" className="contactform" onSubmit={this.Submit.bind(this)}>
                    <div className="form-group">
                        <fieldset>
                            <label for="productName">Product Name</label>
                            <input ref="name" type="text" className="form-control" id="productName" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                            <strong><span className="error">{this.state.errors["name"]}</span></strong>
                            <br /><br />
                            <label for="productPrice">Price</label>
                            <input ref="price" type="number" className="form-control" id="productPrice" onChange={this.handleChange.bind(this, "price")} value={this.state.fields["price"]} />
                            <strong><span className="error">{this.state.errors["price"]}</span></strong>
                            <br /><br />
                            <label for="productType">Product Type</label>
                            <input ref="type" type="text" className="form-control" id="productType" onChange={this.handleChange.bind(this, "type")} value={this.state.fields["type"]} />
                            <strong><span className="error">{this.state.errors["type"]}</span></strong>
                            <br /><br />
                        </fieldset>
                        <br />
                        <Button primary onClick={() => this.addData()}>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}