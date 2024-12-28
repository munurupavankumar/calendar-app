import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  MapPin, 
  Linkedin, 
  Mail, 
  Phone,
  MessageSquare,
  Clock,
  Plus,
  X
} from 'lucide-react';

const PERIODICITY_OPTIONS = [
  { value: '1_week', label: '1 Week' },
  { value: '2_weeks', label: '2 Weeks' },
  { value: '1_month', label: '1 Month' },
  { value: '3_months', label: '3 Months' },
  { value: '6_months', label: '6 Months' },
  { value: '1_year', label: 'Yearly' },
];

const CompanyModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: [''],
    phones: [''],
    comments: '',
    periodicity: '1_month'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        emails: initialData.emails.length > 0 ? initialData.emails : [''],
        phones: initialData.phones.length > 0 ? initialData.phones : [''],
        periodicity: initialData.periodicity || '1_month'
      });
    } else {
      setFormData({
        name: '',
        location: '',
        linkedin: '',
        emails: [''],
        phones: [''],
        comments: '',
        periodicity: '1_month'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleAddField = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const handleRemoveField = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (fieldName, value, index = null) => {
    if (index !== null) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
    // Clear error when field is modified
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    // Validate emails
    formData.emails.forEach((email, index) => {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.emails = newErrors.emails || {};
        newErrors.emails[index] = 'Invalid email format';
      }
    });

    // Validate LinkedIn URL (optional)
    if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Invalid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Filter out empty emails and phones before saving
      const cleanedData = {
        ...formData,
        emails: formData.emails.filter(email => email.trim() !== ''),
        phones: formData.phones.filter(phone => phone.trim() !== '')
      };
      onSave(cleanedData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Company' : 'Add New Company'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Company Name */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Company Name *"
                value={formData.name}
                onChange={e => handleFieldChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm ml-6">{errors.name}</p>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={e => handleFieldChange('location', e.target.value)}
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="LinkedIn Profile"
                value={formData.linkedin}
                onChange={e => handleFieldChange('linkedin', e.target.value)}
                className={errors.linkedin ? 'border-red-500' : ''}
              />
            </div>
            {errors.linkedin && (
              <p className="text-red-500 text-sm ml-6">{errors.linkedin}</p>
            )}
          </div>

          {/* Emails */}
          <div className="space-y-2">
            {formData.emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Email Address"
                  value={email}
                  onChange={e => handleFieldChange('emails', e.target.value, index)}
                  className={errors.emails?.[index] ? 'border-red-500' : ''}
                />
                {index === formData.emails.length - 1 ? (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleAddField('emails')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleRemoveField('emails', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Phone Numbers */}
          <div className="space-y-2">
            {formData.phones.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => handleFieldChange('phones', e.target.value, index)}
                />
                {index === formData.phones.length - 1 ? (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleAddField('phones')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleRemoveField('phones', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Communication Periodicity */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <select
              value={formData.periodicity}
              onChange={e => handleFieldChange('periodicity', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            >
              {PERIODICITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <Textarea
              placeholder="Comments"
              value={formData.comments}
              onChange={e => handleFieldChange('comments', e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-6" onClick={handleSubmit}>
            {initialData ? 'Save Changes' : 'Add Company'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;