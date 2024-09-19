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


// exports

export type {
    PatientFormFields,
    EmployeeFormFields
}