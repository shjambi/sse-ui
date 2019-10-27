import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import ProcessForm from './ProcessForm';

const styles = {
//   fontFamily: 'sans-serif',
  fontSize: '14px',
  paddingLeft: '25px',
  paddingBottom: '20px',
//   background: '#f4f4f4',
};

class ProcessHeader extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
    this.handleNewProcess = this.handleNewProcess.bind(this);
  }
  openSlider = () => {
    this.setState({
      isOpen: true
    });
  }
  closeSlider = () => {
    this.setState({
      isOpen: false
    });
  }
  handleNewProcess(newProcess) {
    this.props.onNewProcess(newProcess);
  }
  
  render () {
    return (
        <div>
          <h4>Processing Techniques</h4>
          <a href='#' onClick={this.openSlider}>Add New Processing Technique</a>
          <Slider 
            verticalOffset={{top: 118, bottom: 0}}
            title='Processing Technique Form'
            footer={
              <div style={{padding: '15px'}}>
                <a href='' onClick={this.closeSlider}>Close Form</a>
              </div>
            }
            isOpen={this.state.isOpen}
            onOutsideClick={this.closeSlider}>
            <div style={{padding: '15px'}}>
              <ProcessForm onNewProcess={this.handleNewProcess}/>
            </div>
            </Slider>
            <br/>
            <br/>
        </div>
      );
  };
}
export default ProcessHeader;