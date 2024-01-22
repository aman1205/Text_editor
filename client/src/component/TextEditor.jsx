import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import {io} from "socket.io-client"
const TextEditor = () => {
  const [quill, setQuill] =useState()
  const [socket, setSocket]=useState()

  const OPTIONS =[
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],  
  ]

  const refwrapper= useCallback((wrapper)=>{
    if(wrapper ==null) return
    wrapper.innerHTML=""
    const editor = document.createElement("div")
    wrapper.append(editor)
    var qu = new Quill(editor, {theme: 'snow' ,modules:{toolbar:OPTIONS}});
    setQuill(qu)
  },[])  


  useEffect(()=>{
    const s = io("http://localhost:5000");
    setSocket(s)
    return()=>{
      s.disconnect()
    }

  },[])

  useEffect(()=>{
    if (socket ==null || quill == null) return
    const HandlerEvent = (delta , oldDelta , source)=>{
      if (source !=='user') return
      socket.emit("send-changes" , delta)
    }
    quill.on('text-change' ,HandlerEvent)
    return()=>{
      quill.off('text-change' , HandlerEvent)
    }
  },[socket , quill])


  useEffect(()=>{
    if (socket ==null || quill == null) return
    const HandlerEvent = (delta)=>{
      quill.updateContents(delta)
    }
    socket.on('recived-changes' ,HandlerEvent)
    return()=>{
      socket.off('recived-changes' , HandlerEvent)
    }
  },[socket , quill])


  return (
    <div className="container" ref={refwrapper}></div>
  )

}

export default TextEditor
