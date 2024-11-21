import React, { useState } from 'react';
import './card.css';

function Card({ title, description, imageUrl, buttonText, onButtonClick, extraInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main Card */}
      <div className="card" onClick={handleCardClick}>
        <img src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <button className="card-button" onClick={(e) => { e.stopPropagation(); onButtonClick(); }}>
            {buttonText}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} className="modal-image" />
            <p>{extraInfo}</p>\
            <div className="row">
                <button className="modal-close-button" onClick={closeModal}>
                Close
                </button>
                <button className="card-button" onClick={(e) => { e.stopPropagation(); onButtonClick(); closeModal(); }}>
                    {buttonText}
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
