import React, { useContext, useRef, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import Typed from 'typed.js';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setinput, input } = useContext(Context);

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["are you?", "can I help you today?"],
      typeSpeed: 75,
      backSpeed: 75,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <p>Mitra</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span className="hwww">Hello, Kushal.</span></p>
              <p>How <span ref={el}></span></p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => setinput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Enter a prompt here' 
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Mitra may display inaccurate info, including about people, so double-check its response. Your privacy and Mitra Apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
