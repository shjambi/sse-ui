import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import EventForm from './EventForm';

const styles = {
//   fontFamily: 'sans-serif',
  fontSize: '14px',
  paddingLeft: '25px',
  paddingBottom: '20px',
//   background: '#f4f4f4',
};

class EventHeader extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
    //extra
    this.handleNewEvent = this.handleNewEvent.bind(this);
    //extra
  }
  openSlider = () => {
    this.setState({
      isOpen: true
    });
  }
  closeSlider = () => {
    this.setState({
      isOpen: false
    });
  }
  handleNewEvent(newEvent) {
    // alert(JSON.stringify(newEvent))
    this.props.onNewEvent(newEvent);
  }
  render () {
    return (
        <div style={styles}>
          <h4>Active Events</h4>
          <a href='' onClick={this.openSlider}>New Active Event</a>
          <Slider 
            verticalOffset={{top: 118, bottom: 0}}
            title='Event Form'
            footer={
              <div style={{padding: '15px'}}>
                <a href='' onClick={this.closeSlider}>Close Form</a>
              </div>
            }
            isOpen={this.state.isOpen}
            onOutsideClick={this.closeSlider}>
            <div style={{padding: '15px'}}>
              <EventForm onNewEvent={this.handleNewEvent}/>
            </div>
            </Slider>
        </div>
      );
  };
}
export default EventHeader;