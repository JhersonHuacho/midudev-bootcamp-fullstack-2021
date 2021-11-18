import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppInicio from './AppInicio';
import reportWebVitals from './reportWebVitals';

const Display = ({counter}) => {
  console.log("Render Display");
  return (
    <div>{counter}</div>
  )
}

const Button = ({handleClick, text}) => {
  console.log("Render Button");
  return (
    <button onClick={handleClick}>
        {text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>
          the app is used by pressing the buttons
        </p>
      </div>
    )
  }

  return (
    <div>
      <p>
        button press history: {props.allClicks.join(", ")}
      </p>
    </div>
  )
}

const App = () => {
  //
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    }
    setClicks(newClicks);
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  }
  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks);
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  }
  //
  const [counter, setCounter]= useState(0);
  console.log("Render App", counter);

  const increaseByOne = () => {
    setCounter(counter +  1);
    console.log("App increaseByOne", counter);
  };
  const decreaseByOne = () => setCounter(counter -  1);
  const setToZero = () => setCounter(0);

  return (
    <>
     <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
    <br />
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      {right}
      <p>
        {allClicks.join(", ")}
      </p>
    </div>
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
      <History allClicks={allClicks} />
    </div>
    <button onClick={console.log("hola")}>button</button>
    </>
   
  )
}

ReactDOM.render(
    // <App />,
    <AppInicio />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
