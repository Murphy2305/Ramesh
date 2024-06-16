import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultData, setresultData] = useState("");

    const type = (index, word) => {
        setTimeout(function () {
            setresultData(prev => prev + word);
        }, 75 * index)
    }
    const onSent = async (prompt) => {

        setresultData("")
        setloading(true)
        setshowResult(true)

        let response;
       
        if (prompt !== undefined) {
            setrecentPrompt(prompt);
            response = await run(prompt);
        }
        else {
            setrecentPrompt(input)
            // console.log('audbhajd');
            setprevPrompts(prev =>[...prev, input]);
            // console.log(prevPrompts);
            response = await run(input);
        }



        let newresponse = response.split('**');
        let newarr = "";
        for (let i = 0; i < newresponse.length; i++) {
            if (i % 2 === 0) {
                newarr = newarr + newresponse[i];
            }
            else {
                newarr = newarr + '<b>' + newresponse[i] + '</b>'
            }
        }
        let newResponse = newarr.split('*').join('</br>');

        let a = newResponse.split(' ');
        for (let i = 0; i < a.length; i++) {
            type(i, a[i] + " ");
        }


        setloading(false);
        setinput("");
    }
    // onSent("phonepe in India");

    const contextValue = {
        prevPrompts,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput,
        setprevPrompts,
        onSent,
        setrecentPrompt,
        setresultData,
        setloading,
        setshowResult,
    }



    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;

































