import React, { useState } from 'react'
import { addReviewToUsersList } from './services';

export default function AddReview({ setAdd, setUserState, add }) {

    const [form, setForm] = useState({
        restname: "",
        rating: "",
        textreview: "",
    });

    const updateForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {

        const name = form.restname;
        const rating = form.rating;
        const review = form.textreview;
        // setUserState({
        //     isLoggedIn: true,
        //     isPending: true,
        // })

        addReviewToUsersList({ name, rating, review })
            .then(userinfo => {
                setUserState({
                    isLoggedIn: true,
                    isPending: false,
                    info: userinfo,
                });
                console.log(`${userinfo}`)
            })
            .catch(() => {
                setUserState({
                    isLoggedIn: true,
                    isPending: false,
                })
            })
    }

    const handleOnClick = (e) => {
        const num = parseInt(e.target.value);
        console.log(`Dropdown rating number => ${num}`);

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleBack = function () {
        setAdd(false);
    }

    return (
        <div className="add-form">
            <form className="add-review-form" onSubmit={handleSubmit}>
                <div id="add-name">
                    <input id="restaurant-name" placeholder="Restaurant Name" type="text" name="restname" onChange={updateForm} value={form.restname} required="required" />
                </div>
                <div id="review-rating">
                    <label >Rating :</label>
                    <div className="dropdown">
                        <select onChange={handleOnClick} name="rating" required="required">
                            <option value="0">--Select--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div>
                    {/* <label>Review:</label> */}
                    <textarea placeholder="Write a review" id="reviewinput" type="text" name="textreview" onChange={updateForm} value={form.textreview} required="required"></textarea>
                </div>
                <button className="add-review-button" type="submit">Add Review</button>
            </form>
            <div>
                {add && <button id="back" onClick={handleBack}>back</button>}
            </div>
        </div>
    )
}
