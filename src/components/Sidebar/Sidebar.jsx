import React, { useContext, useState } from "react";
import './Sidebar.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Sidebar() {
    const [extend, setextend] = useState(true);
    const { onSent, prevPrompts,setloading,setshowResult,setresultData } = useContext(Context);

    const sendIT = async(prompt) =>
    {
        await onSent(prompt)
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => { setextend(!extend) }} className='menu' src={assets.menu_icon}></img>
                <div 
                onClick={()=>{
                    setloading(false);
                    setshowResult(false);
                }} 
                className="new-chat">
                    <img className='' src={assets.plus_icon}></img>
                    {extend ? <p>New Chat</p> : null}
                </div>
                {extend ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    {
                        prevPrompts.map((pro,index) => {
                            // console.log(index, pro);
                           return( <div key={index}  onClick={()=>sendIT(pro)} className="recent-entry">
{/* Changed onClick={sendIT(pro)} to onClick={() => sendIT(pro)} to ensure sendIT is called only when the div is clicked, rather than immediately during the render. */}

                                <img src={assets.message_icon} alt="" />
                                <p>{pro.slice(0,18)} ...</p>
                            </div>)

                        })
                    }



                </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item-entry">
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {extend ? <p>Help</p> : null}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extend ? <p>Activity</p> : null}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.setting_icon} alt="" />
                        {extend ? <p>Settings</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;