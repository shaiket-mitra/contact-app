import { useEffect, useState } from "react";
import { useContacts } from "../context/useContacts";
import { validateContact } from "../utils/contactValidation";

export default function ContactEditModal() {
  const {
    isContactModalOpen,
    contactModalMode,
    activeContact,
    draft,
    setDraft,
    closeContactModal,
    submitEditContactModal,
  } = useContacts();

  const isOpen = isContactModalOpen && contactModalMode === "edit";
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleClose = () => {
    setErrors({});
    closeContactModal();
  };

  if (!isOpen || !activeContact) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((p) => ({ ...(p || {}), [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContact(draft || {});
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await submitEditContactModal();

    setErrors({});
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
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title">Edit Contact</h5>
            </div>

            <form onSubmit={onSubmit} noValidate>
              <div className="modal-body">
                {/* First Name */}
                <div className="form-group mb-2">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                    value={draft?.first_name || ""}
                    onChange={handleChange}
                  />
                  {errors.first_name && (
                    <div className="invalid-feedback">{errors.first_name}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-group mb-2">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                    value={draft?.last_name || ""}
                    onChange={handleChange}
                  />
                  {errors.last_name && (
                    <div className="invalid-feedback">{errors.last_name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={draft?.email || ""}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group mb-2">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={draft?.phone || ""}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Address */}
                <div className="form-group mb-0">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="form-control"
                    value={draft?.address || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
