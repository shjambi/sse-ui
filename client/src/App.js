import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'react-table/react-table.css';
import Home from './Home';
import EventsMainPage from './EventsMainPage';
import HistoricalEventsMainPage from './HistoricalEventsMainPage';
import ProcessesMainPage from './ProcessesMainPage';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [], //getInitialEventData(),
      isEventDataLoaded: false,
      processes: [], //getInitialProcessData(),
      isProcessDataLoaded: false,
      isPaneOpen: false,
      isPaneOpenLeft: false,
    };
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleNewProcess = this.handleNewProcess.bind(this);
    // this.eventSource = new EventSource(`${config.ui_server_address}:${config.ui_server_port}/events`);
    this.eventSource = new EventSource(process.env.REACT_APP_EVENTSOURCE);
  }

  componentDidMount() {
    this.getEventAPI()
    this.getProcessAPI()
    // Modal.setAppElement(this.el);
    // this.eventSource.addEventListener('existingEventChannel', (e) => this.getEvent(JSON.parse(e.data)));
    this.eventSource.addEventListener('newEventChannel', (e) => this.getEvent(JSON.parse(e.data)));
    this.eventSource.addEventListener('newProcessChannel', (e) => this.getProcess(JSON.parse(e.data)));
    // this.eventSource.addEventListener('redisTweetCount', (e) => this.getCount(e.data));
    // this.eventSource.addEventListener('kafkaTweetStreamChannel', (e) => this.getTweet(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());

  }

  getEventAPI() {
    // alert("Call Get REST API for events")
    const axios = require('axios');
    // fetch("https://jsonplaceholder.typicode.com/users")
    // fetch("http://localhost:3000/events")
    // .then(response=>response.json())
    // .then(response=>console.log(JSON.stringify(response)))
    axios.get(process.env.REACT_APP_BACKEND_EVENTS).then(
      result => {
        // alert(result)
        this.setState({
          isEventDataLoaded: true,
          events: result.data
        });
      },
      error => {
        alert("Error")
        this.setState({
          isEventDataLoaded: false,
          error
        });
      }
    );
    
  }

  postEventAPI(newEvent) {
    // alert(JSON.stringify(newEvent))
    const axios = require('axios');
    axios.post(process.env.REACT_APP_BACKEND_EVENTS, newEvent)
      .then(function(response){
        console.log("POST Sucess")
        // alert(JSON.stringify(response));
        //Perform action based on response
      })
      .catch(function(error){
        console.log("POST Error")
        console.log(error);
        //Perform action based on error
      });
    // this.getEventAPI()
  }

  getProcessAPI() {
    // alert("Call Get REST API for processes")
    const axios = require('axios');
    // fetch("https://jsonplaceholder.typicode.com/users")
    // fetch("http://localhost:3000/events")
    // .then(response=>response.json())
    // .then(response=>console.log(JSON.stringify(response)))
    axios.get(process.env.REACT_APP_BACKEND_PROCESSING_TECH).then(
      result => {
        this.setState({
          isProcessDataLoaded: true,
          processes: result.data
        });
      },
      error => {
        alert("Error")
        this.setState({
          isProcessDataLoaded: false,
          error
        });
      }
    );
  }
  
  postProcessAPI(newProcess) {
    // alert(JSON.stringify(newProcess))
    const axios = require('axios');
    axios.post(process.env.REACT_APP_BACKEND_PROCESSING_TECH, newProcess)
      .then(function(response){
        console.log("POST Sucess")
        // alert(JSON.stringify(response));
        //Perform action based on response
      })
      .catch(function(error){
        console.log("POST Error")
        console.log(error);
        //Perform action based on error
      });
    // this.getProcessAPI()
  }

  getTweet(newTweet) {
    const newData = this.state.data.concat(newTweet);
    this.setState(Object.assign({}, {data: newData}));
    console.log(this.state.data)
  }

  getEvent(newEvent) {
    // alert(newEvent)
    const newEventData = this.state.events.concat(newEvent);
    this.setState(Object.assign({}, {events: newEventData}))
  }

  getProcess(newProcess) {
    // alert(newProcess)
    const newProcessData = this.state.processes.concat(newProcess);
    this.setState(Object.assign({}, {processes: newProcessData}))
  }

  // getCount(newCount) {
  //   this.setState(Object.assign({}, {count: newCount}))
  // }
  
  // stopUpdates() {
  //   this.eventSource.close();
  // }

  handleNewEvent(newEvent) {
    //Call post API
    // alert(JSON.stringify(newEvent))
    this.postEventAPI(newEvent)
    // this.getEventAPI()
  }

  handleNewProcess(newProcess) {
    this.postProcessAPI(newProcess)
    // this.getProcessAPI()
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/events'} className="nav-link">Active Events</Link></li>
            <li><Link to={'/historical_events'} className="nav-link">Historical Events</Link></li>
            <li><Link to={'/processing_techniques'} className="nav-link">Processing Techniques</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' 
                render={() => <Home 
                />}
              />  
              <Route exact path='/events' 
                render={() => <EventsMainPage eventsData={this.state.events} 
                onNewEvent={this.handleNewEvent}
                />}
              />  
              <Route exact path='/historical_events' 
                render={() => <HistoricalEventsMainPage
                />}
              />  
              <Route path='/processing_techniques' 
                render={() => <ProcessesMainPage processesData={this.state.processes}
                onNewProcess={this.handleNewProcess}
                />}
              />
          </Switch>
        </div>
      </Router>
    );    
  }
}

class Header extends React.Component {
  render() {
     return (
        <div style={{textAlign: 'left', paddingLeft: '22px', paddingTop: '5px', 
        color: '#F8F9F9', background:'#1C2833', width: '100%', height: '42px'}}>
          <h3>
            Dashboard
          </h3>
        </div>
     );
  }
}
export default App;
