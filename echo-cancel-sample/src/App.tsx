import React, { useEffect, useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder|null>(null)
  const [mediaSource, setMediaSource] = useState<string|null>(null)

  const startRecording = () => {
    console.log("start recording")
    navigator.mediaDevices.getUserMedia({
      audio: {advanced: [{echoCancellation: true}]}
    }).then((stream) => {
      console.log("then stream")
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (e) => {
        console.log("on data available")
        setMediaSource(URL.createObjectURL(e.data))
      }
      mediaRecorder.start()
      setMediaRecorder(mediaRecorder)
    })
  }

  const stopRecording = () => {
    console.log("stop recording")
    mediaRecorder?.stop()
  }

  return (
    <div className="App">
      <h1>エコーキャンセル</h1>
      <div>
        <button onClick={e => {startRecording()}}>録音開始</button>
        <button onClick={e => {stopRecording()}}>録音終了</button>
      </div>
      <div>{mediaSource && <audio src={mediaSource} controls></audio>}</div>
    </div>
  );
}

export default App;
