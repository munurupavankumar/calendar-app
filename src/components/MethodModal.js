import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MethodModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: 1,
    mandatory: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        sequence: initialData.sequence,
        mandatory: initialData.mandatory
      });
    } else {
      setFormData({
        name: '',
        description: '',
        sequence: 1,
        mandatory: false
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.sequence || formData.sequence < 1) {
      newErrors.sequence = 'Sequence must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Communication Method' : 'Add Communication Method'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name *
            </Label>
            <Input
              id="name"
              placeholder="Method Name"
              value={formData.name}
              onChange={e => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Method Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="min-h-20"
            />
          </div>

          {/* Sequence Field */}
          <div className="space-y-2">
            <Label htmlFor="sequence" className="text-sm font-medium">
              Sequence *
            </Label>
            <Input
              id="sequence"
              type="number"
              min="1"
              value={formData.sequence}
              onChange={e => {
                setFormData({ ...formData, sequence: parseInt(e.target.value) || '' });
                if (errors.sequence) setErrors({ ...errors, sequence: '' });
              }}
              className={errors.sequence ? 'border-red-500' : ''}
            />
            {errors.sequence && (
              <p className="text-red-500 text-sm">{errors.sequence}</p>
            )}
          </div>

          {/* Mandatory Flag */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mandatory"
              checked={formData.mandatory}
              onCheckedChange={checked => setFormData({ ...formData, mandatory: checked })}
            />
            <Label 
              htmlFor="mandatory"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Mandatory
            </Label>
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-6" onClick={handleSubmit}>
            {initialData ? 'Save Changes' : 'Add Method'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MethodModal;