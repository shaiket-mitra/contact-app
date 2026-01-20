import React, { useEffect } from "react";
import { useContacts } from "../context/useContacts";

export default function ContactDetailsModal() {
  const {
    isContactModalOpen,
    contactModalMode,
    activeContact,
    closeContactModal,
    openEditContactModal,
    deleteContact,
  } = useContacts();

  const isOpen = isContactModalOpen && contactModalMode === "show";

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen || !activeContact) return null;

  const contact = activeContact;

  const handleClose = () => {
    closeContactModal();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />

      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title">Contact Details</h5>
            </div>

            <div className="modal-body">
              {[
                ["First Name", contact.first_name],
                ["Last Name", contact.last_name],
                ["Email", contact.email],
                ["Phone", contact.phone],
                ["Address", contact.address],
              ].map(([label, value]) => (
                <div className="form-group row mb-2" key={label}>
                  <label className="col-md-3 col-form-label">{label}</label>
                  <div className="col-md-9">
                    <p className="form-control-plaintext text-muted mb-0">
                      {value || "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => openEditContactModal(contact)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={async () => {
                  if (window.confirm("Are you sure?")) {
                    await deleteContact(contact.id);
                    handleClose();
                  }
                }}
              >
                Delete
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
