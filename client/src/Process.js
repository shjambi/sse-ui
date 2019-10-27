import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ProcessMonitor from './ProcessMonitor';

class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPaneOpen: false,
          isPaneOpenLeft: false
        };
    }

    render() {
        return (
            <tbody>
            <tr>
            <td style={{paddingTop: '10px', textAlign: 'left'}}>
                {this.props.process.name}
            </td>
            <td style={{paddingTop: '10px', textAlign: 'left'}}>
                {this.props.process.created_at}
            </td>
            <td style={{paddingTop: '10px', textAlign: 'left'}}>
                {this.props.process.url}
            </td>
            <td style={{paddingTop: '10px'}}>
                <button onClick={() => this.setState({ isPaneOpen: true })}>View Jobs
                </button>
            </td>
            <SlidingPane
                height= '50vh'
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.props.process.name}
                subtitle={this.props.process.url}
                onRequestClose={ () => {
                    this.setState({ isPaneOpen: false });
                } }>
                <ProcessMonitor processName={this.props.process.name} sse={this.props.sse}/>
                <br />
            </SlidingPane>
            </tr>
            </tbody>
        )
    }
}
export default Process;