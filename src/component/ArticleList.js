import React, { useState } from 'react';
import './CommentForm.css'; // Assurez-vous d'ajouter un fichier CSS si nécessaire

const CommentForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (!name.trim()) validationErrors.name = "Le nom est obligatoire.";
    if (!comment.trim()) validationErrors.comment = "Le commentaire est obligatoire.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Logique pour envoyer le commentaire
    console.log("Nom:", name, "Commentaire:", comment);
    setErrors({});
    setName('');
    setComment('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Laisser un commentaire</h2>
      <div className="form-group">
        <label htmlFor="name">Nom :</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Entrez votre nom"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="comment">Commentaire :</label>
        <textarea 
          id="comment" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Entrez votre commentaire"
        />
        {errors.comment && <p className="error">{errors.comment}</p>}
      </div>
      <button type="submit" className="submit-btn">Soumettre</button>
    </form>
  );
};

export default CommentForm;