import { useState } from "react";
import { useContacts } from "../context/useContacts";

export default function SearchBar() {
  const { searchText, setSearchText } = useContacts();
  const [temp, setTemp] = useState(searchText);

  const doSearch = () => setSearchText(temp);

  return (
    <div className="input-group searchbar-responsive mx-auto">
      <input
        type="text"
        className="form-control"
        placeholder="Search contact"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doSearch()}
      />
      <button
        className="btn btn-success"
        type="button"
        onClick={doSearch}
      >
        Search
      </button>
    </div>
  );
}
