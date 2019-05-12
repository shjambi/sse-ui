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
    e.preventDefault();
    this.props.onNewProcess(this.state.newProcess);
  }
  render() {
    return (
      <div>
        <h5 style={{textAlign: 'left', height: '2px'}}>Add New Process:</h5>
        <form 
          style={{textAlign: 'left', fontSize: '14px'}} 
          onSubmit={this.handleSubmit}>
          <br/>     
          <label>
            Name:
            <input
              type="text" 
              name="name" 
              value={this.state.newProcess.name} 
              onChange={this.handleProcessNameInputChange}/>
          </label>
          <br/>
          <label>
            URL:
            <input
              type="text" 
              name="url" 
              value={this.state.newProcess.url} 
              onChange={this.handleProcessUrlInputChange}/>
          </label>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
export default ProcessForm;