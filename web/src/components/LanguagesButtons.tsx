import React from 'react';
import './LanguagesButtons.css';

export default function LanguagesButtons({ languages, languageChosen }: any) {
  // get language chosen value and send up
  const clickHandler = (e: any) => {
    const language = e.target.innerHTML;
    languageChosen(language);
  };

  // best not to use index for key id
  const mappedButtons = languages.map((language: any, index: any) => {
    return (
      <button onClick={clickHandler} className="languageButton" key={index}>
        {language}
      </button>
    );
  });

  return <div className="buttonContainer">{mappedButtons}</div>;
}
