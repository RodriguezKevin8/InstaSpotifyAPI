// src/Stories.jsx
import { useState } from 'react';
import './Stories.css';
import BadBunny from '/img/BadBunny.jpg';
import PesoPluma from '/img/pesopluma.png';
import Duki from '/img/duki.png';
import Drake from '/img/drake.png';
import Eladio from '/img/eladio.png';

// Imágenes de la historia para el modal
import BadBunnyStory from '/img/storiebadbunny.jpg';
import PesoPlumaStory from '/img/storiepesopluma.jpg';
import DukiStory from '/img/storieduki.jpg';


const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storiesData = [
    { id: 1, name: "Bad Bunny", imageUrl: BadBunny, storyImageUrl: BadBunnyStory },
    { id: 2, name: "Peso Pluma", imageUrl: PesoPluma, storyImageUrl: PesoPlumaStory },
    { id: 3, name: "Duki", imageUrl: Duki, storyImageUrl: DukiStory },
    { id: 4, name: "Drake", imageUrl: Drake, storyImageUrl: DukiStory },
    { id: 5, name: "Eladio", imageUrl: Eladio, storyImageUrl: PesoPlumaStory },
    { id: 6, name: "Bad Bunny", imageUrl: BadBunny, storyImageUrl: BadBunnyStory },
    { id: 7, name: "Peso Pluma", imageUrl: PesoPluma, storyImageUrl: PesoPlumaStory },
    { id: 8, name: "Duki", imageUrl: Duki, storyImageUrl: DukiStory },
    { id: 9, name: "Drake", imageUrl: Drake, storyImageUrl: DukiStory },
    { id: 10, name: "Eladio", imageUrl: Eladio, storyImageUrl: PesoPlumaStory }
  ];

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false); // Cierra el modal después de 10 segundos
    }, 5000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="stories">
      {storiesData.map((story) => (
        <div className="story" key={story.id} onClick={() => openModal(story)}>
          <img src={story.imageUrl} alt={`${story.name}'s profile`} className="story-image" />
          <p className="story-name">{story.name}</p>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedStory.name}</h2>
            <img src={selectedStory.storyImageUrl} alt={`${selectedStory.name}'s story`} className="modal-image" />
            <p>Historia de {selectedStory.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
