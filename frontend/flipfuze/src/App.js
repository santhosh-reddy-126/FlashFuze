import react,{useState,useEffect} from "react";
import Card from "./Card.js";
import img1 from "./edit.png"
import img2 from "./bin.png"
import "./App.css"
const blink="https://flipfuzebackend.onrender.com"
function App() {
  
  const [edits,setedits] = useState(false);
  const [create,setcreate] = useState(false);
  const [items,setitems]=useState([]);
  const [ind,setind]=useState(0);
  const [search,setsearch]=useState("");
  const handleEdit=()=>{
    setedits(!edits);
  }
  const handlecreate=()=>{
    setcreate(!create);
  }
  const GetData=async(SearchP)=>{
    try{
      
      const data2 = await fetch(blink+"/getall",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({
          search:SearchP
        })
      })
      const ans = await data2.json();
      if(ans.success){
        setitems(ans.data)
      }
    }catch(e){
      console.log(e)
    }
  }
  const Delete=async()=>{
    try{
      const data2 = await fetch(blink+"/delete",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id: items[ind]._id
        })
      })
      const ans = await data2.json();
      if(!ans.success){
        alert(ans.message);
      }else{
        GetData('');
      }
    }catch(e){
      console.log(e)
    }
  }
  const Inc=()=>{
      if(ind<items.length-1){
        setind(ind+1);
      }
      
  }
  const Dec=()=>{
    if(ind>0){
      setind(ind-1);
    }
}
  const handleSearch=(e)=>{
    setsearch(e.target.value);
    GetData(e.target.value);
  }


  useEffect(()=>{
    GetData('');
    
  },[search])
  return (
    <div className="Page">
      <div className="TopOrder">
        <h1>FlipFuze</h1>
        <input className="Search"  placeholder="Search by Name" value={search} onChange={handleSearch}/>
        <div className="aside">
          <button onClick={handlecreate} className={create ? "new1":"new"}>+</button>
          <button onClick={handleEdit} ><img src={img1}/></button>
          <button onClick={Delete}><img src={img2}/></button>
        </div>
      </div>
        <div className="CardSection" >
            {items.length===0 || ind>=items.length ? <Card front="Sample Heading" back="Sample Defination" edits={edits} create={create} getting={GetData} editing={handleEdit} creating={handlecreate}/>: <Card front={items[ind].heading} back={items[ind].def} edits={edits} create={create} getting={GetData} editing={handleEdit} creating={handlecreate}/>}
            
        </div>
        <div className="Footer">
          <button onClick={Dec}>Previous</button>
          <button onClick={Inc}>Next</button>
        </div>
      
      
    </div>
  );
}

export default App;
