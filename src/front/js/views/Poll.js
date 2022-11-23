import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
//import ReactDOM from 'react-dom';
import '../../styles/poll.css'
const Poll = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const user_id = store.currentUser?.user?.id;
    const [matchID, setMatchID] = useState()
    const [imageMatch, setImageMatch] = useState(null);
    const [formData, setFormData] = useState(null);
    const [firstInput, setFirstInput] = useState('7');
    const [secondInput, setSecondInput] = useState('7');

    useEffect(() => {
        fetchMatch()
    }, [])

    useEffect(() => {
        getImageMatch()
    }, [matchID])



    const fetchMatch = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/matches/${user_id}`);
            const data = await response.json()
            console.log(`${process.env.BACKEND_URL}/api/matches/${user_id}`);
            setMatchID(data.match_id)


        } catch (error) {
            console.log(error)
        }
    }

    const getImageMatch = async () => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/userpictures/${matchID}`
            );
            const data = await response.json();
            setImageMatch(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFirstInput = (e) => {
        setFirstInput(e.target.value)
    }
    const handleSecondInput = (e) => {
        setSecondInput(e.target.value)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        console.log(formData)
    };
    const handleSubmitPoll = async (e) => {
        e.preventDefault()

        try {
            //console.log("attempt to fetch")

            const response = await fetch(`${process.env.BACKEND_URL}/users/${matchID}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)

            });
            const data = await response.json()
            window.location = '/save'
            console.log(matchID)
            console.log(data);

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='full-poll'>
            <form onSubmit={handleSubmitPoll} id='rating'>
                <div className='container'>
                    <h1 className='text-center pt-3'>YOUR TRIP HAS BEEN COMPLETED</h1>
                    <h5 className='text-center'>Please give us your feedback on the partner you chose</h5>
                    <div className='row mt-5 d-flex'>
                        <div className='col-lg-5 col-12'>

                        {imageMatch ? (
                                <div className="m-auto" >
                                    
                                        <img
                                            src={imageMatch.filename}
                                            className="imagematch img-thumbnail img-fluid mx-auto"
                                            alt="..."
                                            key={imageMatch.id}
                                        />
                                    
                                </div>) : (
                                ""
                            )}
                            <div className='mt-3 '>

                                <textarea className='form-control w-75 mx-auto mb-3' id='validationTextarea' placeholder='Please tell us briefly about your experience' name='experience' required onChange={(e) => handleChange(e)}></textarea>
                                <div className='invalid-feedback'>
                                    Please enter a message.
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-12 align-content-center'>
                            <p>From 1 to 7, being 1 the worst and 7 the best experience: </p>
                            <p className="instructions">(set sliders according to your preferences)</p>
                            <label htmlFor='customRange1' className='form-label'>Was your partner a good match according to what you were looking for?</label>
                            <div className='d-flex'>
                                <input type='range' className='slider form-range w-50 mb-3  in-line' min='1' max='7' step='1' id='customRange1' onInput={handleFirstInput} name='good_match' value={firstInput} onChange={(e) => handleChange(e)} />
                                <label className='form-label in-line ms-4' id='rangeValue'>{firstInput}</label>
                            </div>
                            <p htmlFor='customRange2' className='form-label'>Would you recommend your partner to join other travellers?</p>
                            <div className='d-flex'>
                                <input type='range' className='slider form-range w-50 mb-3' min='1' max='7' step='1' id='customRange2' onInput={handleSecondInput} name='recommend' value={secondInput} onChange={(e) => handleChange(e)} />
                                <p className='d-flex in-line ms-4' id='rangeValue'>{secondInput}</p>
                            </div>
                            <div className={'mb-3' + (secondInput < 5 ? ' d-none' : '')}>
                                <p className='form-label'>Please tell us why do you recommend your partner (choose one)</p>
                                <div className='form-check '>
                                    <input className='form-check-input' type='radio' id='Checkbox1' name='reason_good' value='Funny' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox1'>Funny</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox4' name='reason_good' value='Love Adventures' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox4'>Love Adventures</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox2' name='reason_good' value='Relax' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox2'>Relax</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox3' name='reason_good' value='Good Talking' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox3'>Good Talking</label>
                                </div>

                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='Checkbox5' name='reason_good' value='Good at History' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox5'>Good at History</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input className='form-check-input ' type='radio' id='Checkbox6' name='reason_good' value='Great Dancer' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox6'>Great Dancer</label>
                                </div>
                            </div>
                            <div className={'mb-3' + (secondInput >= 5 ? ' d-none' : '')}>
                                <label className='form-label'>Please tell us why do you not recommend your partner (choose one)</label>
                                <div className='form-check'>
                                    <input className='form-check-input display-none' type='radio' id='secondCheckbox1' name='reason_bad' value='Bored' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox1'>Bored</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox2' name='reason_bad' value='Disrespectful' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox2'>Disrespectful</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox3' name='reason_bad' value='Obscene' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox3'>Obscene</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox4' name='reason_bad' value='Complaining person' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox4'>Complaining person</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox5' name='reason_bad' value='Unpunctual' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox5'>Unpunctual</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' id='secondCheckbox6' name='reason_bad' value='Messy' onChange={(e) => handleChange(e)} />
                                    <label className='form-check-label' htmlFor='Checkbox6'>Messy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-lg-3 col-12 ms-auto">
                            <button type='submit' className='btn btn-primary mb-5 btn-lg'>Submit</button>
                        </div>
                    </div>


                </div>

            </form>
        </div>
    )
}
export default Poll;