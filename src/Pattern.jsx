import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { TailSpin } from 'react-loader-spinner'
import './index.css'

export default function Pattern({setPattern, id}){

    const GET_MESSAGES=gql`
      query MESSAGE_QUERY($id: String!){
        message(id:$id){
            id
            author{
                login
            }
            subject 
            body 
            language 
            metrics{
                views
            }
            view_href 
            post_time
        }
      }`;

const {loading, error, data} = useQuery(GET_MESSAGES, {
        variables:{id:id} 
    
})
console.log(data, error, "message");

if(loading)return(
    <div className="loader-container">
        <TailSpin  className='spinner-class'  visible={true} ariaLabel='tail-spin-loading'/>
        <p className='loading'>Process..!</p>
    </div>
)

return(
    <div className='model-container'>
        <div className='title'>
            <h2>Details</h2>
        </div>
        <div className='model-mini-container'>
            <div className='model-values'>
                <label>Id:</label><br/>
                <input value={data?.message?.id} readOnly></input>
            </div>
            <div className='model-values'>
                <label>Author:</label>
                <input value={data?.message?.author.login} readOnly></input>
            </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Subject:</label><br />
                    <textarea value={data?.message?.subject} readOnly></textarea>
                </div>

                <div className="model-values">
                    <label>Body:</label><br />
                    <textarea value={data?.message?.body} readOnly></textarea>
                </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Language:</label><br />
                    <input value={data?.message?.language} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Views:</label><br />
                    <input value={data?.message?.metrics.views} readOnly></input>
                </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Link:</label><br />
                    <div className="message-link">
                        <a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a>
                    </div>
                </div>

                <div className="model-values">
                    <label>Post Time:</label><br />
                    <textarea value={data?.message?.post_time} readOnly></textarea>
                </div>
            </div>
        <div className=''>
            <button onClick={()=> setPattern({boolean:false})} className='button'>Close</button>

        </div>

    </div>
)


}