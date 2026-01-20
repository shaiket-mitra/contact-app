import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContacts } from "../context/useContacts";
import { validateContact } from "../utils/contactValidation";

export default function AddContact() {
  const { addContact } = useContacts();
  const nav = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContact(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await addContact(form);
    nav("/");
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Add New Contact</strong>
              </div>

              <div className="card-body">
                <form onSubmit={onSubmit} noValidate>
                  {/* First Name */}
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="first_name"
                      className="col-md-3 col-form-label"
                    >
                      First Name
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className={`form-control ${
                          errors.first_name ? "is-invalid" : ""
                        }`}
                        value={form.first_name}
                        onChange={handleChange}
                      />
                      {errors.first_name && (
                        <div className="invalid-feedback">
                          {errors.first_name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="form-group row mb-2">
                    <label
                      htmlFor="last_name"
                      className="col-md-3 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className={`form-control ${
                          errors.last_name ? "is-invalid" : ""
                        }`}
                        value={form.last_name}
                        onChange={handleChange}
                      />
                      {errors.last_name && (
                        <div className="invalid-feedback">
                          {errors.last_name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group row mb-2">
                    <label htmlFor="email" className="col-md-3 col-form-label">
                      Email
                    </label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-group row mb-2">
                    <label htmlFor="phone" className="col-md-3 col-form-label">
                      Phone
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="address"
                      className="col-md-3 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-md-9">
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        className="form-control"
                        value={form.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <hr />

                  <div className="form-group row mb-0">
                    <div className="col-md-9 offset-md-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-space"
                      >
                        Save
                      </button>
                      <Link to="/" className="btn btn-outline-secondary ms-2">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
