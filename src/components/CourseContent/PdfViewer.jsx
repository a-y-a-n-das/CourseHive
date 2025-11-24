import { useEffect, useState } from "react";

function PdfViewer({ title, file, courseId }) {
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("edu-token");
        const res = await fetch(`${API}/api/getvideourl/${courseId}/${file}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setPdfUrl(data.url);
        } else {
          console.error("Failed to fetch PDF URL:", data.message);
        }
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    };
    fetchPdfUrl();
  }, [API, courseId, file]);

  if (!pdfUrl) return <p>Loading PDF...</p>;

  return (
    <>
      <div style={{ width: "80%", height: "90vh", display: "flex", justifyContent: "center", marginLeft: 260, marginTop: "2vh", padding: 20}}>
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
          }}
          title={title}
        />
      </div>
    </>
  );
}

export default PdfViewer;
