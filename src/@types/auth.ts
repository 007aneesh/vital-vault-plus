// login form types
type PatientFormFields = {
  aadhar_card: number;
  password: string;
};

type EmployeeFormFields = {
  hospital_id: string;
  employee_id: string;
  password: string;
};

// register for types

type FormFieldNames =
  | "username"
  | "organisation_email"
  | "contact"
  | "password"
  | "confirm_password"
  | "organisation_name"
  | "registration_no"
  | "address"
  | "city"
  | "state"
  | "pin_code"
  | "plan";


// exports

export type { PatientFormFields, EmployeeFormFields, FormFieldNames };