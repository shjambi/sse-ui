import React, { Component } from 'react';
// import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import MonitorJobs from './MonitorJobs';

class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPaneOpen: false,
          isPaneOpenLeft: false
        };
    }
    getStyle= () => {
        return {
            // background: '#FA8072',
            textAlign: 'left',
            fontSize: '14px',
            padding: '2px',
            paddingLeft: '25px',
            // height: '35px',
            // borderBottom: '1px #ccc dotted',
            color: this.props.process.active ? '#C0392B' : '#154360',
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            borderWidth: 5,
            // borderRadius: 15 
        }
    }
    render() {
        return (
            <div>
            <button style={this.getStyle()}
            onClick={() => this.setState({ isPaneOpen: true })}>{this.props.process.name}</button>
            <SlidingPane
                height= '50vh'
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.props.process.name}
                subtitle={this.props.process.url}
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                } }>
                <MonitorJobs processId={this.props.process.id}/>
                <br />
            </SlidingPane>
            </div>
        )
    }
}
export default Process;