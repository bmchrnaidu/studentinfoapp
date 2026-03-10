import React from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

function exportData(data, filename) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}

const ExportButtons = ({ allStudents, filteredStudents }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => exportData(allStudents, 'all-students.xlsx')}
        className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
      >
        <Download className="w-4 h-4 mr-2" />
        Download All
      </button>
      <button
        onClick={() => exportData(filteredStudents, 'filtered-students.xlsx')}
        className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Filtered
      </button>
    </div>
  );
};

export default ExportButtons;
