import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import MethodModal from './MethodModal';
import { useSelector, useDispatch } from 'react-redux';
import { addMethod, editMethod, deleteMethod, updateMethodOrder } from '../redux/communicationSlice';

const CommunicationMethods = () => {
  const methods = useSelector((state) => state.communication.methods);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedMethods = [...methods].sort((a, b) => {
      if (newDirection === 'asc') {
        return a.sequence - b.sequence;
      } else {
        return b.sequence - a.sequence;
      }
    });

    // Update Redux store with sorted methods
    dispatch(updateMethodOrder(sortedMethods));
  };

  const handleAddClick = () => {
    setEditingMethod(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (method) => {
    setEditingMethod(method);
    setIsModalOpen(true);
  };

  const handleDeleteMethod = (id) => {
    dispatch(deleteMethod(id));
  };

  const handleSaveMethod = (formData) => {
    if (editingMethod) {
      // Update existing method
      dispatch(editMethod({ ...formData, id: editingMethod.id }));
    } else {
      // Add new method
      dispatch(addMethod({ ...formData, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Communication Methods</h1>
        <Button onClick={handleAddClick} className="flex items-center gap-2">
          <Plus size={16} />
          Add Method
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={handleSort}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Sequence
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mandatory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {methods.map((method) => (
              <tr key={method.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{method.name}</td>
                <td className="px-6 py-4">{method.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{method.sequence}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox checked={method.mandatory} disabled />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditClick(method)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMethod}
        initialData={editingMethod}
      />
    </div>
  );
};

export default CommunicationMethods;
