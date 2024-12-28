import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CompanyModal from './CompanyModal';
import { useSelector, useDispatch } from 'react-redux';
import { addCompany, editCompany, deleteCompany } from '../redux/companySlice';
import CommunicationLog from './CommunicationLog';

const CompanyManagement = () => {
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddClick = () => {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = (id) => {
    dispatch(deleteCompany(id));
  };

  const handleSaveCompany = (companyData) => {
    if (editingCompany) {
      // Update existing company
      dispatch(editCompany({ ...companyData, id: editingCompany.id }));
    } else {
      // Add new company
      dispatch(addCompany({ ...companyData, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  // Function to get readable periodicity label
  const getPeriodicityLabel = (value) => {
    const options = {
      '1_week': '1 Week',
      '2_weeks': '2 Weeks',
      '1_month': '1 Month',
      '3_months': '3 Months',
      '6_months': '6 Months',
      '1_year': 'Yearly'
    };
    return options[value] || value;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Company Management</h1>
        <Button className="flex items-center gap-2" onClick={handleAddClick}>
          <Plus size={16} />
          Add Company
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LinkedIn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emails</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Numbers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodicity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={company.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {company.linkedin}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <ul className="list-none">
                    {company.emails.map((email, i) => (
                      <li key={i}>
                        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  <ul className="list-none">
                    {company.phones.map((phone, i) => (
                      <li key={i}>
                        <a href={`tel:${phone}`} className="hover:underline">
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPeriodicityLabel(company.periodicity)}
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{company.comments}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditClick(company)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteCompany(company.id)}
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

      {companies.map((company) => (
        <CommunicationLog key={company.id} companyId={company.id} />
      ))}

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCompany}
        initialData={editingCompany}
      />
    </div>
  );
};

export default CompanyManagement;
