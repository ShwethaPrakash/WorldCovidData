import React from 'react'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import emoji from '../node_modules/emoji.json/emoji.json'


export default class App extends React.Component {
    constructor(props)
    {
        super(props);
          this.state = {inputText : '', clicked:false};

          this.SubmitOnclick = this.SubmitOnclick.bind(this);
          this.inputtextChanged = this.inputtextChanged.bind(this);
    }

    createTable = (number) => {
      let table = []
  
      // Outer loop to create parent
      for (let i = 0; i < number; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < number; j++) {
          const min = 1;
          const max = 100;
          const rand = Math.floor(Math.random() * 500) + 1 ;
          if((j+i) % 2===0)
          {
          children.push(<td style={{'background-color':'rosybrown'}}>{emoji[rand].char}</td>)
          }
          else{
            children.push(<td>{emoji[rand].char}</td>)
          }
        }
        //Create the parent and add the children
        table.push(<tr className={"table-info"}>{children}</tr>)
      }
      return table
    }
    

    SubmitOnclick()
    {
      this.setState({clicked:true})

      console.log(this.state.clicked)
      console.log(this.state.inputText)

      
    }

    

    inputtextChanged(event)
    {
      this.setState({inputText:event.target.value});
    }

    
    render() {      
      return (
        <div className="jumbotron">
          <h1>Input the number(x) to make a x*x square.</h1>
          <br></br>
          <input type="text" id="number" onChange={this.inputtextChanged}></input> 

          <input type="submit" id="btnSubmit" value="Submit" onClick={this.SubmitOnclick}></input>
          

          <br>
          </br>
          <table className={"table table-striped w-auto"}>
            <th>
              <tr col-span={this.state.inputText}>
                <td>

                </td>
              </tr>
            </th>
            <tbody>
         {this.state.clicked? this.createTable(this.state.inputText):null}
         </tbody>
         </table>
           
         

          
        </div>
      );
    }
 
}
