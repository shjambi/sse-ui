import React, { Component } from 'react';

class MonitorJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          eventList: []
        };
    }
    componentDidMount() {
        this.getMonitoredJobAPI()
    }
    getMonitoredJobAPI() {
        const axios = require('axios');
        let processId = this.props.processId;
        axios.get("http://localhost:3000/monitor_jobs/" + processId).then(
            result => {
                var event_dic = result.data['events'];     
                var eventList = [];       
                if (JSON.stringify(event_dic) != '{}') {                                        
                    for(var event in event_dic) {
                        var jsonEventData = {};
                        jsonEventData["name"] = event;
                        jsonEventData["description"] = event_dic[event];
                        eventList.push(jsonEventData);
                    }                    
                }
                this.setState({
                    isLoaded: true,
                    eventList: eventList
                });                      
            },
            error => {
                alert("Error")
                this.setState({
                    error
                });
            }
        );
    }
    render() {
        return( 
            <div>   
                { this.state.eventList ?       
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.eventList.map((event) => (                    
                        <tr>
                        <td style={{width: '220px'}}>{event.name}</td>
                        <td>{event.description.status}</td>
                        </tr>                  
                ))}
                </tbody>
                </table>
                // inline else has a problem
                : <div>No events found</div>}
            </div>
        )       
    }
}
export default MonitorJobs;