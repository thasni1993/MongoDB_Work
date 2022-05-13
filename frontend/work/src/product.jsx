import React, { Component } from 'react';
import axios from "axios";

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        };
    }
    componentDidMount(){
        axios.get(`http://localhost/3004/data`).then((req,res) => {
            this.setState( { data:res.data } );
            document.getElementById("formid").reset();
            this.setState({name:""});
        })
        console.log(this.state.name);
        };
        deleteData = (e) => {
            axios.delete(`http://localhost:3004/data/${e}`).then((res) => {
              this.componentDidMount();
            });
          };
        
          formHandler = (e) => {
            e.preventDefault();
        
            const us = {
              name: e.target.name.value,
            };
        
            if (this.state.button === "submit") {
                axios
                .patch(`http://localhost:3004/data/${this.state.id}`, us)
                .then(this.componentDidMount());
            } else {
              axios
                .post(`http://localhost:3004/data`, us)
                .then(this.componentDidMount());
            }
          };
       
    render() {
        return (
            <div>
                <form onSubmit={this.formHandler} method="POST" id="formid">
                    <h1 align="center">Names</h1>
                    <table align="center" border="1">
                        <tbody>
                            <tr>
                            <th>Name</th>
                                <td><input type='text' name="pname" defaultValue={this.state.name}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center"><input type="submit" name="btnsubmit" value="SUBMIT"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <h2 align="center">Details</h2>
                    <table align="center" border="1" style={{ borderCollapse: "collapse" }} width="250">
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((name,id)=>(
                                <tr key={id+1}>
                                    <th>{id+1}</th>
                                    <th>{name.name}</th>
                                    <th><button onClick={() => this.deleteData(name._id)}>DELETE</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </form>
            </div>
        );
    }
}
export default Product;



