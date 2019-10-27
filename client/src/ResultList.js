import React, { Component } from 'react';

class ResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        };
    }

    componentDidMount() {
        let key = this.props.processName.split(" ").join("_").toLowerCase()+":"+this.props.eventName.split(" ").join("_").toLowerCase()+":result"
        if (this.props.sse[key]){
            let result = JSON.parse(this.props.sse[key]);
            if (result.length>0) {
                this.setState(Object.assign({}, {result: result}));   
            }
        }
    }

    createResultTable = (key) => {
        let table = []
        let result = JSON.parse(this.props.sse[key]);
        if (result.length>0) {
            table.push(<table><thead><tr>)
            table.push(<th style="width: '220px'">Timestamp</th>)
            table.push(<th style="width: '350px'">Data</th>)
            table.push(</tr></thead><tbody>)
            table.push(</tbody></table>)
        } else {
            table.push(<div>No result found yet.</div>)
        }
        return table
    }

    render() {
        return (
            <div>
                {this.state.result.length > 0 ?
                    <table>
                    <thead>
                    <tr>
                    <th style={{width: '220px'}}>Timestamp</th>
                    <th style={{width: '350px'}}>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.result.map((item) => (
                            <tr><td>{item.timestamp}</td><td>{JSON.stringify(item.data)}</td></tr>
                        ))}
                    </tbody>
                    </table>
                : <div>No result found yet.</div>
                }
            </div>
        )
    }
}
export default ResultList;