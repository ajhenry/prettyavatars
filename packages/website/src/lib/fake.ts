import { faker } from '@faker-js/faker'

export const generateName = () => {
  return faker.name.firstName()
}
