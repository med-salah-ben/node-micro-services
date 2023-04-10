import React, { useState } from 'react';
import axios from "axios"

const CommentCreate = ({postId}) => {
    const [content , setContent]=useState("")

    const handleComment = async(e)=>{
        e.preventDefault()
        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`,{content})
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <form onSubmit={handleComment}>
            <div className="form-group">
                <h4>New Comment</h4>
                <input type="text" className="form-control" value={content} onChange={(e)=>setContent(e.target.value)} />
            </div>
            <button className='btn btn-primary'>submit</button>
        </form>
    </div>
  )
}

export default CommentCreate