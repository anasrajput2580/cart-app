import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const MembershipForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cellno, setCellno] = useState("");
    const [errors, setErrors] = useState({});
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const recaptchaRef = useRef(null); // For resetting reCAPTCHA
    const navigate = useNavigate();
    // Validator function
  const validateForm = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required.";
    else if (name.length < 3) validationErrors.name = "Name must be at least 3 characters.";

    if (!email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = "Invalid email address.";

    if (!password) validationErrors.password = "Password is required.";
    else if (password.length < 6) validationErrors.password = "Password must be at least 6 characters.";

    return validationErrors;
  };
   
    // const handleSignUp = async (e) => {
    //   e.preventDefault();
    
    //   if (!captchaVerified) {
    //     alert("Please verify that you are not a robot!");
    //     return;
    //   }
    
    //   const validationErrors = validateForm();
    //   if (Object.keys(validationErrors).length > 0) {
    //     setErrors(validationErrors);
    //   } else {
    //     try {
    //       const response = await fetch("http://localhost:5000/api/register", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ name, email, password, cellno }), // Include cellno
    //       });
    
    //       if (response.ok) {
    //         alert("Membership created successfully!");
    //         recaptchaRef.current.reset();
    //         setCaptchaVerified(false);
    //         navigate("/");
    //       } else {
    //         const errorText = await response.text();
    //         alert(`Error: ${errorText}`);
    //       }
    //     } catch (error) {
    //       alert(`Error: ${error.message}`);
    //     }
    //   }
    // };
    
    const handleSignUp = async (e) => {
      e.preventDefault();
  
      if (!captchaVerified) {
          alert("Please verify that you are not a robot!");
          return;
      }
  
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
      } else {
          try {
              const response = await fetch("http://localhost:5000/api/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, password, cellno }), // Include cellno
              });
  
              if (response.ok) {
                  alert("Membership created successfully!");
                  recaptchaRef.current.reset();
                  setCaptchaVerified(false);
                  navigate("/");
              } else {
                  const errorText = await response.text();
                  alert(`Error: ${errorText}`);
              }
          } catch (error) {
              alert(`Error: ${error.message}`);
          }
      }
  };
  

    const handleCaptchaChange = (token) => {
        if (token) {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false);
        }
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        fontFamily: "Arial, sans-serif",
    };

    const formStyle = {
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    };

    const headingStyle = {
        fontSize: "1.8rem",
        marginBottom: "1rem",
        color: "#333333",
    };
    const errorStyle = {
        color: "red",
        fontSize: "0.9rem",
        textAlign: "left",
        marginBottom: "0.5rem",
      };
    const inputStyle = {
        width: "90%",
        padding: "10px",
        margin: "0.5rem 0",
        border: "1px solid #cccccc",
        borderRadius: "5px",
        fontSize: "1rem",
    };

    const buttonStyle = {
        backgroundColor: "#6a11cb",
        color: "#ffffff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s ease",
        marginTop: "1rem",
    };

    const buttonHoverStyle = {
        backgroundColor: "#2575fc",
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSignUp}>
                <h2 style={headingStyle}>Membership Form</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                />
                 {errors.name && <div style={errorStyle}>{errors.name}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                  {errors.password && <div style={errorStyle}>{errors.password}</div>}
                  <input
                    type="text"
                    placeholder="Cell No"
                    value={cellno}
                    onChange={(e) => setCellno(e.target.value)}
                    style={inputStyle}
                />
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key
                    onChange={handleCaptchaChange}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                    Sign Up
                 </button>
            </form>
        </div>
    );
};

export default MembershipForm;