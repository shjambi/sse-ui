import React, { Component } from 'react';

class MonitorEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          processList: []
        };
    }
    componentDidMount() {
        this.getMonitoredJobAPI()
    }
    getMonitoredJobAPI() {
        const axios = require('axios');
        let eventId = this.props.eventId;
        axios.get("http://localhost:3000/monitor_events/" + eventId).then(
            result => {
                var process_dic = result.data['processing_jobs'];     
                var processList = [];       
                if (JSON.stringify(process_dic) !== '{}') {                                        
                    for(var process in process_dic) {
                        var jsonProcessData = {};
                        jsonProcessData["name"] = process;
                        jsonProcessData["description"] = process_dic[process];
                        processList.push(jsonProcessData);
                    }                    
                }
                this.setState({
                    isLoaded: true,
                    processList: processList
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
                { this.state.processList ?       
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.processList.map((process) => (                    
                        <tr>
                        <td style={{width: '220px'}}>{process.name}</td>
                        <td>{process.description.status}</td>
                        </tr>                  
                ))}
                </tbody>
                </table>
                // inline else has a problem
                : <div>No processing techniques found</div>}
            </div>
        )
        
    }
}
export default MonitorEvents;