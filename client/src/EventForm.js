import React, { Component } from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: {
        name: '',
        terms: [],
        active: true,
        // created_at: "",
        // updated_at: "",
        // ended_at: ""
      }       
    }
    this.handleEventNameInputChange = this.handleEventNameInputChange.bind(this);
    this.handleEventTermsInputChange = this.handleEventTermsInputChange.bind(this);
    this.handleEventActiveInputChange = this.handleEventActiveInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleEventNameInputChange(e) {
    let value = e.target.value;
    this.setState( prevState => ({ newEvent : 
         {...prevState.newEvent, name: value}
       }), () => console.log(this.state.newEvent))
   }

  handleEventTermsInputChange(e) {
    let value = e.target.value;
    this.setState( prevState => ({ newEvent : 
          {...prevState.newEvent, terms: value.split(",")}
        }), () => console.log(this.state.newEvent))
  }

  handleEventActiveInputChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.active;
    this.setState( prevState => ({ newEvent:
      {...prevState.newEvent, active: value }
    })
    )
  }

  handleSubmit(e) {
    console.log('Form value: ' + this.state.newEvent.name);
    var form = e.target;
    e.preventDefault();
    // e.target.reset();
    this.props.onNewEvent(this.state.newEvent); 
    this.setState({
      newEvent: {
        name: '',
        terms: [],
        active: true
      }       
    });   
    form.reset(); 
  }

  render() {
    return (
      <div>
        <h6>Add New Event:</h6>
        <form           
          onSubmit={this.handleSubmit}>
          <br/>
          <label>
            <h6>Name:</h6>
            <input
              type="text" 
              name="name" 
              style={{width: "600px"}}
              value={this.state.newEvent.name} 
              onChange={this.handleEventNameInputChange}/>
          </label>
          <br/>
          <label>
            <h6>Terms:</h6>
            <input 
              type="text" 
              name="terms" 
              style={{width: "600px"}}
              placeholder="Enter terms separated by commas"
              value={this.state.newEvent.terms} 
              onChange={this.handleEventTermsInputChange}/>
          </label>
          <br/>
          <label >
            <h6 style={{marginTop: "10px"}}>Active: &emsp;          
            <input 
              type="checkbox" 
              name="active" 
              defaultChecked={this.state.newEvent.active} 
              onChange={this.handleEventActiveInputChange}/>  
              </h6>                    
          </label>  
          <br/>  
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
export default EventForm;