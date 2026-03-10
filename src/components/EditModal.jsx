import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentForm from './StudentForm';

const EditModal = ({ student, onClose, onSave }) => {
  return (
    <AnimatePresence>
      {student && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass p-6 rounded-2xl w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Edit Student
            </h2>
            <StudentForm
              initialValues={student}
              onSubmit={data => onSave({ ...data, id: student.id })}
            />
            <button
              className="mt-4 text-sm text-white underline"
              onClick={onClose}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
