import React from "react";
import ReactQuill from "react-quill";

export default function Editor({value,onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3,false] }],
      ['bold', 'code', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div className="content">
      <style>
        {`
          .custom-editor .ql-editor a {
            text-decoration: none !important; /* Remove underline */
            color: blue !important; /* Use the inherited color */
            font-weight: 600 !important;
          }
        `}
      </style>
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
        className="custom-editor"
      />
    </div>
  );
}
