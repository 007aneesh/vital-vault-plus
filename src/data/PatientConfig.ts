const add_patient = [
  {
    id: 'aadharNumber',
    name: 'aadharNumber',
    required: true,
    placeholder: 'Aadhar Number',
    type: 'text',
    priority: 2,
  },
  {
    id: 'email',
    name: 'email',
    required: true,
    placeholder: 'Email Address',
    type: 'text',
    priority: 3,
  },
  {
    id: 'name',
    name: 'name',
    required: true,
    placeholder: 'Full Name',
    type: 'text',
    priority: 1,
  },
  {
    id: 'gender',
    name: 'gender',
    required: true,
    placeholder: 'Gender',
    type: 'text',
    priority: 4,
  },
  {
    id: 'guardianName',
    name: 'guardianName',
    required: true,
    placeholder: 'Guardian Name',
    type: 'text',
    priority: 5,
  },
  {
    id: 'contact',
    name: 'contact',
    required: true,
    placeholder: 'Contact Number',
    type: 'text',
    priority: 6,
  },
  {
    id: 'address',
    name: 'address',
    required: true,
    placeholder: 'Address',
    type: 'text',
    priority: 7,
  },
  {
    id: 'emergencyContact',
    name: 'emergencyContact',
    required: false,
    placeholder: 'Emergency contact',
    type: 'text',
    priority: 8,
  },
  {
    id: 'image',
    name: 'image',
    required: false,
    placeholder: 'Patient Image',
    type: 'file',
    priority: 9, 
  },
]

export { add_patient }