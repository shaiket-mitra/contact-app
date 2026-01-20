import { confirmDelete } from "./ConfirmDelete";
import NoContacts from "./NoContacts";
import { useContacts } from "../context/useContacts";

export default function ContactTable() {
  const { visibleContacts, deleteContact, openShowContactModal, openEditContactModal } = useContacts();

  if (!visibleContacts.length) return <NoContacts />;

  return (
    <div className="table-responsive">
    <table className="table table-striped table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        {visibleContacts.map((c, idx) => (
          <tr key={c.id}>
            <td>{idx + 1}</td>
            <td>{c.first_name}</td>
            <td>{c.last_name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>

            <td width="150" className="text-nowrap">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-circle btn-outline-info"
                  title="Show"
                  onClick={() => openShowContactModal(c)}
                >
                  <i className="fa fa-eye"></i>
                </button>

                <button
                  className="btn btn-sm btn-circle btn-outline-secondary"
                  title="Edit"
                  onClick={() => openEditContactModal(c)}
                >
                  <i className="fa fa-edit"></i>
                </button>

                <button
                  className="btn btn-sm btn-circle btn-outline-danger"
                  title="Delete"
                  onClick={async () => {
                    if (confirmDelete()) {
                      await deleteContact(c.id);
                    }
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
