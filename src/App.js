//TODO Style


import React from 'react';
import logo from './logo.svg';
import './App.css';






class Timer extends React.Component {
constructor(props){
  super(props);
  this.state = {
    time: 25*60,
    isTimerOn:false,
    sessionTime:25*60,
    breakTime:5*60,
    isSessionTime:true
  };
  this.handleTimerStart = this.handleTimerStart.bind(this);
  this.handleValChange = this.handleValChange.bind(this);
  this.handleReset = this.handleReset.bind(this);
  this.myRef = React.createRef();
}
handleReset(){
  this.myRef.pause()
  this.myRef.load()

  clearInterval(this.interval)
  this.setState({
    time: 25*60,
    isTimerOn:false,
    sessionTime:25*60,
    breakTime:5*60,
    isSessionTime:true

  })
}
handleValChange(id){
  console.log(id)
    if(!this.state.isTimerOn){
    let newTime =this.state.sessionTime
    switch (id){
      case "break-decrement":
        if(this.state.breakTime>60){
           newTime = this.state.breakTime - 60
         }
         else{
          newTime =this.state.breakTime
         }
        this.setState({breakTime: newTime})
      break;

      case "break-increment":
         if(this.state.breakTime<3600){
           newTime = this.state.breakTime + 60
         }
         else{
          newTime =this.state.breakTime
         }
        this.setState({breakTime: newTime})
      break;


      case "session-decrement":
          if(this.state.sessionTime>60){
           newTime = this.state.sessionTime - 60
         }
         else{
          newTime =this.state.sessionTime
         }
         
        this.setState({time:newTime,sessionTime: newTime })
      break;


      case "session-increment":
        if(this.state.sessionTime<3600){
           newTime = this.state.sessionTime + 60
         }
         else{
          newTime =this.state.sessionTime
         }
        this.setState({time:newTime,sessionTime: newTime})
      break;
      }
      
    }
}
handleTimerStart(id)  { 


 this.timer()  }

timer(){
  //console.log(this.state.isTimerOn)
   if(!this.state.isTimerOn){
    
    this.setState({
      isTimerOn:true
    })
    this.interval = setInterval( ()=>this.myCallback(), 1000);
    
    }
    else{
      this.setState({
      isTimerOn:false
    })
    clearInterval(this.interval)
    }

  
}
myCallback()
  {
    if(this.state.time === 0){
      this.myRef.play()
      console.log(this.state.isSessionTime)
      if(this.state.isSessionTime){

        this.setState({
          isSessionTime:!this.state.isSessionTime,
          time:this.state.breakTime

        })
      
      }
      else{
        this.setState({
          isSessionTime:!this.state.isSessionTime,
          time:this.state.sessionTime

        })
      }
    }
//console.log(this.state.time);
else{this.setState({
      time:this.state.time-1
    })}
    

  }

  render(){
  return(
    <div >    
        <audio 
          preload="auto"
          id="beep"
          ref={(myRef) => { this.myRef = myRef; }}            
          src="http://www.orangefreesounds.com/wp-content/uploads/2018/10/Hotel-door-beep-sound-effect.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <h1 id="timer-label">{this.state.isSessionTime ? "Session" : "Break"}</h1>
        <TimerDisplay id="time-left" time={this.state.time} />
        <MyButton click= {this.handleTimerStart} id="start_stop" name={'Start/Stop'}/>
        <MyButton click= {this.handleReset} id="reset" name={'Reset'}/>

        <h1 id="session-label">Session Timer</h1>
        <Adjustment id="session-length" time={this.state.sessionTime} />
        <MyButton click= {this.handleValChange} id={"session-increment"} name={'^'}/>
        <MyButton click= {this.handleValChange} id={"session-decrement"} name={'V'}/>

        <h1 id="break-label" >Break Timer</h1>
        <Adjustment id="break-length"  time={this.state.breakTime} />
        <MyButton click= {this.handleValChange} id={"break-decrement"} name={'BV'}/>
        <MyButton click= {this.handleValChange} id={"break-increment"} name={'B^'}/>

    </div>
    );
  }
}



function TimerDisplay(props) {
  var minutes = Math.floor(props.time / 60);
  var seconds = props.time - minutes * 60;
  return <h2 id = {props.id} >{minutes.toString().padStart(2, "0")+":"+seconds.toString().padStart(2, "0")}</h2>;
}


function Adjustment(props) {
var minutes = Math.floor(props.time / 60);
  return <h2 id = {props.id}>{minutes}</h2>;
}


class MyButton extends React.Component {
    constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(id){
    console.log("clickity from child "+this.props.id)
    this.props.click(this.props.id)
  }
    render(){
    return <button onClick={this.handleClick} id ={this.props.id}>{this.props.name}</button>

  }
}





























function App() {
  return (
    <div className="App">
     <h1>My App</h1>
     <Timer/>
    </div>
  );
}

export default App;
