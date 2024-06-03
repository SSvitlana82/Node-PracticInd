import { getAllStudents, getStudentById } from '../services/students';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  try {
    const allStudents = await getAllStudents();
    res.json({ allStudents, message: 'All GOOD' });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
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
