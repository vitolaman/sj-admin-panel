export const quilFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "align",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
];

export const quilModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["link"],
    [{ size: [] }],
    [{ color: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};
