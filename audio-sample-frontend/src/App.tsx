import React from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  navigator.mediaDevices.getUserMedia({
    audio: {advanced: [{echoCancellation: true}]}
  })
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  console.log(listening)
  return (
    <div className="App">
      <button onClick={e => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={e => SpeechRecognition.stopListening()}>Stop</button>
      <div>listening: {listening ? 'on' : 'off'}</div>
      <div>ブラウザ対応: {browserSupportsSpeechRecognition ? 'yes' : 'no'}</div>
      <p>{transcript}</p>
    </div>
  );
}

export default App;
