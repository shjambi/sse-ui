import React, { Component } from 'react';
import EventHeader from './EventHeader';
import Event from './Event';

const styles = {
  //   fontFamily: 'sans-serif',
    // fontSize: '14px',
    paddingLeft: '25px',
    paddingBottom: '20px',
  //   background: '#f4f4f4',
  };

class EventsMainPage extends Component {
  constructor() {
    super();
    this.handleNewEvent = this.handleNewEvent.bind(this);
  }

  handleNewEvent(newEvent) {
    this.props.onNewEvent(newEvent);
  }

  historicalFound = () => {
    let found = false;
    let i = 0;
    while(!found && i<this.props.eventsData.length){
      alert(this.props.eventsData[0].active)
      if (!this.props.eventsData[0].active)     
        found = true;
      i = i+1
    }
    console.log(found)
    return found
  }

  createTable = () => {
    let table = []
    let val = this.props.sse;
    for (var key in val) {
      // console.log("this is my key" + key + " and this is my value " + val[key])
      if (!key.includes('result'))
        table.push(<tr><td>{`${key}`}: </td><td>{`${val[key]}`}</td></tr>)
    }
    return table
  }

  render() {
    return (
      <div style={styles}>
        <EventHeader onNewEvent={this.handleNewEvent}/>
        { this.props.eventsData.length > 0 ? 
        <table>
          <thead>
              <tr>
              <th style={{width: '240px', textAlign: 'left'}}>Name</th>
              <th style={{width: '120px', textAlign: 'center'}}>Tweet Count</th>
              <th style={{width: '120px', textAlign: 'center'}}>Current Status</th>
              <th style={{width: '120px', textAlign: 'center'}}>Change Status</th>
              <th style={{width: '160px', textAlign: 'center'}}>Job Details</th>
              </tr>
          </thead>
            {this.props.eventsData.map((event) => ( 
              event.active ?
                <Event key={event.id}             
                event={event} 
                counter={event.name.split(" ").join("_").toLowerCase()+":counter"}
                sse={this.props.sse}/> 
              : null
            ))}
        </table>
        : <h6><br/>No events found.</h6>
        }
    
        { this.historicalFound ? 
        <div>
        <br/>
        <br/>
        <h5>Inactive Events</h5>
        <table>
          <thead>
              <tr>
              <th style={{width: '240px', textAlign: 'left'}}>Name</th>
              <th style={{width: '120px', textAlign: 'center'}}>Tweet Count</th>
              <th style={{width: '120px', textAlign: 'center'}}>Current Status</th>
              <th style={{width: '120px', textAlign: 'center'}}>Change Status</th>
              <th style={{width: '160px', textAlign: 'center'}}>Job Details</th>
              </tr>
          </thead>
            {this.props.eventsData.map((event) => ( 
              !event.active ?
                <Event key={event.id}             
                event={event} 
                counter={event.name.split(" ").join("_").toLowerCase()+":counter"}
                sse={this.props.sse}/> 
              : null
            ))}
        </table>
        </div>
        : null        
        }
        

        {/* <br/>
        <br/>
        <table>
        {this.createTable()}
        </table> */}
      </div>
    )
  }
}
export default EventsMainPage;