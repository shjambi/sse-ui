import React, { Component } from 'react';
import ProcessHeader from './ProcessHeader';
import Process from './Process';

class Processes extends Component {
  constructor() {
    super();
    this.handleNewProcess = this.handleNewProcess.bind(this);
  }
  handleNewProcess(NewProcess) {
    this.props.onNewProcess(NewProcess);
  }
  render() {
    // return this.props.processesData.map((process) => (
    //     <p style={this.getStyle()}>{process.name}</p>
    // ))
    return (
      <div>
        <ProcessHeader onNewProcess={this.handleNewProcess}/>
        {this.props.processesData.map((process) => (
          <Process key={process.name} process={process}/>
        ))}
      </div>
    )
  }
}
export default Processes;