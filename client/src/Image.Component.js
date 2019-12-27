import React,{Component} from 'react';
import axios from 'axios';
import './App.css';
import {withRouter} from 'react-router-dom';

class ImageUpload extends Component {

  constructor(props){
    super(props);
    this.state={
        base64String:"",
        type:'data:image/jpeg;base64'
    }
  }
  getImage(id){
    axios.get('/imageUpload/getPhoto?id='+id,{  headers: {
      Authorization: 'Bearer ' + localStorage.getItem("token")
    }}).then((result)=>{
      if(result.data.msg){
        alert(result.data.msg);
      } else {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(result.data.image.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let  newImage=window.btoa(binary);
        this.setState({base64String:newImage});
        console.log("newImage:",newImage);
      }
    }).catch((err)=>{
      console.log("err:"+err);
    })
  }
  formSubmit=async (e)=>{
    e.preventDefault();
    let formId=document.getElementById("formElem");
    let response = await fetch('/imageUpload/uploadPhoto', {
      method: 'POST',
      body: new FormData(formId)
    });

    let result = await response.json();
    this.getImage(result.imageId);
    console.log("image:",JSON.stringify(result));
  }
  logout=()=>{
    localStorage.removeItem("token");
    this.props.history.push('/login');
  }
  render(){
    return (
      <div className="App">
        <form id="formElem"  encType="multipart/form-data">
            <div>
                <label htmlFor="image">Image</label>
                <input 
                    type="file" 
                    name="image" 
                    id="image" />
                <button type="submit" onClick={this.formSubmit}>Submit</button>    
                
            </div>

        </form>
        <div>
          <button onClick={this.logout}>Logout</button>
        </div>
        <div>
          <img src={this.state.type+","+this.state.base64String}/>
        </div>
      </div>
    );
  }
  
}

export default withRouter(ImageUpload);
