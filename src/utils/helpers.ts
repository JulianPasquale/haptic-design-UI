import { BASE_URL } from '.'

export const patternURLBuilder = (id: string): string => (
  `${BASE_URL}/vibrations/${id}/pattern`
);