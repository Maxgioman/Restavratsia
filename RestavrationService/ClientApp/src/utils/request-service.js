import React, {Component} from 'react';
import axios from 'axios'

class RequestService extends Component {
    constructor(props){
        super(props);
        this.state ={
            users: []
        }
    }
    fetcheddata(){
        axios.get('https://jsonplaceholder.typicode.com/users').
            then(response =>{
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default RequestService;