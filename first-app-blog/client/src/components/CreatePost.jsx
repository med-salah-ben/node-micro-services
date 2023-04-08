import React , {useState} from 'react'
import axios from "axios"
const CreatePost = () => {
    const [title , setTitle] = useState("")

    const handlePost = async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/posts',{title})
            setTitle('')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handlePost}>
            <div className="form-group">
                <label>Title</label>
                <input className='form-control' value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <button className='btn btn-primary'>submit</button>
        </form>
    </div>
  )
}

export default CreatePost