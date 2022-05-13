import React, { Component } from 'react';
import axios from "axios";
class Demo extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            data:[],
            button:"",
            id:""
        };
    }
    componentDidMount(){
        axios.get(`http://localhost:3002/user`).then((response) =>{
            this.setState({data : response.data});
            document.getElementById("formData").reset();
            this.setState({name:""})
        });
    }

    updateData = (e) => {
        this.setState({ name : e.name, button:"update", id:e._id});
    };
    
   deleteData = (e) => {
       axios.delete(`http://localhost:3002/user/${e}`).then((res) => {
           this.componentDidMount();
       })
   };
    

    formHandler = (e) =>{
        e.preventDefault();
        const user = {
            name : e.target.name.value,
        };

        if (this.state.button === "update") {
            axios
            .patch(`http://localhost:3002/user/${this.state.id}`, user)
            .then(this.componentDidMount());
            
        } else {
          axios
            .post(`http://localhost:3002/user`, user)
            .then(this.componentDidMount());
        }
      };
    render() {
        
console.log(this.state.button);
        return (
            <div className='demos' align="center">
                <h2>Data</h2>
                <form onSubmit={this.formHandler} method='post' id="formData">
                    <table border="1" width='200px'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" defaultValue={this.state.name}/></td>
                            </tr> 
                            <tr>
                            <td colSpan='2' align='center'>
                                <input type='submit' value="Submit" name='btnsave'/></td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                    <h2>Alteration</h2>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((name,id) => (
                                <tr key={id + 1}>
                                    <th>{id + 1}</th>
                                    <th>{name.name}</th>
                                    <th>
                                        <button onClick={() => this.updateData(name)}>Update</button>|
                                        <button onClick={()=>this.deleteData(name._id)}>Delete</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
            </div>
        );
    }
}

export default Demo;
