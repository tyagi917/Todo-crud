import react,{Component} from 'react'
import './App.css';
var i=0;
class App extends Component {

  state={
    edits:false,
    id:null,
    inputtext:"",
    edittext:"",
    todo:[],
    searchtodo:""
  }
  add=(e)=>
  {
    this.setState({
      inputtext:e.target.value
    })

  }
  addedit=(e)=>
  {
    this.setState({
      edittext:e.target.value
    })
  }
  additem=()=>
  {
    if(this.state.inputtext!==null)
    {
      const res={
        id:++i,
        title:this.state.inputtext
      }
      const todo=[...this.state.todo]
      todo.push(res)
      this.setState({
        todo:todo,
        inputtext:""
      })
    }

  }
  deletd=(id)=>
  {
    const list=[...this.state.todo]
    const res=list.filter((data)=>{
      if(data.id!==id)
      {
        return data;

      }
      
    })
    this.setState({
      todo:res
    })

  }
  edit=(id)=>
  {
    this.setState({
      edits:true,
      id:id
    })
    console.log("edit")

  }
  search=(e)=>
  {
    this.setState({
      searchtodo:e.target.value
    })
  }
  addedititem=()=>
  {
    console.log("a");
    const res=[...this.state.todo]
    const data=res.filter(data=>
    {
      if(data.id===this.state.id)
      {
          data['title']=this.state.edittext
        return data;

      }
      else
      {
        return data
      }
    })
    this.setState({
      todo:data,
      edits:false,
      edittext:""

    })

  }
  returneditform=()=>
  {
    console.log("call")
    if(this.state.edits){
      return(
        <div>
        <input className="editclass" type="text"  value={this.state.edittext} onChange={this.addedit}placeholder="Enter edit value here"/>
        <input type="submit" value="SUBMIT" className="editsubmit" onClick={this.addedititem}/>
        </div>
        )
        
    }

  }

  render()
  {
    console.log(this.state.todo)

    console.log(this.state.searchtodo)

    const items=this.state.todo.filter((data)=>{
      if(this.state.searchtodo)
        if(data.title.toLowerCase().includes(this.state.searchtodo.toLowerCase()))
          return data;
      
    })
    var x=items.length
    console.log(items);
  
  return (

    <div className="App">

    <input type="text" className="input" value={this.state.inputtext}onChange={this.add} placeholder="Add todo here"/>
    <input type="submit"  className="addtodo" value="ADDTODO" onClick={this.additem}/>
    <ul>
    {
      this.state.todo.map(data=>{
        return  <div ><div className="d">{data.title}</div><button  className="deletedtodo" value="DELETEDTODO" onClick={(e)=>this.deletd(data.id)}>DELETEDTODO</button><button className="edittodo" onClick={(e)=>this.edit(data.id)}>EDITTODO</button></div>
      })

    }
    </ul>
     {this.returneditform()}
     <input type="text" className="search" onChange={this.search}placeholder="Search todo here"/>
     <ul>
     {
      x==0&&this.state.searchtodo?<p className="d">Todo not found</p>
    : items.map(data=>{
        return <div className="d">{data.title}</div>
      }
      )

     }
     </ul>
    

  </div>
  );
}
}

export default App;
