import React, { useState } from 'react'

function CommentForm() {
    const [commentaire,setCommentaire] = useState('')
    const [nom,setNom] = useState('')
    function handleRéinitialiser(){
        setCommentaire('');
        setNom("");
    }
  return (
    <div>
        <form >
            <div >
                <label htmlFor="author">Nom :</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                   value={nom}
                   onChange={(event)=>setNom(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="content">Commentaire :</label>
                <textarea
                    id="content"
                    name="content"
                    rows="3"
                    onChange={(event)=>setCommentaire(event.target.value)}
                >
                    {commentaire}
                </textarea>
            </div>
            <button type="submit">
                Envoyer le commentaire
            </button>
            <button onClick={handleRéinitialiser}>
            "Réinitialiser"
            </button>

        </form>
    </div>
  )
}

export default CommentForm