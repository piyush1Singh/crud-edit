"use client";
import { useState, useEffect } from "react";
import React from "react";
import {viewData} from '../api/routes'
import {deleteData} from '../api/routes'
import Form from "./Form";

export default function PageView() {
  const [post, setPost] = useState([]);

  const [update,setUpdate]=useState({})

  const deleteClick = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        setPost((prevPosts) => prevPosts.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  const handleEdit = (post) => {
    setUpdate(post);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewData();
        console.log(res.data);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Form post={post} setPost={setPost} setUpdate={setUpdate} update={update}  />
      <div className="row">
        {post.map(({ id, title, body }) => (
          <div className="col-lg-4" key={id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEdit({ id, title, body })}>
  Edit
</button>
                <button className="btn btn-danger" onClick={() => deleteClick(id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
