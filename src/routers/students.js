import { Router } from 'express';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.get('/', ctrlWrapper(getStudentsController));

router.get('/:studentId', ctrlWrapper(getStudentByIdController));
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  upload.single('photo'),
  ctrlWrapper(createStudentController),
);
router.delete('/:studentId', ctrlWrapper(deleteStudentController));
router.put(
  '/:studentsId',
  checkRoles(ROLES.TEACHER),
  validateBody(updateStudentSchema),
  upload.single('photo'),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  validateBody(updateStudentSchema),
  upload.single('photo'),
  ctrlWrapper(patchStudentController),
);
export default router;
