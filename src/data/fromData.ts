const patientLoginConfig = [
  {
    id: "aadhar_card",
    name: "Aadhar No.",
    type: "number",
    required: true,
    placeholder: "Enter your Aadhar card number",
  },
  {
    id: "password",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
  },
];

const employeeLoginConfig = [
  {
    id: "hospital_id",
    name: "Hospital ID",
    type: "text",
    required: true,
    placeholder: "Enter your hospital ID",
  },
  {
    id: "employee_id",
    name: "Employee ID",
    type: "text",
    required: true,
    placeholder: "Enter your employee ID",
  },
  {
    id: "password",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
  },
];

const adminLoginConfig = [
  {
    id: "admin_username",
    name: "Username",
    type: "text",
    required: true,
    placeholder: "Enter your username",
  },
  {
    id: "admin_password",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
  },
  {
    id: "admin_security_key",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your Security key",
  },
];

const registerFieldConfigs = [
  {
    name: "username",
    label: "Username",
    placeholder: "e.g. john_doe",
    type: "text",
  },

  {
    name: "organisation_email",
    label: "Organisation Email",
    placeholder: "e.g. org@example.com",
    type: "text",
  },
  {
    name: "contact",
    label: "Contact Number",
    placeholder: "e.g. +1 234 567 890",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
  },

  {
    name: "organisation_name",
    label: "Organisation Name",
    placeholder: "e.g. My Organisation",
    type: "text",
  },

  {
    name: "registration_no",
    label: "Registration Number",
    placeholder: "e.g. 123456789",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "e.g. 123 Main St",
    type: "text",
  },
  { name: "city", label: "City", placeholder: "e.g. New York", type: "text" },
  { name: "state", label: "State", placeholder: "e.g. NY", type: "text" },
  {
    name: "pin_code",
    label: "Pin Code",
    placeholder: "e.g. 10001",
    type: "text",
  },
  {
    name: "plan",
    label: "Plan",
    placeholder: "e.g. Basic, Premium",
    type: "text",
  },
];

export {
  patientLoginConfig,
  employeeLoginConfig,
  registerFieldConfigs as fieldConfigs,
  adminLoginConfig,
};
