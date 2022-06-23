import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function LikeButton({ handleLike, numLikes, liked }) {

    const isLoggedIn = useSelector(state => state.login.value);

    if(isLoggedIn) {
        return (
            <div className="LikeButton">
                <label
                    className="button"
                    style={{ backgroundColor: liked? "pink" : "white", border: "2px solid pink", "color": "black" }}
                    onClick={ handleLike }>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -5 26 26" width="20"><path d="M0 0h24v24H0z" fill="none"/><path stroke-width=".15" stroke="white" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                        { numLikes }
                </label>
            </div>
        );
    }

    return (
        <div className="LikeButton">
            <label
                htmlFor="modal_1"
                className="button"
                style={{ backgroundColor: liked? "pink" : "white", border: "2px solid pink", "color": "black" }}
                onClick={ handleLike }>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -5 26 26" width="20"><path d="M0 0h24v24H0z" fill="none"/><path stroke-width=".15" stroke="white" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                    { numLikes }
            </label>
            <div className="modal">
                <input id="modal_1" type="checkbox" />
                <label htmlFor="modal_1" className="overlay"></label>
                <article style={{ padding: "25px"}}>
                    <label htmlFor="modal_1" className="close">&times;</label>
                    <section className="content">
                        <Link to="login"><span style={{ textDecoration: "underline"}}>Log in</span></Link> or&nbsp;
                        <Link to="signup"><span style={{ textDecoration: "underline"}}>Signup</span></Link>
                        &nbsp;for an account
                    </section>
                </article>
            </div>
        </div>
    );
}

export default LikeButton;
