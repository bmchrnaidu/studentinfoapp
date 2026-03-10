import React, { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import EditModal from './components/EditModal';
import ConfirmDialog from './components/ConfirmDialog';
import ExportButtons from './components/ExportButtons';
import initialData from './data/students.json';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    // simulate loading delay
    setTimeout(() => {
      setStudents(initialData);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredStudents = students.filter(s => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term)
    );
  });

  const handleAdd = data => {
    const newStudent = {
      ...data,
      id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
    };
    setStudents([newStudent, ...students]);
  };

  const handleUpdate = updated => {
    setStudents(students.map(s => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  const handleDelete = id => {
    setStudents(students.filter(s => s.id !== id));
    setShowConfirm(false);
    setStudentToDelete(null);
  };

  const requestDelete = student => {
    setStudentToDelete(student);
    setShowConfirm(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background gradient and blobs */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-white/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-white/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Students Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-6">
            <StudentForm onSubmit={handleAdd} />
          </div>
          <div>
            <ExportButtons
              allStudents={students}
              filteredStudents={filteredStudents}
            />
          </div>
        </div>

        <div className="mt-8">
          <StudentTable
            students={filteredStudents}
            loading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEdit={setEditingStudent}
            onDelete={requestDelete}
          />
        </div>
      </div>

      <EditModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleUpdate}
      />

      <ConfirmDialog
        open={showConfirm}
        message={`Are you sure you want to delete ${
          studentToDelete?.name || ''
        }?`}
        onConfirm={() => studentToDelete && handleDelete(studentToDelete.id)}
        onCancel={() => {
          setShowConfirm(false);
          setStudentToDelete(null);
        }}
      />
    </div>
  );
}

export default App;
