import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function QuesBox(props) {
    const [question, setQuestion] = useState("")
    const [option, setOption] = useState([])
    const [answer, setAnswer] = useState([])
    const [userOption, setUserOption] = useState("")


    useEffect(() => {
        let headers = {
            'Content-Type': 'application/json;charset=utf-8',
            "Access-Control-Allow-Origin": "*",
            "jwt": sessionStorage.getItem('access-token')
        }
        let payload = {}
        axios.get(`https://3.108.254.239:3000/getQuestion?level=${props.level}`, { headers })
            .then((response) => {
                setQuestion(response.data.data[0].question)
                setAnswer(response.data.data[0].answer)
                setOption(response.data.data[0].option)
            })
    }, [props.level])
    
    const handleChange = (e) => {
        console.log(e.target.value)
        setUserOption(e.target.value)
    }

    const submitAns = () => {
        if(userOption===answer[0]) {props.markCorrectAns()}
        else {props.markIncorrectAns()}   
        
    }

    return (
        <div className='box'>
            <h5>Q:</h5>
            <p>{question}</p>
            <div className='radio-button'>
                <input type="radio"
                    value={option[0]}
                    checked={userOption === option[0]}
                    onChange={(e) => handleChange(e)}
                    id={option[0]}
                />
                <label for={option[0]}>{ option[0]}</label>
            </div>
            <div className='radio-button'>
                <input type="radio"
                    value={option[1]}
                    checked={userOption === option[1]}
                    onChange={(e) => handleChange(e)}
                    id={option[1]}
                />
                <label for={option[1]}>{option[1]}</label>
            </div>
            <div className='radio-button'>
                <input type="radio"
                    value={option[2]}
                    checked={userOption === option[2]}
                    onChange={(e) => handleChange(e)}
                    id={option[2]}
                />
                <label for={option[2]}>{ option[2]}</label>
            </div>
            <div className='radio-button'>
                <input type="radio"
                    value={option[3]}
                    checked={userOption === option[3]}
                    onChange={(e) => handleChange(e)}
                    id={option[3]}
                />
                <label for={option[3]}>{option[3] }</label>
            </div>
            <div>
                <br />
            <button className="button"
            onClick={() => submitAns()}>Submit</button>
            </div>            
        </div>
    )
}
