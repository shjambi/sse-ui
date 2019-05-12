import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import MonitorEvents from './MonitorEvents'

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPaneOpen: false,
          isPaneOpenLeft: false
        };
    }
    getStyle= () => {
        return {
            // background: '#FA8072',
            textAlign: 'left',
            fontSize: '14px',
            padding: '2px',
            paddingLeft: '25px',
            // height: '35px',
            // borderBottom: '1px #ccc dotted',
            color: this.props.event.active ? '#C0392B' : '#154360',
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            borderWidth: 5,
            // borderRadius: 15 
        }
    }
    render() {
        return (
            <div>
            <button style={this.getStyle()}
            onClick={() => this.setState({ isPaneOpen: true })}>{this.props.event.name}</button>
            <SlidingPane
                height= '50vh'
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.props.event.name}
                subtitle={this.props.event.terms}
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                } }>
                <MonitorEvents eventId={this.props.event.id}/>
                <br />
            </SlidingPane>
            </div>
        )
    }
}
export default Event;