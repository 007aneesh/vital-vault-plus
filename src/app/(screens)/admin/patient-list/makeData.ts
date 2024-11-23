import { Person } from '@/@types/tableData'
import { faker } from '@faker-js/faker'

const range = (len: number) => {
  return Array.from({ length: len }, (_, i) => i)
}

const newPerson = (): Person => {
  return {
    id: faker.number.int({ min: 1000000000000, max: 9999999999999 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    aadhar: faker.number.int({ min: 1000000000000, max: 9999999999999 }),
    age: faker.number.int({ min: 18, max: 100 }),
    contact: faker.number.int({ min: 1000000000, max: 9999999999 }),
    address: faker.location.streetAddress(),
    gender: faker.person.sexType(),
    lastVisit: faker.date.past().toLocaleDateString(),
    status: faker.helpers.arrayElement(['Active', 'Discharged', 'Deceased']),
  }
}

export function makeData(len: number): Person[] {
  return range(len).map(() => newPerson())
}
