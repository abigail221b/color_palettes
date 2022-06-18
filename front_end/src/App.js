import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';

function App() {

    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isSmallMenuExpanded, setIsSmallMenuExpanded] = useState(false);

    return (
        <div className="App">
            <nav>
                <Link to="popular">
                    <span className="brand">Color Palettes</span>
                </Link>

                <input id="bmenub" type="checkbox" className="show" onChange={() => setIsMenuExpanded(isMenuExpanded => !isMenuExpanded)}/>
                <label for="bmenub" className="burger pseudo button">Menu</label>

                <div className="menu">
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    {isMenuExpanded?
                        <>
                            <Link to="create">Create</Link>
                            <Link to="likes">Likes</Link>
                            <Link to="collection">Collection</Link>
                        </> :
                        <>
                            <a style={{"position":"relative", "cursor":"pointer"}} onClick={() => setIsSmallMenuExpanded(isSmallMenuExpanded => !isSmallMenuExpanded)}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 19 20" width="25"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    <div className="card" style={isSmallMenuExpanded? {"padding":"10px" ,"display":"flex", "flex-direction":"column", "position": "absolute", "right":"0px", "width":"250px", "textAlign": "left"} : {"display":"none"}}>
                                        <header>Hello demo_user!</header>
                                        <footer>
                                            <Link to="create"><span className="stack pseudo button" style={{"width":"100%"}}>Create</span></Link>
                                            <Link to="likes"><span className="stack pseudo button" style={{"width":"100%"}}>Likes</span></Link>
                                            <Link to="collection"><span className="stack pseudo button" style={{"width":"100%"}}>Collection</span></Link>
                                        </footer>
                                    </div>
                                </span>
                            </a>
                        </>
                    }
                </div>
            </nav>
            <div className="wrapper">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
