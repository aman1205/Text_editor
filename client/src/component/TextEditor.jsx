import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import axios from "axios";

const OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
  [{ placeholder: "Compose an epic..." }],
];

const TextEditor = () => {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const { documentId } = useParams();
  const usedispatch = useDispatch();

  //Connecting to Socket
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // Load the Document and getting Document data
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // Saved Document Data on every 2 Second
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const HandlerEvent = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("recived-changes", HandlerEvent);
    return () => {
      socket.off("recived-changes", HandlerEvent);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const HandlerEvent = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", HandlerEvent);
    return () => {
      quill.off("text-change", HandlerEvent);
    };
  }, [socket, quill]);

  const refwrapper = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    var qu = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: OPTIONS },
    });
    qu.disable();
    qu.setText("Loading.....");
    setQuill(qu);
  }, []);

  const handleLogout = async () => {
    const response = await axios.post("http://localhost:5000/user/logout");
    if (response.status == 200) {
      alert("Logout Successfull");
    }
    usedispatch(logout());
  };

  return (
    <>
      <div className="container" ref={refwrapper}>
      </div>
      <div>
        <button className="logout" onClick={handleLogout}>
          logout
        </button>
      </div>
    </>
  );
};

export default TextEditor;
