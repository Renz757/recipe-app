import React from "react"
import ReactDOM from "react-dom"
import { useDispatch } from "react-redux"

const Overlay = () => {
    return <div className="fixed bg-zinc-500 w-full h-screen z-20 opacity-70 transition-all ease-in-out duration-600 md:hidden"></div>
}

const Backdrop = () => {
    const dispatch = useDispatch()
    
    return(
        <>
            {ReactDOM.createPortal(<Overlay/>, document.getElementById('backdrop-root'))}
        </>
    );
}

export default Backdrop