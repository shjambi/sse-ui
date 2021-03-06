import React from 'react';  
import './style.css';  
// import EventForm from './EventForm';

class Popup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
          newEvent: {
            name: '',
            terms: [],
            active: false,
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
    
      handleSubmit (e) {
        // alert(JSON.stringify(this.state.newEvent))
        console.log('Form value: ' + this.state.newEvent.name);
        var form = e.target;
        e.preventDefault();
        // e.target.reset();
        this.props.onNewEvent(this.state.newEvent); 
        this.setState({
          newEvent: {
            name: '',
            terms: [],
            active: false
          }       
        });   
        form.reset(); 
      }
    

    render() {  
        return (  
        <div className='popup'>  
            <div style={{padding: '15px'}} className='popup\_inner'>  
                <h5>Event Form</h5>  
                <hr></hr>
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
                        placeholder="Enter terms sperated by commas"
                        value={this.state.newEvent.terms} 
                        onChange={this.handleEventTermsInputChange}/>
                    </label>
                    <br/>
                    <label >
                        <h6 style={{marginTop: "10px"}}>Is Active: &emsp;          
                        <input 
                        type="checkbox" 
                        name="active" 
                        value={this.state.newEvent.active} 
                        onChange={this.handleEventActiveInputChange}/>  
                        </h6>                    
                    </label>  
                    <br/>  
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <div style={{padding: '10px 0px 0px 0px'}}>
                    <button onClick={this.props.closePopup}>Close Form</button>  
                </div>
            </div>  
        </div>  
        );  
    }  
}  

export default Popup;