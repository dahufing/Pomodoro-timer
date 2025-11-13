import React,{useState, useEffect} from 'react';
import logo from './assets/Icono_pomodoro.png';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/Fondo_pomodoro2.png";
import closeBtn from "./assets/close.png";
import workBtn from "./assets/work.png";
import breakBtn from "./assets/break.png"
function App() {

  const[timeLeft, setTimeLeft]=useState(25*60);
  const [isRunning, setIsRunning]=useState(false);
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [workButtonImage, setWorkButtonImage]= useState(workBtn);
  const [isBreak,setIsBreak]=useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [image, setImage]= useState(playImg);

  const cheerMessages = [
    "You Can Do It!",
    "Keep going",
    "Stay focused!",

  ];
  const breakMessages = [
    "Snacks, maybe?",
    "Stretch your legs!",
    "You're almost done"
  ];
  //encouragement message updater
  useEffect( () => {
    let messageInterval: NodeJS.Timeout;
    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]); //set first message initially
      let index = 1
      
      messageInterval= setInterval( () => {
        setEncouragement(messages[index]);
        index= (index+1)%messages.length;

      },4000); //cada 4 segons
    } else {
      setEncouragement("");
    } 
    return () => clearInterval(messageInterval);

  }, [isRunning,isBreak]);

  //countdown timer
  useEffect( ()=> {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft>0) {
      timer= setInterval ( ()=> {
        setTimeLeft(prev => prev -1);

      },1000);
    }
    return() => clearInterval(timer);
  }, [isRunning,timeLeft]);
// set initial switch model


const formatTime = (seconds:number): string => {
  const m = Math.floor(seconds/60).toString().padStart(2, '0');

  const s= (seconds%60).toString().padStart(2,'0');
  return `${m}:${s}`;

};

const switchMode = (breakMode: boolean) => {
  setIsBreak(breakMode);
  setIsRunning(false);
  setWorkButtonImage(workBtn);
  setTimeLeft(breakMode ? 5*60 : 25*60);

}

const handleClick = () => {
  if (!isRunning) {
    setIsRunning(true);
  } else {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5*60 : 25*60);

    
  }
}
const containerClass = `home-container ${isRunning ? "background-green": ""}`;

  return (
    <div className={containerClass} style={{position:'relative'}}>

   <div>
    <button className="close-button">
      <img src ={closeBtn} alt = "Close" />

    </button>
   </div>

   <div className="home-content">
    <div className="home-controls">
      <button className="image-button" onClick={ () => switchMode(false)}>
        <img src={workButtonImage} alt='Work' />
        
      </button>
      <button className="image-button" onClick={ () => switchMode(true)}>
        <img src= {breakButtonImage} alt= "Break" />
      </button>
    </div>

    <p className={`encouragement-text ${!isRunning ? "hidden":""}`}>
      { encouragement }
    </p>
    <div className="timer-section">
      <h1 className= "home-timer">{formatTime(timeLeft)}</h1>
      <button className="home-button" onClick={handleClick}>
        <img src={image} alt= "Button Icon" />
      </button>
    </div>
    
   </div>
   </div>
  );
}

export default App;
