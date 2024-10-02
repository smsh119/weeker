export function validateRegistration(formData) {
  const fullname = formData.get("fullname").trim();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  if (!fullname) {
    return {
      error: "Full Name required!",
    };
  } else if (!email) {
    return {
      error: "Email required!",
    };
  } else if (!password) {
    return {
      error: "Please provide valid password.",
    };
  } else {
    return {
      message: "Registration successful",
    };
  }
}

export function validateLogin(formData) {
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  if (!email) {
    return {
      error: "Email required!",
    };
  } else if (!password) {
    return {
      error: "Please provide valid password.",
    };
  } else {
    return {
      message: "Login successful",
    };
  }
}
