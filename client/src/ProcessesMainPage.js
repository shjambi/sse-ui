import React, { Component } from 'react';
import ProcessHeader from './ProcessHeader';
import Process from './Process';

class ProcessesMainPage extends Component {
  constructor() {
    super();
    this.handleNewProcess = this.handleNewProcess.bind(this);
  }
  handleNewProcess(newProcess) {
    // alert(JSON.stringify(newProcess))
    this.props.onNewProcess(newProcess);
  }
  render() {
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
export default ProcessesMainPage;