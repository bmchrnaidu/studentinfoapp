import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Search } from 'lucide-react';
import LoadingSkeleton from './LoadingSkeleton';

const StudentTable = ({
  students,
  loading,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 w-full rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : students.length === 0 ? (
        <div className="text-center text-white/80 py-10">
          No students found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Age</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {students.map(student => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-2">{student.name}</td>
                    <td className="py-2">{student.email}</td>
                    <td className="py-2">{student.age}</td>
                    <td className="py-2 space-x-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="p-1 rounded bg-white/20 hover:bg-white/30"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(student)}
                        className="p-1 rounded bg-red-500/20 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
