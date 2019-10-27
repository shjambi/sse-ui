import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ResultList from './ResultList'

class ViewResult extends Component {
  constructor() {
    super();
    this.state = {
      isPaneOpen: false,
      isPaneOpenLeft: false
    };
  }
 
  render() {
    return (
      <div>       
        <button onClick={() => this.setState({ isPaneOpen: true })}>View Result</button>
        <SlidingPane
            height= '50vh'
            className='some-custom-class'
            overlayClassName='some-custom-overlay-class'
            isOpen={ this.state.isPaneOpen }
            title={this.props.title}
            subtitle={this.props.subtitle}
            onRequestClose={ () => {
                this.setState({ isPaneOpen: false });
            } }
            >
            <ResultList key={this.props.eventName} eventName={this.props.eventName} processName={this.props.processName} sse={this.props.sse}/>
            <br/>
        </SlidingPane>
      </div>
    );
  }
}
 
export default ViewResult;