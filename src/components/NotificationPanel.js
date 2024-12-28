import React from 'react';
import { useSelector } from 'react-redux';
import { selectOverdueCommunications, selectTodaysCommunications } from '../redux/companySlice';
import { AlertCircle, CheckCircle } from 'lucide-react';

const NotificationPanel = () => {
  const overdue = useSelector(selectOverdueCommunications);
  const todays = useSelector(selectTodaysCommunications);

  return (
    <div className="p-6 space-y-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold">Notifications</h2>

      {/* Overdue Communications */}
      <div>
        <h3 className="text-xl font-semibold text-red-600">Overdue Communications</h3>
        {overdue.length > 0 ? (
          <ul className="space-y-2">
            {overdue.map((comm) => (
              <li key={comm.id} className="flex items-center space-x-2">
                <AlertCircle className="text-red-600" />
                <span>{comm.details} (Company: {comm.companyName})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No overdue communications.</p>
        )}
      </div>

      {/* Today's Communications */}
      <div>
        <h3 className="text-xl font-semibold text-green-600">Today's Communications</h3>
        {todays.length > 0 ? (
          <ul className="space-y-2">
            {todays.map((comm) => (
              <li key={comm.id} className="flex items-center space-x-2">
                <CheckCircle className="text-green-600" />
                <span>{comm.details} (Company: {comm.companyName})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No communications scheduled for today.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
