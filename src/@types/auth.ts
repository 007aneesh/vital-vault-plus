// login form types
type LoginFormFields = {
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

export type { LoginFormFields, FormFieldNames };