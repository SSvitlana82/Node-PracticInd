import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const allStudents = await getAllStudents({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  res.json({
    status: 200,
    message: 'All GOOD',
    data: allStudents,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const studentId = req.params.studentId;
  const student = await getStudentById(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
  }
  res.json({
    data: student,
    message: 'dont worry be happy',
  });
};
export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const studentId = req.params.studentId;
  const student = await deleteStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await updateStudent(studentId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    message: `Successfully upserted a student!`,
    status,
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await updateStudent(studentId, req.body);
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    data: result.student,
    message: `Successfully patched a student!`,
  });
};
