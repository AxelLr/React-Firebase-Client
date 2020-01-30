import React from 'react'

function Comments(props) {

    console.log(props.comments)

    return (
        <div> 
            {props.comments.map((comment, idx) => 
                <div key={idx} style={{borderBottom: '1px solid black'}} className="comments-container">
                    <img src={comment.userImage} alt='comment-profile' width='100px' height='100px ' />
                    <h5> @{comment.userHandle}</h5>
                   <p> {comment.content}</p> 
                </div>
            )}
            
    
        </div>
    )
}

export default Comments;