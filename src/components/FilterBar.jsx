import { useContacts } from "../context/useContacts";

export default function FilterBar() {
  const { sortMode, setSortMode } = useContacts();

  return (
    <div className="d-flex align-items-center justify-content-between p-3">
      <div className="fs-2">
        <i className="fa fa-filter text-success"></i> Filter
      </div>
      <select
        className="form-select filter-select"
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="first_name">First Name (A → Z)</option>
        <option value="last_name">Last Name (A → Z)</option>
        <option value="oldest">Oldest To First</option>
      </select>
    </div>
  );
}
