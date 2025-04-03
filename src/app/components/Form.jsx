'use client'
import { useEffect, useState } from "react";
import { addData, updateData } from '../api/routes'; 

export default function Form({ setPost, post, update, setUpdate }) {
  const [add, setAdd] = useState({ title: "", body: "" });

  const isEmpty = Object.keys(update).length === 0;

  useEffect(() => {
    if (update?.id) {
      setAdd({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);

  const handleChange = (e) => {
    setAdd((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formAdd = async () => {
    try {
      const res = await addData(add);
      if (res.status === 201) {
        setPost([...post, { ...add, id: res.data.id }]);
        setAdd({ title: '', body: '' });
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(update.id, add);
      if (res.status === 200) {
        setPost((prevPosts) =>
          prevPosts.map((post) => (post.id === res.data.id ? res.data : post))
        );
        setAdd({ title: "", body: "" });
        setUpdate({});
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEmpty ? formAdd() : updatePostData();
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="input-field"
          value={add.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="body"
          placeholder="Enter Body"
          className="input-field"
          value={add.body}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-button">
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
}

