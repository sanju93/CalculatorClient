import style from '../assets/styles/display.module.css';
function Display(props){
    
    return (
        <>
        <div className= {style.display}>
              <p className = {style.child}>{props.Exp}</p>
        </div>
        
        </>
    )
}

export default Display;