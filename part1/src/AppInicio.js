import { useState } from 'react';
import './App.css';

const Hello = ({name, age}) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const AppInicio = () => {
  const name = 'Peter';
  const age = 10;

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });
  const handleLeftClick = () => {
    setClicks({
      ...clicks, 
      left: clicks.left + 1,
    });
  }
  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    });
  }
  
  const [counter, setCounter] = useState(0);
  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter - 1);
  
  const [allClicks, setAllClicks] = useState([]);
  const [leftDos, setLeftDos] = useState(0);
  const [rightDos, setRightDos] = useState(0);

  const handleLeftClicksDos = () => {
    setAllClicks(allClicks.concat('L'));
    setLeftDos(leftDos + 1);
  }
  const handleRightClicksDos = () => {
    setAllClicks(allClicks.concat('R'));
    setRightDos(rightDos + 1);
  }

  const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }

    return (
      <div>
          button press history: {props.allClicks.join(' ')}
      </div>
    )
  }

  console.log('rendering...', counter);

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <h2>Contador</h2>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Plus" />
      <Button handleClick={setToZero} text="Zero" />
      <Button handleClick={decreaseByOne} text="Minus" />
      <hr/>
      <button onClick={() => setLeft(left + 1)}>Left</button>
      <button onClick={() => setRight(right + 1)}>Right</button>
      <hr/>
      {clicks.left}
      <button onClick={() => handleLeftClick}>Left Object</button>
      <button onClick={() => handleRightClick}>Right Object</button>
      {clicks.right}
      <hr/>
      {leftDos}
      <button onClick={handleLeftClicksDos}>left dos</button>
      <button onClick={handleRightClicksDos}>right dos</button>
      {rightDos}
      <History allClicks={allClicks} />
    </div>
  )
}

export default AppInicio;
