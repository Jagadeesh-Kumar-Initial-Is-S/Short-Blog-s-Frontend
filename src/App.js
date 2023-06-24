import { useState, useEffect } from 'react';
import axios from "axios";

import './app.css';
import Item from './components/Item'

function App() {

  const [text, setText] = useState("");
  const [todo, setBlog] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  useEffect(() => {
    axios.get("https://short-blog-s-backend.vercel.app/get-blog" || "http://localhost:5000/get-blog")
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  })

  const addUpdateBlog = () => {

    if (isUpdating === "") {
      axios.post("https://short-blog-s-backend.vercel.app/save-blog" || "http://localhost:5000/save-blog", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .catch((err) => console.log(err));
    } else {
      axios.post("https://short-blog-s-backend.vercel.app/update-blog" || "http://localhost:5000/update-blog", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteBlog = (_id) => {
    axios.post("https://short-blog-s-backend.vercel.app/delete-blog" || "http://localhost:5000/delete-blog", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const updateBlog = (_id, text) => {
    setUpdating(_id);
    setText(text);
  }

  return (

    <div className="App">
      <div className="container">
        <h1>Short Blog Application</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addUpdateBlog}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {todo.map(item => <Item
            key={item._id}
            text={item.text}
            remove={() => deleteBlog(item._id)}
            update={() => updateBlog(item._id, item.text)} />)}
        </div>

      </div>
    </div>

  );
}

export default App;
