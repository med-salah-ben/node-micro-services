

const CommentsList = ({comments}) => {

    const ReRenderComments = comments.map(comment=>{
      let content ;
      if(comment.status === "pending"){
        content ="This Comment is awaiting Moderation";
      }
      if(comment.status === "approved"){
        content = comment.content;
      }
      if(comment.status === "rejected"){
        content = "This Comment has been rejected"
      }
        return(
            <li key={comment.id}>  {content}  </li>
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