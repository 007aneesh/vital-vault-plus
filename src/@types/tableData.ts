type PatientList = {
    userId: number,
    id: number,
    title: string,
    body: string
}

type Person = {
  id: number
  firstName: string
  lastName: string
  aadhar: number
  age: number
  contact: number
  address: string
  gender: string
  lastVisit: string
  status: 'Active' | 'Discharged' | 'Deceased'
}

export type { PatientList, Person }