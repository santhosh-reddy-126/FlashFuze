import React, { useEffect, useState } from 'react'
import "./App.css"
const blink="http://localhost:3008"
export default function Card(props) {
  const [flipped, setflipped] = useState(false);
  const [data,setdata]=useState({
    heading: "",
    def: ""
  })
  
  const Create=async()=>{
    try{
      const data2 = await fetch(blink+"/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          heading: data.heading,
          def: data.def
        })
      })
      const ans = await data2.json();
      if(ans.success){
        props.creating();
        props.getting('');
        setdata({...data,def:"",heading:""})
        
      }
    }catch(e){
      console.log(e)
    }
  }

  const Edited=async()=>{
    try{
      const data2 = await fetch(blink+"/edit",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          heading: data.heading,
          def: data.def,
          id: props.id
        })
      })
      const ans = await data2.json();
      if(!ans.success){
        alert("Sorry");
      }else{
        props.editing();
        props.getting('');
        
      }
    }catch(e){
      console.log(e)
    }
  }
  
  
  useEffect(()=>{
    if(props.edits){
      setdata({...data,def:props.back,heading:props.front})
    }else{
      setdata({...data,def:"",heading:""})
    }
  },[props.edits])
  
  const handleClick=()=>{
    setflipped(!flipped);
  }
  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
    console.log(data);
  }
  const cardname = `card ${flipped ? 'flipped' : ''}`;
  return (
      
      props.edits ? <div>
      <div className="inpcard" >
        <input placeholder='Heading Or Question' onChange={handleChange} value={data.heading} name="heading"/>
        <textarea placeholder='Defination or Answer' onChange={handleChange} value={data.def} name="def"></textarea>
        <button onClick={Edited}>Submit</button>
      </div>
    </div>:props.create ? <div >
      <div className="inpcard" >
        <input placeholder='Heading Or Question' onChange={handleChange} value={data.heading} name="heading"/>
        <textarea placeholder='Defination or Answer'  onChange={handleChange} value={data.def} name="def"></textarea>
        <button onClick={Create}>Submit</button>
      </div>
    </div>:<div className={cardname} onClick={handleClick}>
      <div className="card-face card-front" >
       {props.front}
      </div>
      <div className="card-face card-back">
       {props.back}
      </div>
    </div>
    
    
  )
}
