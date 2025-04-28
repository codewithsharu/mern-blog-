import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div
      className="post"
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        backgroundColor: "#fff",
        margin: "18px",
        width: "clamp(17.5rem, 100%, 22rem)",
        flex: "0 0 auto",
        verticalAlign: "top",
       
      }}
    >
      <Link to={`/post/${_id}`} style={{ textDecoration: "none" }}>
        <div
          className="image"
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <img
            src={"http://localhost:4000/" + cover}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </Link>
      <div
        className="texts"
        style={{
          padding: "28px 24px 24px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >

<Link
          to={`/post/${_id}`}
          style={{
            textDecoration: "none",
            color: "#111827",
            marginBottom: "10px",
            fontWeight: 500,
            fontSize: "1.35rem",
            lineHeight: 1.3,
            display: "block",
            transition: "color 0.2s ease-in-out",
          }}
          onMouseOver={(e) => e.target.style.color = "#dc2626"}
          onMouseOut={(e) => e.target.style.color = "#111827"}
        >
          {title}
        </Link>
        <div
          className="post-meta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "14px",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#dc2626", fontWeight: 600 }}>Aitam SSC</span>
          <span style={{ fontSize: "0.9em" }}>•</span>
          <time dateTime={createdAt}>
            {format(new Date(createdAt), "LLLL dd, yyyy")}
          </time>
        </div>

      
        <Link
          to={`/post/${_id}`}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            backgroundColor: "#dc2626",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            alignSelf: "flex-start",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b91c1c"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#dc2626"}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}