import React, { Component } from 'react';
import ProcessHeader from './ProcessHeader';
import Process from './Process';

const styles = {
  //   fontFamily: 'sans-serif',
    // fontSize: '14px',
    paddingLeft: '25px',
    paddingBottom: '20px',
  //   background: '#f4f4f4',
  };

class ProcessesMainPage extends Component {
  constructor() {
    super();
    this.handleNewProcess = this.handleNewProcess.bind(this);
  }
  handleNewProcess(newProcess) {
    this.props.onNewProcess(newProcess);
  }
  render() {
    return (
      <div style={styles}>
        <ProcessHeader onNewProcess={this.handleNewProcess}/>
        { this.props.processesData.length > 0 ? 
        <table>
          <thead>
              <tr>
              <th style={{width: '160px'}}>Name</th>
              <th style={{width: '140px'}}>Created At</th>
              <th style={{width: '280px'}}>URL</th>
              <th style={{width: '160px'}}>Job Details</th>
              </tr>
          </thead>
          {
          this.props.processesData.map((process) => (
            <Process key={process.id} 
              process={process} 
              sse={this.props.sse}/>
          ))}
        </table>
        : <h6><br/>No processing techniques found.</h6>
        }
      </div>
    )
  }
}
export default ProcessesMainPage;