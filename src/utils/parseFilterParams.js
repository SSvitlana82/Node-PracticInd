import { query } from 'express';

const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  if (!isString) {
    return;
  }
  const isGender = (gender) => ['male', 'female', 'other'].includes(gender);
  if (isGender(gender)) return gender;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) {
    return;
  }
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }
  return parsedNumber;
};

export const parseFilterParams = (query) => {
  const parsedGender = parseGender(query.gender);
  const parsedMaxAge = parseNumber(query.maxAge);
  const parsedMinAge = parseNumber(query.minAge);
  const parsedMaxAvgMark = parseNumber(query.maxAvgMark);
  const parsedMinAvgMark = parseNumber(query.minAvgMark);

  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};
