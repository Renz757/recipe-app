import React from "react"
import ReactDOM from "react-dom"

const Overlay = (props) => {
    return <div onClick={props.closeSideBar} className="fixed bg-zinc-500 w-full h-screen z-20 opacity-70 transition-all ease-in-out duration-600"></div>
}

const Backdrop = (props) => {
    return(
        <>
            {ReactDOM.createPortal(<Overlay closeSideBar={props.closeSideBar}/>, document.getElementById('backdrop-root'))}
        </>
    );
}

export default Backdrop