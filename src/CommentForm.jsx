import React from 'react'

function CommentForm() {
  return (
    <div>
        <form >
            <div >
                <label htmlFor="author">Nom :</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                   
                />
            </div>
            <div>
                <label htmlFor="content">Commentaire :</label>
                <textarea
                    id="content"
                    name="content"
                    rows="3"
                ></textarea>
            </div>
            <button type="submit">
                Envoyer le commentaire
            </button>

        </form>
    </div>
  )
}

export default CommentForm