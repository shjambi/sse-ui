import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import ReactTable from 'react-table';
// import { getInitialFlightData } from './DataProvider';
// import { getInitialEventData } from './EventProvider';
import { getInitialProcessData } from './ProcessProvider';
import FixedNavbarExample from './FixedNavbarExample';
import 'react-table/react-table.css';
import Events from './Events';
import EventForm from './EventForm';
import Processes from './Processes';
import ProcessForm from './ProcessForm';
import DatatablePage from './DatatablePage';
import SplitPane from 'react-split-pane';

import Home from './Home';
import About from './About';
import Contact from './Contact';


// import reactstrap from 'react-bootstrap'

// const {
//   Navbar,
//   Nav,
//   NavItem,
//   NavDropdown,
//   MenuItem
// } = 'reactstrap';

// class NavbarInstance extends React.Component {
//   render() {
//     return (
//       <Navbar>
//         <Navbar.Header>
//           <Navbar.Brand>
//             <a href="#">React-Bootstrap</a>
//           </Navbar.Brand>
//         </Navbar.Header>
//         <Nav>
//           <NavItem eventKey={1} href="#">Link</NavItem>
//           <NavItem eventKey={2} href="#">Link</NavItem>
//           <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//             <MenuItem eventKey={3.1}>Action</MenuItem>
//             <MenuItem eventKey={3.2}>Another action</MenuItem>
//             <MenuItem eventKey={3.3}>Something else here</MenuItem>
//             <MenuItem divider />
//             <MenuItem eventKey={3.3}>Separated link</MenuItem>
//           </NavDropdown>
//         </Nav>
//       </Navbar>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],//getInitialEventData(),
      processes: getInitialProcessData(),
      data: [], //getInitialFlightData(),
      count: 0
    };

    this.columns = [{
      Header: 'Id',
      accessor: 'id',
      maxWidth: 200
    }, {
      Header: 'User',
      accessor: 'user',
      maxWidth: 200
    }, {
      Header: 'Text',
      accessor: 'text',
      maxWidth: 400
    }];
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleNewProcess = this.handleNewProcess.bind(this);
    this.eventSource = new EventSource('http://localhost:5000/events');
  }

  componentDidMount() {
    // this.eventSource.addEventListener('flightStateUpdate', (e) => this.updateFlightState(JSON.parse(e.data)));
    // this.eventSource.addEventListener('flightRemoval', (e) => this.removeFlight(JSON.parse(e.data)));
    this.eventSource.addEventListener('getEvents', (e) => this.getEvents(JSON.parse(e.data)));
    this.eventSource.addEventListener('redisGetNewEvent', (e) => this.getEvents(JSON.parse(e.data)));
    // this.eventSource.addEventListener('redisTweetCount', (e) => this.getCount(e.data));
    this.eventSource.addEventListener('kafkaTweetStream', (e) => this.getTweet(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());

  }

  getTweet(newTweet) {
    const newData = this.state.data.concat(newTweet);
    this.setState(Object.assign({}, {data: newData}));
    console.log(this.state.data)
  }

  getEvents(newEvent) {
    // alert(newEvent)
    const newEventData = this.state.events.concat(newEvent);
    this.setState(Object.assign({}, {events: newEventData}))
  }

  getCount(newCount) {
    this.setState(Object.assign({}, {count: newCount}))
  }
  
  updateFlightState(flightState) {
    let newData = this.state.data.map((item) => {
      if (item.flight === flightState.flight) {
        item.state = flightState.state;
      }
      return item;
    });

    this.setState(Object.assign({}, {data: newData}));
  }

  removeFlight(flightInfo) {
    const newData = this.state.data.filter((item) => item.flight !== flightInfo.flight);

    this.setState(Object.assign({}, {data: newData}));
  }

  stopUpdates() {
    this.eventSource.close();
  }

  handleNewEvent(newEvent) {
    // alert(this.state.events)
    const newEventData = this.state.events.concat(newEvent);
    this.setState(Object.assign({}, {events: newEventData}));
  }

  handleNewProcess(newProcess) {
    // newProcess[id] = 100;
    // alert(newProcess)
    const newProcessData = this.state.processes.concat(newProcess);
    this.setState(Object.assign({}, {processes: newProcessData}));
  }

  render() {
    return (
      // <NavbarInstance></NavbarInstance>
      // <FixedNavbarExample />
      <Router>
        <div>
          <div className="header">Header </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Events </Link></li>
            <li><Link to={'/processes'} className="nav-link">Processing Techniques</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' 
                render={() => <Events eventsData={this.state.events}/>}
              // component={() => <Events eventsData={this.state.events} />}
              />  
              <Route path='/processes' 
                render={(props) => <Processes {...props} processesData={this.state.processes}/>}
              />

          </Switch>
        </div>
      </Router>
    );
      
      // <div className="App">          
        // <SplitPane split=" horizontal" minSize={45} defaultSize="10%"> 
        //   <Header />
        //   <SplitPane split=" horizontal" minSize={100} defaultSize="40%">          
        //     <div>
        //       <SplitPane split="vertical" minSize={50} defaultSize="50%">
        //           <div style={{padding: '10px', background: '#EBF5FB', height: '100%'}}>
        //             <EventForm onNewEvent={this.handleNewEvent}/>
        //             <hr/>
        //             <h5 style={{textAlign: 'left', height: '10px'}}>Available Events:</h5>
        //             <Events eventsData={this.state.events}/>
        //           </div>
        //           <div style={{padding: '10px', background: '#EAFAF1', height: '100%'}}>
        //             <ProcessForm onNewProcess={this.handleNewProcess}/>
        //             <hr/>
        //             <h5 style={{textAlign: 'left', height: '10px'}}>Available Process Techniques:</h5>
        //             <Processes processesData={this.state.processes}/>
        //             <h6 style={{textAlign: 'left'}}>
        //               {this.state.count} processed tweets
        //             </h6>
        //           </div>
        //       </SplitPane>
        //     </div>
        //     <div>
        //      {/* <button onClick={() => this.stopUpdates()}>Stop updates</button>  */}
        //       {/* <ReactTable
        //         style={{backgroundColor:'#FFFFF0', height: '400px'}}
        //         data={this.state.data}
        //         columns={this.columns}
        //       />            */}
        //       <DatatablePage />
        //     </div>       
        //   </SplitPane> 
        // </SplitPane> 
      // </div>
    // );
      
    
  }
}

class Header extends React.Component {
  render() {
     return (
        <div style={{textAlign: 'left', paddingLeft: '10px', paddingTop: '0px', color: '#F8F9F9', background:'#1C2833', width: '100%'}}>
          <h3>
            Dashboard
          </h3>
        </div>
     );
  }
}

// class Content extends React.Component {
//   render() {
//      return (
//         <div>
//         </div>
//      );
//   }
// }
export default App;
