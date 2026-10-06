import React, { useState } from 'react';
import { ArrowLeft, Save, Check } from 'lucide-react';

const CreateSupplierInvoice = ({ setActiveTab, previousTab = 'Purchases', editData = null, clearEdit }) => {
  const [formData, setFormData] = useState({
    supplier: editData?.supplier || '',
    contact: editData?.contact || '',
    invoiceNumber: editData?.invoiceNumber || '',
    invoiceDate: editData?.invoiceDate || '',
    dueDate: editData?.dueDate || '',
    creditMonth: editData?.creditMonth || '',
    subtotal: editData?.taxable || '',
    taxPercent: '18',
    narration: '',
  });
  const [items, setItems] = useState(
    editData?.items?.length ? editData.items : [{ description: '', qty: '', unit: 'Pcs', rate: '', amount: '' }]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'rate') {
        const qty = parseFloat(field === 'qty' ? value : updated[index].qty) || 0;
        const rate = parseFloat(field === 'rate' ? value : updated[index].rate) || 0;
        updated[index].amount = (qty * rate).toFixed(2);
      }
      return updated;
    });
  };

  const addItem = () => setItems(prev => [...prev, { description: '', qty: '', unit: 'Pcs', rate: '', amount: '' }]);
  const removeItem = (index) => setItems(prev => prev.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const tax = subtotal * (parseFloat(formData.taxPercent) || 0) / 100;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const invoiceData = {
      ...formData,
      items,
      taxable: subtotal.toFixed(2),
      amount: total.toFixed(2),
    };

    try {
      const url = editData 
        ? `${import.meta.env.VITE_API_URL}/supplier-invoices/${editData._id}` 
        : `${import.meta.env.VITE_API_URL}/supplier-invoices`;
        
      const response = await fetch(url, {
        method: editData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      });

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => {
          if (clearEdit) clearEdit();
          setActiveTab(previousTab);
        }, 1000);
      } else {
        alert('Failed to save supplier invoice');
      }
    } catch (error) {
      alert('Error saving. Is backend running?');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 bg-[#0a1628] rounded-2xl shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => { if (clearEdit) clearEdit(); setActiveTab(previousTab); }} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">{editData ? 'Edit Supplier Invoice' : 'Create Supplier Invoice'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input name="supplier" value={formData.supplier} onChange={handleInputChange} placeholder="Supplier Name" className="border p-2 rounded" required />
          <input name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact" className="border p-2 rounded" />
          <input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} placeholder="Invoice Number" className="border p-2 rounded" required />
          <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} className="border p-2 rounded" required />
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="border p-2 rounded" />
          <input name="taxPercent" type="number" value={formData.taxPercent} onChange={handleInputChange} placeholder="Tax %" className="border p-2 rounded" />
        </div>
        
        <div>
          <h3 className="font-bold mb-2">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} placeholder="Description" className="border p-2 rounded flex-1" required />
              <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', e.target.value)} placeholder="Qty" className="border p-2 rounded w-20" required />
              <input type="number" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} placeholder="Rate" className="border p-2 rounded w-24" required />
              <div className="p-2 w-24 bg-gray-50 rounded text-right">{item.amount || '0'}</div>
              <button type="button" onClick={() => removeItem(index)} className="text-red-500 p-2">X</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-blue-500 font-bold">+ Add Item</button>
        </div>

        <div className="text-right space-y-2">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax: ₹{tax.toFixed(2)}</p>
          <h3 className="text-xl font-bold">Total: ₹{total.toFixed(2)}</h3>
        </div>

        <button type="submit" disabled={isSaving || isSaved} className="w-full bg-purple-500 text-[#e8f0fe] p-3 rounded font-bold">
          {isSaved ? 'Saved!' : 'Save Invoice'}
        </button>
      </form>
    </div>
  );
};
export default CreateSupplierInvoice;
