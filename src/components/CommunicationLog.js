import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCommunication, deleteCommunication } from '../redux/companySlice';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';

const CommunicationLog = ({ companyId }) => {
  const company = useSelector((state) => state.company.companies.find((c) => c.id === companyId));
  const dispatch = useDispatch();

  const [newCommunication, setNewCommunication] = useState({
    methodId: '',
    timestamp: '',
    details: '',
  });

  const handleAddCommunication = () => {
    dispatch(
      addCommunication({
        companyId,
        communication: {
          ...newCommunication,
          timestamp: new Date().toISOString(),
        },
      })
    );
    setNewCommunication({ methodId: '', timestamp: '', details: '' });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Communications for {company?.name}</h2>
      <ul className="space-y-2">
        {company?.communications.map((comm) => (
          <li key={comm.id} className="border rounded-lg p-4">
            <p><strong>Details:</strong> {comm.details}</p>
            <p><strong>Timestamp:</strong> {new Date(comm.timestamp).toLocaleString()}</p>
            <Button variant="outline" size="sm" onClick={() => dispatch(deleteCommunication({ companyId, communicationId: comm.id }))}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <Textarea
          placeholder="Communication Details"
          value={newCommunication.details}
          onChange={(e) => setNewCommunication({ ...newCommunication, details: e.target.value })}
        />
        <Button onClick={handleAddCommunication}>Add Communication</Button>
      </div>
    </div>
  );
};

export default CommunicationLog;
