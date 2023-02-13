import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Pattern  from './Pattern'
import {TailSpin} from 'react-loader-spinner'
import './App.css'



function App() {
  const[pattern, setPattern] = React.useState({
    boolean:false,
    messageId:null
  });


  const GET_MESSAGES = gql`
  query {
    messages {
      items {
        id
        author {
          login
        }
        subject
        body
      }
    }
  }`;



const CheckMore = ({prop})=> {
  const word = prop ;
  const [isCheckMore, setIsCheckMore] = React.useState(true);

  const toggleOpenMore=()=>{
    setIsCheckMore(!isCheckMore)
  }  
  return(
    <p className="text">
    {isCheckMore ? word.slice(0, 150) : word}
    <span onClick={toggleOpenMore} className="read-or-hide">
      {isCheckMore ? "  ...check more" : "  show less"}
    </span>
  </p>
  );
};

function ShowMessages(){
  const{loading, error, data} = useQuery(GET_MESSAGES);
  //console.log(data)
  if(loading)return(
    <div className="loader-container">
        <TailSpin  className='spinner-class'  visible={true} ariaLabel='tail-spin-loading'/>
        <p className='loading'>Process..!</p>
    </div>
  )



  if (error) return <p>Error : {error.message}</p>;
  return(
    <div className='message-container'>
    {data.messages.items?.map((message, index)=>
      <div key={index} className="messages">
            <p><strong>id:  </strong>{message.id}</p>
            <p><strong>subject:  </strong>{message.subject}</p>
            <div><strong>body:  </strong>
              {message.body.length >= 150 ? <CheckMore prop={message.body} /> : message.body}
            </div>
            <div className="button">
              <button onClick={() => setPattern({
                boolean: true,
                messageId:  message.id 
              })}
              >Check More...</button>
            </div>
          </div>
      
      
      )}
      <div>
      {pattern.boolean ? <Pattern id={pattern.messageId} setPattern={setPattern}/> : null}
      </div>
    </div>
  )
};

return(
  <div className='App'>
    
  <div className='flex-messages'>
  <marquee><h1>Messages-Container</h1></marquee>
  </div>
  <ShowMessages/>
  </div>
)
  };


export default App;