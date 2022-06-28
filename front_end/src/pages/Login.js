import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/loginSlice";
import { initalizePalettes } from "../redux/likesSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/user/login", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 200) {
                res.json().then(res => {
                    dispatch(login({ isLoggedIn: true, username: res.username }));

                    fetch(`/palettes/user/${ res.username }/likes`)
                    .then(res => res.json())
                    .then(palettes => {
                        dispatch(initalizePalettes(palettes));
                        navigate("../popular", { replace: true });
                    });
                });
            } else {
                res.json().then(res => setMsg(res.msg));
            }
        })
    }

    const form_style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "5px"
    };

    return (
        <div className="Login" style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Login</h1>
            <div>
                <form onSubmit={ handleSubmit } style={form_style}>
                    <input type="text" name="username" placeholder="username" onChange={ (e) => setUsername(e.target.value)}></input>
                    <input type="password" name="password" placeholder="password" onChange={ (e) => setPassword(e.target.value) }></input>
                    <button type="submit">Login</button>
                </form>
            </div>
            { msg }
        </div>
    );
}

export default Login;
