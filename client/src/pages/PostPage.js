import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
import Post from "../Post";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });

    // Fetch recent posts
    fetch('http://localhost:4000/post')
      .then(response => {
        response.json().then(posts => {
          // Filter out current post and get 3 most recent
          const filteredPosts = posts.filter(post => post._id !== id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setRecentPosts(filteredPosts);
        });
      });
  }, [id]);

  if (!postInfo) return '';

  return (
    <div className="post-page" style={{
      maxWidth: '100%',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <div className="post-header" style={{
        textAlign: 'left',
        marginBottom: '2rem',
        padding: '0 1rem'
      }}>
        <h1 style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: '#1a1a1a',
          textAlign: 'left',
          fontWeight: '600',
          lineHeight: '1.2'
        }}>{postInfo.title}</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>aitam</span>
          </div>
        </div>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row" style={{ marginBottom: '2rem' }}>
          <Link className="edit-btn" to={`/edit/${postInfo._id}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s',
            ':hover': {
              backgroundColor: '#e5e7eb'
            }
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              style={{ width: '20px', height: '20px' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image" style={{
        width: '100%',
        maxHeight: '600px',
        overflow: 'hidden',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }}>
        <img 
          src={`http://localhost:4000/${postInfo.cover}`} 
          alt="" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} style={{
        fontSize: '1.125rem',
        lineHeight: '1.75',
        color: '#374151',
        marginBottom: '3rem'
      }} />

      <div style={{ marginTop: '4rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          color: '#1a1a1a',
          fontWeight: '600'
        }}>Recent Posts</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {recentPosts.map(post => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}