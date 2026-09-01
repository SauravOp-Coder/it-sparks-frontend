export const nameRegex = /^[a-zA-Z\s]{2,50}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const mobileRegex = /^[6-9]\d{9}$/;

export const sanitizeMobileInput = (value) => value.replace(/\D/g, "").slice(0, 10);

export const sanitizeNameInput = (value) => value.replace(/[^a-zA-Z\s]/g, "");

export const validateEnquiryForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Name is required.";
  } else if (!nameRegex.test(formData.fullName.trim())) {
    errors.fullName = "Enter a valid name (letters only, 2-50 characters).";
  }

  if (!formData.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!mobileRegex.test(formData.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.interestedCourse) {
    errors.interestedCourse = "Please select a course.";
  }

  if (formData.message && formData.message.length > 500) {
    errors.message = "Message must be under 500 characters.";
  }

  return errors;
};