import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))
      )}
    </div>
  );
}