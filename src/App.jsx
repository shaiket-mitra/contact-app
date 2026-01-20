import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import ContactDetailsModal from "./components/ContactDetailsModal";
import ContactEditModal from "./components/ContactEditModal";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>

      <ContactDetailsModal />
      <ContactEditModal />
    </>
  );
}
