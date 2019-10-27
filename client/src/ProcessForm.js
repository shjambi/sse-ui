import React, { Component } from 'react';

class ProcessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProcess: {
        name: '',
        version: 0.0,
        url: "",
        active: true,
        // created_at: "",
        // updated_at: ""
      }       
    }
    this.handleProcessNameInputChange = this.handleProcessNameInputChange.bind(this);
    this.handleProcessUrlInputChange = this.handleProcessUrlInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleProcessNameInputChange(e) {
    let value = e.target.value;
    this.setState( prevState => ({ newProcess : 
         {...prevState.newProcess, name: value}
       }), () => console.log(this.state.newProcess))
   }
  handleProcessUrlInputChange(e) {
    let value = e.target.value;
    this.setState( prevState => ({ newProcess : 
         {...prevState.newProcess, url: value}
       }), () => console.log(this.state.newProcess))
  }
  handleSubmit (e) {
    console.log('Form value: ' + this.state.newProcess.name);
    var form = e.target;
    e.preventDefault();
    // e.target.reset();
    this.props.onNewProcess(this.state.newProcess);
    this.setState({
      newProcess: {
        name: '',
        version: 0.0,
        url: "",
        active: true,
      }       
    });   
    form.reset(); 
  }

  render() {
    return (
      <div>
        <h6>Add New Processing Technique:</h6>
        <form 
          style={{textAlign: 'left', fontSize: '14px'}} 
          onSubmit={this.handleSubmit}>
          <br/>     
          <label>
            <h6>Name:</h6>
            <input
              type="text" 
              name="name" 
              style={{width: "600px"}}
              value={this.state.newProcess.name} 
              onChange={this.handleProcessNameInputChange}/>
          </label>
          <br/>
          <label>
            <h6>URL:</h6>
            <input
              type="text" 
              name="url" 
              style={{width: "600px"}}
              value={this.state.newProcess.url} 
              onChange={this.handleProcessUrlInputChange}/>
          </label>
          <br/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
export default ProcessForm;