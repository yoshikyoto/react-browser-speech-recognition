import React, { useEffect, useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [document, setDocument] = useState<string>('');
  const [finalizedPointer, setFinalizedPointer] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (finalTranscript.length !== finalizedPointer) {
        const updated = finalTranscript.slice(finalizedPointer)
        setDocument(document + "\n\n" + updated)
        setFinalizedPointer(finalTranscript.length)
      }
    }, 1000)
  })

  return (
    <div className="App">
      <h1>音声認識</h1>
      <p>
        Google Chrome のみ対応しています<br/>
        {browserSupportsSpeechRecognition ?
          'お使いのブラウザは音声認識に対応しています' :
          'お使いのブラウザは音声認識に対応していません'}<br></br>
      </p>
      <p>
        {listening ? '音声認識中' : 'スタートボタンを押してください'}
      </p>
      <button onClick={e => SpeechRecognition.startListening({ continuous: true })}>
        音声認識スタート
      </button>
      <button onClick={e => SpeechRecognition.stopListening()}>
        ストップ
      </button>
      <button onClick={e => {
        setDocument('')
        setFinalizedPointer(0)
        resetTranscript()
      }}>
        リセット(全て削除)
      </button>
      <h2>現在認識中の文字</h2>
      <p>{transcript.slice(-50)}</p>
      <h2>エディタ</h2>
      <p>音声認識が確定したものがテキストボックスに追加されていきます</p>
      <div>
        <textarea
          value={document}
          onChange={e => setDocument(e.target.value)}
          style={{width:640, height:400}}>

        </textarea>
      </div>
    </div>
  );
}

export default App;
