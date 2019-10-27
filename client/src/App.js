import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'react-table/react-table.css';
import Home from './Home';
import EventsMainPage from './EventsMainPage';
import ProcessesMainPage from './ProcessesMainPage';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sse: {},
      events: [],
      isEventDataLoaded: false,
      processes: [],
      isProcessDataLoaded: false,
      isPaneOpen: false,
      isPaneOpenLeft: false,
      
    };
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleNewProcess = this.handleNewProcess.bind(this);
    this.eventSource = new EventSource(process.env.REACT_APP_EVENTSOURCE)
  }

  componentDidMount() {
    this.getEventAPI()
    this.getProcessAPI()
    this.eventSource.addEventListener('redisTweetCount', (e) => this.getTweetCount(JSON.parse(e.data)));
    this.eventSource.addEventListener('redisTweetResult', (e) => this.getTweetResult(JSON.parse(e.data)));
  }

  getTweetCount(sseData) {
    this.setState({
      sse: {
        ...this.state.sse,
        [sseData.key]: sseData.value
      }
    })
    // let val = this.state.sse;
    // for (var key in val) {
    //   console.log(key + ":" + val[key])
    // }
  }

  getTweetResult(sseData){
      this.setState({
        sse: {
          ...this.state.sse,
          [sseData.key]: JSON.stringify(sseData.value)
        }
      })
      
  }

  getEventAPI() {
    console.log("GET REST API for events")
    console.log(process.env.REACT_APP_BACKEND_EVENTS)
    const axios = require('axios');
    axios.get(process.env.REACT_APP_BACKEND_EVENTS).then(
      result => {
        this.setState({
          isEventDataLoaded: true,
          events: result.data
        });
      },
      error => {
        console.log(error);
        this.setState({
          isEventDataLoaded: false,
          error
        });
      }
    );    
  }

  postEventAPI(newEvent) {
    console.log("POST REST API for a new event")
    console.log(process.env.REACT_APP_BACKEND_EVENTS)
    const axios = require('axios');
    axios.post(process.env.REACT_APP_BACKEND_EVENTS, newEvent)
      .then(function(response){
        console.log("POST Success")
      })
      .catch(function(error){
        console.log("POST Error")
        console.log(error);
      });
  }

  getProcessAPI() {
    console.log("GET REST API for processes")
    console.log(process.env.REACT_APP_BACKEND_PROCESSING_TECH)
    const axios = require('axios');
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
    console.log("POST REST API for a new processe")
    console.log(process.env.REACT_APP_BACKEND_PROCESSING_TECH)
    const axios = require('axios');
    axios.post(process.env.REACT_APP_BACKEND_PROCESSING_TECH, newProcess)
      .then(function(response){
        console.log("POST Success")
      })
      .catch(function(error){
        console.log("POST Error")
        console.log(error);
      });
  }

  getTweet(newTweet) {
    const newData = this.state.data.concat(newTweet);
    this.setState(Object.assign({}, {data: newData}));
    console.log(this.state.data)
  }

  getEvent(newEvent) {
    const newEventData = this.state.events.concat(newEvent);
    this.setState(Object.assign({}, {events: newEventData}))
  }

  getProcess(newProcess) {
    const newProcessData = this.state.processes.concat(newProcess);
    this.setState(Object.assign({}, {processes: newProcessData}))
  }

  handleNewEvent(newEvent) {
    this.postEventAPI(newEvent)
  }

  handleNewProcess(newProcess) {
    this.postProcessAPI(newProcess)
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/events'} className="nav-link">Events</Link></li>
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
                  sse={this.state.sse}
                />}
              />  
              <Route path='/processing_techniques' 
                render={() => <ProcessesMainPage processesData={this.state.processes}
                  onNewProcess={this.handleNewProcess}
                  sse={this.state.sse}
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
