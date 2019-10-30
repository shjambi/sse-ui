import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import EventMonitor from './EventMonitor'
import { object } from 'prop-types';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.event.id,
            name: this.props.event.name,
            terms: this.props.event.terms,
            active: this.props.event.active,
            counter: 0,
            isPaneOpen: false,
            isPaneOpenLeft: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState(Object.assign({}, 
        {counter: this.props.sse[this.props.counter] ? this.props.sse[this.props.counter] : 0}));
    }

    getStyle= () => {
        return {
            // background: '#FA8072',
            textAlign: 'left',
            fontSize: '14px',
            padding: '5px',
            paddingTop: '10px',
            color: this.props.event.active ? '#C0392B' : '#154360',
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            borderWidth: 0,
            // borderRadius: 15 
        }
    }

    handleSubmit(e) {
        let msg = ""
        if (this.state.active) {
            msg = `Are you sure you want to deactivate the event '${this.state.name}'?`
        } else {
            msg = `Are you sure you want to activate the event '${this.state.name}'?`
        }
        if (window.confirm(msg)) {
            this.updateEventAPI(this.state.id, !this.state.active)
        }
    }

    updateEventAPI(eventId, newValue) {
        console.log("PUT REST API for an existing event " + eventId)
        console.log(process.env.REACT_APP_BACKEND_EVENTS)
        const axios = require('axios');
        axios.put(process.env.REACT_APP_BACKEND_EVENTS + '/' + eventId, {active: newValue})
          .then(function(response){
            console.log("PUT Success")
          })
          .catch(function(error){
            console.log("PUT Error")
            console.log(error);
          });
    }

    termList = () => {
        return(
        this.props.event.terms
            .map(t => <span style={{fontSize: '12px'}}>{t}</span>)
            .reduce((prev, curr) => [prev, ', ', curr])
        )
    }

    render() {
        return (
            <tbody>
            <tr>
            <td style={{paddingTop: '15px', textAlign: 'left'}}>
                {this.state.name}<br/>{this.termList()}
            </td>
            <td style={{paddingTop: '15px', textAlign: 'center'}}>         
                {this.props.sse[this.props.counter] ? 
                this.props.sse[this.props.counter] 
                : this.state.counter}
            </td>
            <td style={{paddingTop: '15px', textAlign: 'center'}}>
                {this.state.active ? "Active" : "Inactive"}
            </td>
            <td style={{paddingTop: '15px', textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
                <input type="submit" 
                    value={this.state.active? "Deactivate": "Activate"}
                    disabled={!this.state.active}/>
            </form>
            </td>
            <td style={{paddingTop: '15px', textAlign: 'center'}}>
                <button onClick={() => this.setState({ isPaneOpen: true })}>View Jobs
                </button>
            </td>
            <SlidingPane
                height= '50vh'
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.state.name}
                subtitle={this.termList()}
                onRequestClose={ () => {
                    this.setState({ isPaneOpen: false });
                } }>
                <EventMonitor key={this.state.id} 
                    eventName={this.state.name} 
                    counter={this.state.name.split(" ").join("_").toLowerCase()+":counter"}
                    sse={this.props.sse}
                />
                <br />
            </SlidingPane>
            </tr>
            </tbody>
        )
    }
}
export default Event;