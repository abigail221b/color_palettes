import { useState } from "react";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/user/login", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => console.log(res.msg));
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
        </div>
    );
}

export default Login;
