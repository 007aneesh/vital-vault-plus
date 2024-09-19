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

export { patientLoginConfig, employeeLoginConfig };
