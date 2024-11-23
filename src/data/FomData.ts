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

const adminLoginConfig = [
  {
    id: "userName",
    name: "Username",
    type: "text",
    required: true,
    placeholder: "Enter your username",
  },
  {
    id: "password",
    name: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
  },
  // {
  //   id: "admin_security_key",
  //   name: "Security Key",
  //   type: "password",
  //   required: true,
  //   placeholder: "Enter your Security key",
  // },
];

const registerFieldConfigs = [
  {
    name: "userName",
    label: "Username",
    placeholder: "e.g. john_doe",
    type: "text",
  },

  {
    name: "email",
    label: "Organisation Email",
    placeholder: "e.g. org@example.com",
    type: "text",
  },
  {
    name: "contactNo",
    label: "Contact Number",
    placeholder: "e.g. +1 234 567 890",
    type: "text",
  },
  {
    name: "orgName",
    label: "Organisation Name",
    placeholder: "e.g. My Organisation",
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
    name: "address",
    label: "Address",
    placeholder: "e.g. 123 Main St",
    type: "text",
  },
  { name: "city", label: "City", placeholder: "e.g. New York", type: "text" },
  { name: "state", label: "State", placeholder: "e.g. NY", type: "text" },
  {
    name: "pinCode",
    label: "Pin Code",
    placeholder: "e.g. 10001",
    type: "text",
  },
  {
    name: "planSelected",
    label: "Plan",
    placeholder: "e.g. Basic, Premium",
    type: "text",
  },
];

const contactConfig = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "e.g. John Doe",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "e.g. johndoe@gmail.com",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "e.g. 9999888877",
    type: "number",
  },
  {
    name: "clinicHospitalOrgName",
    label: "Clinic/ Hospital/ Org Name",
    placeholder: "e.g. Sun Pharma",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "e.g. Indore",
    type: "text",
  },
  {
    name : "countryRegion",
    label: "Country/ Region",
    placeholder: "e.g. India",
    type: "text",
  },
  {
    name: "preferredTime",
    label: "Preferred time to call Back",
    placeholder: "e.g. 11:00 AM",
    type: "datetime",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Write Something here...",
    type: "text",
  },
];

export {
  patientLoginConfig,
  registerFieldConfigs,
  adminLoginConfig,
  contactConfig
};
