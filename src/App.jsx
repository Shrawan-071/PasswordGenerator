import { useEffect, useState ,useCallback, useRef } from 'react'
import './App.css' // Make sure this import is present!

function App () {
  const [length , setLength] = useState (8)
  const [numbersAllowed , setNumbers] = useState (true)
  const [charAllowed , setCharacters] = useState (false)
  const [password, setPassword] = useState("")
   
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback (() =>{
  var pass =""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numbersAllowed) str += "0123456789"

  if (charAllowed) str += "~`!@#$%^&*(){}[]':;?/><,."

  for (var i=1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char)
  }
  setPassword(pass)
  },[length,numbersAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback ( ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])


  useEffect (() =>{
   passwordGenerator() 
  },[length,numbersAllowed,charAllowed,setPassword])




  return (
    <div className="password-container">
      <div className="input-wrapper">
        <input 
          type="text" 
          value={password}
          readOnly 
          className="password-input"
          ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className="copy-btn">copy</button>
      </div>
      
      <div className="controls-wrapper">
        <div className="range-container">
          <input
          type='range' 
          min={6} 
          max={50} 
          defaultValue={8}
          onChange={(e) =>{setLength(e.target.value)}}
          className="range-slider" />
          <span className="label-text">Length ({length})</span>
        </div>
        
        <label className="checkbox-label">
          <input
          type="checkbox"  
          defaultChecked
          onChange={() =>{setNumbers((prev) => !prev)}}
          />
          <span className="label-text">Numbers</span>
        </label>
        
        <label className="checkbox-label">
          <input type="checkbox" 
          onChange={(e) =>{setCharacters((prev) => !prev)}}/>
          <span className="label-text">Characters</span>
        </label>
      </div>
    </div>
  )
}

export default App;