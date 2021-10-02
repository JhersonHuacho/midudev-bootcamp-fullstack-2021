import './App.css';
import Mensaje from './Mensaje';

const Description = () => {
  return <p>Esta es la app del curso fullstack bootcamp</p>
}

function App() {
  const mensaje = "Hola Mundo desde variable";
  const a = 2;
  const b = 3;
 
  return (
    <div className="App">
      <h1>Título de la App</h1>
      <strong>Estamos trabajando en ello</strong>
      <Mensaje color='red' message='Estamos trabajando' />
      <Mensaje color='blue' message='en un curso de React' />
      <Description />
      <div>
        <p>El resultado es:</p>
        { a + b }
      </div>      
      <p>Hola Mundo</p>
      <p>{ mensaje + ' evaluación en JSX' }</p>
      {a + b}
      {/* { new Date() } */}
      {/* + => obtiene el timestamp value */}
      {/* + => te hace un casting a number */}
      { +new Date() }      

    </div>
  );
}

export default App;
