import { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [insta, setInsta] = useState("");
  const [linkdln, setLinkdln] = useState("");
  const [coredomain, setCoreDomain] = useState("");
  const [subdomain, setSubDomain] = useState("");
  const [position, setPosition] = useState("");
  const [pnumber, setPnumber] = useState("");


  const getSubdomainOptions = () => {
    if (coredomain === 'Technical') {
      return ['All','Web Dev', 'AI/ML', 'App Dev'];
    } else if (coredomain === 'Corporate') {
      return ['Events', 'Creative', 'Public Relations', 'Sponsorship'];
    }
    return [];
  };

  const getPositionOptions= () =>{
    if(coredomain === 'Board Member'){
      return ['Secretary', 'Joint Secretary', 'Technical Lead', 'Corporate Lead']
    }
    else if(subdomain === 'All'){
      return ['Project Lead']
    }
    else{
      return ['Domain Lead', 'Associate Lead', 'Member']
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("srmmail", email);
    formData.append("github", github);
    formData.append("insta", insta);
    formData.append("linkdln", linkdln);
    formData.append("coredomain", coredomain);
    formData.append("subdomain", subdomain);
    formData.append("position", position);
    formData.append("pnumber", pnumber);

    try {
      const result = await axios.post(
        "http://localhost:3000/api/form",
        formData
      );

      console.log(result.data);
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
      setGithub("");
      setInsta("");
      setLinkdln("");
      setCoreDomain("");
      setSubDomain("");
      setPosition("");
      setPnumber("");
      setImage(null);
      setUrl("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>SQAC Member Form </h1>
      <form onSubmit={handleSubmit} className="card">
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>SRM Mail ID</label>
          <input
            type="email"
            placeholder="Enter your SRM mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Github Profile Link</label>
          <input
            type="url"
            placeholder="Enter your Github Profile Link"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
        </div>
        <div>
          <label>LinkedIn Profile Link</label>
          <input
            type="url"
            placeholder="Enter your LinkedIn Profile Link"
            value={linkdln}
            onChange={(e) => setLinkdln(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instagram Profile Link</label>
          <input
            type="url"
            placeholder="Enter your Instagram Profile Link"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={pnumber}
            onChange={(e) => setPnumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Core Domain</label>
          <select
            value={coredomain}
            onChange={(e) => {
              setCoreDomain(e.target.value);
              setSubDomain(""); // Reset subdomain when core domain changes
            }}
            required
          >
            <option value="">Select Core Domain</option>
            <option value="Technical">Technical</option>
            <option value="Corporate">Corporate</option>
            <option value="Board Member">Board Member</option>
          </select>
        </div>
        {(coredomain === 'Technical' || coredomain === 'Corporate') && (
          <div>
            <label>Sub Domain</label>
            <select
              value={subdomain}
              onChange={(e) => setSubDomain(e.target.value)}
              required
            >
              <option value="">Select Sub Domain</option>
              {getSubdomainOptions().map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
        
          <div>
            <label>Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="">Select Position</option>
              {getPositionOptions().map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        
        <div>
          <label>Your Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default App;
