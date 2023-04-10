

const CommentsList = ({comments}) => {

    const ReRenderComments = comments.map(comment=>{
        return(
            <li key={comment.id}>  {comment.content}  </li>
        )
    })

  return (
    <div>
        <ul>
        {ReRenderComments}
        </ul>
    </div>
  )
}

export default CommentsList