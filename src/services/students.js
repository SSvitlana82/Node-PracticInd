import { StudentsCollection } from '../db/models/student.js';
export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const creatStudent = async (newStudent) => {
  const student = await StudentsCollection.create(newStudent);
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudents = async (studentId, payload, options = {}) => {
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
