import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setCoverPreview(postInfo.cover);
        });
      });
  }, []);

  const handleFileChange = (ev) => {
    setFiles(ev.target.files);
    if (ev.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target.result);
      };
      reader.readAsDataURL(ev.target.files[0]);
    }
  };

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <div className="edit-post-container" style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem'
    }}>
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#333',
        textAlign: 'center'
      }}>Edit Post</h1>
      
      <form onSubmit={updatePost} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '1.1rem',
            color: '#333',
            fontWeight: 500
          }}>Title</label>
          <input 
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              ':focus': {
                borderColor: '#dc2626'
              }
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '1.1rem',
            color: '#333',
            fontWeight: 500
          }}>Summary</label>
          <input 
            type="text"
            placeholder="Enter post summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '1.1rem',
            color: '#333',
            fontWeight: 500
          }}>Cover Image</label>
          {coverPreview && (
            <div style={{
              marginBottom: '1rem',
              borderRadius: '8px',
              overflow: 'hidden',
              maxWidth: '100%',
              maxHeight: '300px'
            }}>
              <img 
                src={coverPreview.startsWith('data:') ? coverPreview : `http://localhost:4000/${coverPreview}`}
                alt="Cover preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          <input 
            type="file"
            onChange={handleFileChange}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '1.1rem',
            color: '#333',
            fontWeight: 500
          }}>Content</label>
          <Editor onChange={setContent} value={content} />
        </div>

        <button 
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            alignSelf: 'flex-start',
            ':hover': {
              backgroundColor: '#b91c1c'
            }
          }}
        >
          Update Post
        </button>
      </form>
    </div>
  );
}