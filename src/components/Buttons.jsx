import style from '../assets/styles/buttons.module.css';

function Buttons(props){
    return (<>
    
    <div className = {style.container}>

        <button className= {style.color} onClick={() => props.handleButton("C")}>C</button>
        <button className= {style.color}>R</button>
        <button className= {style.color} onClick = {() => props.handleButton("%")}>%</button>
        <button className= {style.color} onClick = {() => props.handleButton("/")}>/</button>
        <button onClick={() => props.handleButton("7")}>7</button>
        <button onClick={() => props.handleButton("8")}>8</button>
        <button onClick={() => props.handleButton("9")}>9</button>
        <button className = {style.color} onClick = {() => props.handleButton("*")}>*</button>
        <button onClick = {() => props.handleButton("4")}>4</button>
        <button onClick={() => props.handleButton("5")}>5</button>
        <button onClick={() => props.handleButton("6")}>6</button>
        <button className= {style.color} onClick = {() => props.handleButton("-")}>-</button>
        <button onClick = {() => props.handleButton("1")}>1</button>
        <button onClick={() => props.handleButton("2")}>2</button>
        <button onClick = {() => {props.handleButton("3")}}>3</button>
        <button className= {style.color} onClick = {() => props.handleButton("+")}>+</button>
        <button className = {style.zero} onClick = {() => props.handleButton("0")}>0</button>
        <button onClick={() => props.handleButton(".")}>.</button>
        <button className= {style.equal} onClick = {() => props.handleButton("=")}>=</button>

    </div>
    </>);
}


export default Buttons;
