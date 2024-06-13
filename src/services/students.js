import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const studentsQuery = StudentsCollection.find();
  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    studentsQuery.where('avgMark').gte(filter.minAvgMark);
  }
  /* const students = await StudentsCollection.find(); */
  const studentsCountPromise = StudentsCollection.find()
    .merge(studentsQuery)
    .countDocuments();
  const studentsPromise = studentsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const [studentsCount, students] = await Promise.all([
    studentsCountPromise,
    studentsPromise,
  ]);
  const paginationData = calculatePaginationData(studentsCount, page, perPage);
  console.log(paginationData);
  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);

  return student;
};

export const createStudent = async (newStudent) => {
  const student = await StudentsCollection.create(newStudent);
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rowResult = await StudentsCollection.findByIdAndUpdate(
    {
      _id: studentId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rowResult || !rowResult.value) {
    return null;
  }
  return {
    student: rowResult.value,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};
