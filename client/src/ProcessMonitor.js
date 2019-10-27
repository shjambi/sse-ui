import React, { Component } from 'react';
import ViewResult from './ViewResult';

class ProcessMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          eventList: []
        };
    }

    componentDidMount() {
        this.getMonitoredJobAPI()
    }

    getMonitoredJobAPI() {
        const axios = require('axios');
        let data = JSON.stringify({pt_name: this.props.processName})
        axios({
            url: process.env.REACT_APP_BACKEND_MONITOR_JOBS, 
            method: 'POST', 
            headers: {'content-type': 'application/json'}, 
            data: data})
        .then(
            response => {
                // console.log(response.data);
                var eventList = [];    
                if (JSON.stringify(response.data) !== '{}') {                                        
                    for(var event in response.data) {
                        var jsonEventData = {};
                        jsonEventData["event_name"] = response.data[event]["event_name"];
                        jsonEventData["status"] = response.data[event]["status"];
                        eventList.push(jsonEventData);
                    }                    
                }
                this.setState({
                    eventList: eventList
                });    
                console.log(this.state.eventList)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return( 
            <div>   
                { this.state.eventList.length > 0 ?       
                <table>
                <thead>
                    <tr>
                    <th style={{width: '220px'}}>Event Name</th>
                    <th style={{width: '100px'}}>Status</th>
                    <th style={{width: '160px'}}>Collected Tweets</th>
                    <th style={{width: '160px'}}>Processed Tweets</th>
                    <th style={{width: '180px'}}>Results</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.eventList.map((event) => (    
                    <tr>
                    <td style={{paddingTop: '15px'}}>{event.event_name}</td>
                    <td style={{paddingTop: '15px'}}>{event.status}</td>
                    <td style={{paddingTop: '15px'}}>{
                        this.props.sse[event.event_name.toLowerCase().replace(" ", "_")+":counter"] ?
                        this.props.sse[event.event_name.toLowerCase().replace(" ", "_")+":counter"] 
                        : 0}
                    </td>
                    <td style={{paddingTop: '15px'}}>{
                        this.props.sse[this.props.processName.toLowerCase().replace(" ", "_")+":"+event.event_name.toLowerCase().replace(" ", "_")+":processed"] ?
                        this.props.sse[this.props.processName.toLowerCase().replace(" ", "_")+":"+event.event_name.toLowerCase().replace(" ", "_")+":processed"] 
                        : 0}
                    </td>
                    <td style={{paddingTop: '15px'}}>
                        <ViewResult 
                            eventName={event.event_name} 
                            processName={this.props.processName} 
                            sse={this.props.sse}
                            title={this.props.processName+": "+event.event_name}
                            subtitle={"Result retrieved for '"+event.event_name+"' event"}
                        />                        
                    </td>
                    </tr>                                     
                ))}
                </tbody>
                </table>
                : <div>No events found</div>}
            </div>
        )       
    }
}
export default ProcessMonitor;