import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    setFiles(ev.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="create-post-container">
      <form onSubmit={createNewPost} className="create-post-form">
        <div className="form-group">
          <input 
            type="text"
            className="form-input"
            placeholder="Enter post title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
        
        <div className="form-group">
          <input 
            type="text"
            className="form-input"
            placeholder="Enter post summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
          />
        </div>

        <div className="form-group file-upload">
          <label className="file-upload-label">
            Choose Cover Image
            <input 
              type="file"
              className="file-input"
              onChange={handleFileChange}
            />
          </label>
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>

        <div className="form-group editor-container">
          <Editor value={content} onChange={setContent} />
        </div>

        <button className="submit-button">
          Create Post
        </button>
      </form>

      <style jsx>{`
        .create-post-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .create-post-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
        }

        .file-upload {
          margin: 1rem 0;
        }

        .file-upload-label {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }

        .file-upload-label:hover {
          background: #d1d5db;
          transform: scale(1.02);
        }

        .file-input {
          display: none;
        }

        .image-preview {
          margin-top: 1rem;
          max-width: 100%;
        }

        .preview-image {
          max-width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .editor-container {
          min-height: 300px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 1rem;
          background: #ffffff;
        }

        .submit-button {
          padding: 0.75rem 1.5rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }

        .submit-button:hover {
          background: #4338ca;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}