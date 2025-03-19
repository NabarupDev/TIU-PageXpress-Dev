import React from "react";

const Template3Preview = ({ data, isPreview = false }) => {
  // For preview thumbnails, apply scaling
  const scale = isPreview ? 0.25 : 1;
  const containerWidth = isPreview ? "800px" : "100%";
  const containerHeight = isPreview ? "1130px" : "100%"; // A4 proportions
  
  // The component expects 'data' but your original code uses 'formData'
  const formData = {
    studentId: data.studentId || "TIU12345",
    name: data.name || "John Doe",
    stream: data.stream || "Computer Science",
    semester: data.semester || "6th",
    subject: data.subject || "Web Development"
  };

  return (
    <div 
      style={{ 
        width: containerWidth, 
        height: containerHeight,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        backgroundColor: "white",
        border: isPreview ? "1px solid #ccc" : "none"
      }}
    >
      <div style={{ width: "80%", margin: "auto", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* University Logo & Name */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ height: "50px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#666" }}>University Logo</span>
          </div>
          <h2 style={{ margin: "5px 0" }}>TECHNO INDIA UNIVERSITY</h2>
          <h4>WEST BENGAL</h4>
          <p>
            EM 4, SECTOR V, SALT LAKE, KOLKATA - 700091, WEST BENGAL, INDIA 
          </p>
        </div>
        {/* Subject Title */}
        <h3 style={{ textDecoration: "underline", marginBottom: "20px" }}>
          {formData.subject.toUpperCase()}
        </h3>
        {/* Table for Details */}
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={cellStyle}>STUDENT ID</td>
              <td style={cellStyle}>{formData.studentId}</td>
            </tr>
            <tr>
              <td style={cellStyle}>STUDENT NAME</td>
              <td style={cellStyle}>{formData.name}</td>
            </tr>
            <tr>
              <td style={cellStyle}>BATCH (DEPARTMENT)</td>
              <td style={cellStyle}>{formData.stream}</td>
            </tr>
            <tr>
              <td style={cellStyle}>SEMESTER</td>
              <td style={cellStyle}>{formData.semester.toUpperCase()} SEMESTER</td>
            </tr>
            <tr>
              <td style={cellStyle}>STREAM</td>
              <td style={cellStyle}>{formData.stream}</td>
            </tr>
            <tr>
              <td style={cellStyle}>YEAR</td>
              <td style={cellStyle}>2024 - 2025</td>
            </tr>
          </tbody>
        </table>
        
        
      </div>
    </div>
  );
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

export default Template3Preview;