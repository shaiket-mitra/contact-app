export const validateContact = (form) => {
  const errors = {};

  if (!form.first_name?.trim()) {
    errors.first_name = "First name is required";
  }

  if (!form.last_name?.trim()) {
    errors.last_name = "Last name is required";
  }

  if (!form.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email address";
  }

  if (!form.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};
