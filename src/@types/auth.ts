// login form types
type PatientFormFields = {
  aadhar_card: number;
  password: string;
};

type EmployeeFormFields = {
  username: string;
  password: string;
};

// register form types

type FormFieldNames =
  | "userName"
  | "email"
  | "contactNo"
  | "password"
  | "confirm_password"
  | "orgName"
  | "address"
  | "city"
  | "state"
  | "pinCode"
  | "planSelected";


// exports

export type { PatientFormFields, EmployeeFormFields, FormFieldNames };