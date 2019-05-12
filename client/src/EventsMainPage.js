import React, { Component } from 'react';
import EventHeader from './EventHeader';
import Event from './Event';

class EventsMainPage extends Component {
  constructor() {
    super();
    this.handleNewEvent = this.handleNewEvent.bind(this);
  }
  handleNewEvent(newEvent) {
    // alert(JSON.stringify(newEvent))
    this.props.onNewEvent(newEvent);
  }
  render() {
    // return (
    //   this.props.eventsData.map((event) => (
    //     <Event key={event.name} event={event}/>
    //   ))
    // )
    return (
      <div>
        <EventHeader onNewEvent={this.handleNewEvent}/>
        {this.props.eventsData.map((event) => (
          <Event key={event.name} event={event}/>
        ))}
      </div>
    )
  }
}
export default EventsMainPage;