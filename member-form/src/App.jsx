import { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const wakeUp = () => {
      axios.get("https://sqac-member-form-1.onrender.com/health").catch(() => {});
    };

    wakeUp(); // wake on load

    const interval = setInterval(wakeUp, 10 * 60 * 1000); // every 10 min

    return () => clearInterval(interval);
  }, []);

  const getSubdomainOptions = () => {
    if (coredomain === "Technical") {
      return ["All", "Web Dev", "AI/ML", "App Dev"];
    } else if (coredomain === "Corporate") {
      return ["All", "Events", "Media", "Sponsorship"];
    }
    return [];
  };

  const getPositionOptions = () => {
    if (coredomain === "Board Member") {
      return [
        "Secretary",
        "Joint Secretary",
        "Technical Lead",
        "Corporate Lead",
        "Project lead",
        "Co-Corporate Lead"
      ];
    } else if (subdomain === "All") {
      return ["Project Lead", "Media Lead"];
    } else {
      return ["Domain Lead", "Joint Associate" ,"Associate Lead", "Member"];
    }
  };

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
        "https://sqac-member-form-1.onrender.com/api/form",
        formData,
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
    <>
      <header className="w-full flex justify-center md:justify-end px-4 md:px-8 pt-6 absolute top-0 left-0 ">
        <img
          src="/SQAC_logo_extracted.png"
          alt="SQAC Logo"
          className="w-30 h-30 md:w-32 lg:w-48 h-auto"
        />
      </header>
      <section className="min-h-screen flex flex-col items-center justify-center bg-[url('/bg-image1.png')] bg-cover bg-center font-sora px-4 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          SQAC Member Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-6xl bg-white rounded-2xl shadow-xl p-5 sm:p-8 flex flex-col md:grid grid-cols-2 xl:grid grid-cols-3 gap-5 text-base ">
          <div className="flex flex-col ">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label>Instagram Profile Link</label>
            <input
              type="url"
              placeholder="Enter your Instagram Profile Link"
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Core Domain</option>
              <option value="Technical">Technical</option>
              <option value="Corporate">Corporate</option>
              <option value="Board Member">Board Member</option>
            </select>
          </div>
          {(coredomain === "Technical" || coredomain === "Corporate") && (
            <div>
              <label>Sub Domain</label>
              <select
                value={subdomain}
                onChange={(e) => setSubDomain(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sub Domain</option>
                {getSubdomainOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Position</option>
              {getPositionOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="col-span-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </>
  );
};

export default App;
