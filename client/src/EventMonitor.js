import React, { Component } from 'react';
import ViewResult from './ViewResult';

class EventMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processList: [],
        };
    }
    componentDidMount() {
        this.getMonitoredJobAPI()
    }

    getMonitoredJobAPI() {
        const axios = require('axios');
        console.log("GET REST API for event's jobs")
        console.log(process.env.REACT_APP_BACKEND_MONITOR_JOBS)
        let data = JSON.stringify({event_name: this.props.eventName})
        axios({
            url: process.env.REACT_APP_BACKEND_MONITOR_JOBS, 
            method: 'POST', 
            headers: {'content-type': 'application/json'}, 
            data: data})
        .then(
            response => {
                // console.log(response.data);   
                var processList = [];    
                if (JSON.stringify(response.data) !== '{}') {                                        
                    for (var process in response.data) {
                        var jsonProcessData = {};
                        jsonProcessData["pt_name"] = response.data[process]["pt_name"];
                        jsonProcessData["status"] = response.data[process]["status"];
                        jsonProcessData["pt_url"] = response.data[process]["pt_url"];
                        processList.push(jsonProcessData);
                    }                    
                }
                this.setState({
                    processList: processList
                });    
                console.log(this.state.processList)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return( 
            <div>     
                { this.state.processList.length > 0 ?       
                <table>
                <thead>
                    <tr>
                    <th style={{width: '140px'}}>Process Name</th>
                    <th style={{width: '100px'}}>Status</th>
                    <th style={{width: '320px'}}>Url</th>
                    <th style={{width: '160px'}}>Collected Tweets</th>
                    <th style={{width: '160px'}}>Processed Tweets</th>
                    <th style={{width: '180px'}}>Results</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.processList.map((process) => (                    
                    <tr>
                    <td style={{paddingTop: '15px'}}>{process.pt_name}</td>
                    <td style={{paddingTop: '15px'}}>{process.status}</td>
                    <td style={{paddingTop: '15px'}}>{process.pt_url}</td>                 
                    <td style={{paddingTop: '15px'}}>
                        {
                        this.props.sse[this.props.counter] ?
                        this.props.sse[this.props.counter]
                        : 0}
                    </td>
                    <td style={{paddingTop: '15px'}}>{
                        this.props.sse[process.pt_name.split(" ").join("_").toLowerCase()+":"+this.props.eventName.split(" ").join("_").toLowerCase()+":processed"] ?
                        this.props.sse[process.pt_name.split(" ").join("_").toLowerCase()+":"+this.props.eventName.split(" ").join("_").toLowerCase()+":processed"]
                        : 0}
                    </td>
                    <td style={{paddingTop: '15px'}}>
                        <ViewResult 
                            eventName={this.props.eventName} 
                            processName={process.pt_name} 
                            sse={this.props.sse}
                            title={this.props.eventName+": "+process.pt_name}
                            subtitle={"Result retrieved from '"+process.pt_name+"' processing technique"}
                        />
                    </td>
                    </tr>                  
                ))}
                </tbody>
                </table>
                : <div>No processing techniques found</div>
                }
            </div>
        )
        
    }
}
export default EventMonitor;