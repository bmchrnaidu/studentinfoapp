import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const StudentForm = ({ onSubmit, initialValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const submit = data => {
    onSubmit({ ...data, age: Number(data.age), id: initialValues.id });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-400 mt-1 text-sm">{errors.name.message}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: 'Invalid email',
            },
          })}
          className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-400 mt-1 text-sm">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <input
          type="number"
          placeholder="Age"
          {...register('age', {
            required: 'Age is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Must be a number' },
          })}
          className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none"
        />
        {errors.age && (
          <p className="text-red-400 mt-1 text-sm">{errors.age.message}</p>
        )}
      </motion.div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold mt-2"
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default StudentForm;
