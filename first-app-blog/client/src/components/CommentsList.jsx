import React, { useEffect, useState } from 'react'
import axios from "axios"

const CommentsList = ({postId}) => {
    const [comments , setComments] = useState([])
    const getComments = async()=>{
        try {
            const result = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            setComments(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getComments()
    },[])

    const reRenderComments = comments.map(comment=>{
        return(
            <li key={comment.id}>  {comment.content}  </li>
        )
    })

  return (
    <div>
        <ul>
        {reRenderComments}
        </ul>
    </div>
  )
}

export default CommentsList