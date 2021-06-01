import AddReview from './AddReview';
import { useState } from 'react';
import { deleteReview } from './services';

const Reviews = function ({ reviews, setUserState }) {

    const [add, setAdd] = useState(false);

    const onClick = function () {
        setAdd(true);
    }

    // const handleBack = function () {
    //     setAdd(false);
    // }

    const handleDelete = function (event) {
        const name = event.target.dataset.index;
        setUserState({
            isLoggedIn: true,
            isPending: true,
        })
        for (let review in reviews) {
            if (reviews[review].name === name) {
                deleteReview(name)
                    .then(userinfo => {
                        console.log(`userInfo after deleteReview = >${JSON.stringify(userinfo)}`)
                        setUserState({
                            isLoggedIn: true,
                            isPending: false,
                            info: userinfo,
                        });

                    })
                    .catch(() => {
                        setUserState({
                            isLoggedIn: true,
                            isPending: false,
                        })
                    })
            } else {
                console.log(`not found`)
            }
        }
    }

    console.log(`Reveiws.jsx reviews => ${JSON.stringify(Object.keys(reviews))}`)

    if (!Object.keys(reviews)[1]) {
        return (
            <>
                <div id="no-review">No review Diary on this account</div>
                <button onClick={onClick} id="no-review-write-btn">Write a Review</button>
                {add && <AddReview setAdd={setAdd} setUserState={setUserState} add={add} />}

            </>
        )
    };

    return (
        <div className="reviews-contents">
            <h2>Reviews</h2>
            {!add && <button onClick={onClick} id="review-write-btn">Write a Review</button>}
            {add && <AddReview setAdd={setAdd} setUserState={setUserState} add={add} />}
            <ul id="review-ul">
                {!add && Object.keys(reviews).slice(1).map(review => {
                    return (

                        <div key={reviews[review].id} id="reivew-box">
                            <button id="review-delete" onClick={handleDelete} data-index={reviews[review].name}>X</button>

                            <div >Restaurant Name: <span className="restaurant"> {reviews[review].name}</span></div>
                            <div >Rating: <span className="restaurant">{reviews[review].rating}/5</span></div>
                            <div id="rev-tex">Review: <p id="rev" className="restaurant" >{reviews[review].review}</p></div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
};
export default Reviews;
