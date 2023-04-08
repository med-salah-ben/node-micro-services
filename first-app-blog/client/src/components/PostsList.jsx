import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import CommentsList from './CommentsList'

const PostsList = () => {
    const [posts , setPosts] = useState({})

    const getPosts = async()=>{
        try {
            const result = await axios.get("http://localhost:4000/posts")
            setPosts(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPosts()
    },[])

    // give us back an array of all  the values inside this object=posts
    const renderedPosts = Object.values(posts).map((post)=>{
        return( 
        <div className="card" style={{width:"30%" , marginBottom:"20px"}} key={post.id}>
            <div className="card-body">
                <h3> {post.title}   </h3>
                <CommentsList postId={post.id} />
                <CommentCreate postId={post.id} />
            </div>
        </div>)
    })
  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>
  )
}

export default PostsList