import React, { useState, useEffect } from 'react';
import { Check } from "lucide-react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  Download,
  Printer,
  Search,
  UserPlus,
  Copy,
  Settings,
  X,
  PlusCircle,
  FileText,
  CreditCard,
  Building
} from 'lucide-react';

const CreateProformaInvoice = ({ setActiveTab }) => {
  const [invoice, setInvoice] = useState(() => ({
    company: '',
    contactPerson: '',
    salesCredit: 'None',
    address: '',
    shippingAddress: '',
    isSameAsBilling: true,
    piNo: '1',
    reference: '',
    piDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    items: [{ no: 1, description: '', quantity: 0, unit: 'Nos', rate: 0, discount: 0, taxable: 0, amount: 0, leadTime: '' }],
    terms: [],
    notes: '',
    bankDetails: '',
    nextActions: {
      saveAsTemplate: false,
      shareByEmail: false,
      shareByWhatsapp: false,
      printAfterSaving: false,
      alertOnOpening: false
    }
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync shipping address if "same as billing" is checked
  useEffect(() => {
    if (invoice.isSameAsBilling) {
      setInvoice(prev => ({ ...prev, shippingAddress: prev.address }));
    }
  }, [invoice.address, invoice.isSameAsBilling]);

  const handleAddItem = () => {
    const nextNo = invoice.items.length + 1;
    setInvoice({
      ...invoice,
      items: [...invoice.items, { no: nextNo, description: '', quantity: 0, unit: 'Nos', rate: 0, discount: 0, taxable: 0, amount: 0, leadTime: '' }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = invoice.items
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, no: i + 1 }));
    setInvoice({ ...invoice, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;

    if (['quantity', 'rate', 'discount'].includes(field)) {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      const disc = parseFloat(newItems[index].discount) || 0;

      const taxable = (qty * rate) - disc;
      newItems[index].taxable = taxable > 0 ? taxable : 0;
      newItems[index].amount = newItems[index].taxable; // Assuming 0 tax for now
    }

    setInvoice({ ...invoice, items: newItems });
  };

  const calculateTotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSave = (stayOnPage = false) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      if (!stayOnPage) {
        setTimeout(() => setActiveTab('Proforma Invoices'), 800);
      } else {
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 800);
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen -m-8 p-8 font-sans">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#f0f2f5] z-10 py-2">
        <h1 className="text-[22px] font-semibold text-[#e8f0fe]">Create Proforma Invoice</h1>
        <div className="flex items-center gap-2">
          <button className="bg-[#0a1628] border border-[#d1d5db] text-[#4b5563] px-3 py-1.5 rounded text-[13px] font-medium flex items-center gap-2 hover:bg-gray-50 transition">
            <Printer size={16} /> Print Settings
          </button>
          <button
            onClick={() => setActiveTab('Proforma Invoices')}
            className="bg-[#1e293b] text-[#e8f0fe] px-4 py-1.5 rounded text-[13px] font-medium flex items-center gap-2 hover:bg-slate-700 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="bg-[#166534] text-[#e8f0fe] px-4 py-1.5 rounded text-[13px] font-medium flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Save size={16} /> {isSaved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Basic Information Section */}
        <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
          <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
            <h2 className="text-[14px] font-bold text-[#334155]">Basic Information</h2>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2">
                <label className="text-[13px] font-medium text-[#64748b] w-24">Company :</label>
                <div className="flex-1 flex gap-1">
                  <input
                    type="text"
                    value={invoice.company}
                    onChange={(e) => setInvoice({ ...invoice, company: e.target.value })}
                    className="flex-1 border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="p-2 border border-[#d1d5db] rounded hover:bg-gray-50"><Search size={14} /></button>
                  <button className="p-2 border border-[#d1d5db] rounded hover:bg-gray-50 text-green-600"><Plus size={14} /></button>
                  <button className="p-2 border border-[#d1d5db] rounded hover:bg-gray-50"><Copy size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Party and Document Details */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Party Details */}
          <div className="lg:col-span-3 bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
            <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
              <h2 className="text-[14px] font-bold text-[#334155]">Party Details</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] font-medium text-[#64748b] w-32">Contact Person:</label>
                  <input
                    type="text"
                    value={invoice.contactPerson}
                    onChange={(e) => setInvoice({ ...invoice, contactPerson: e.target.value })}
                    className="flex-1 border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <label className="text-[13px] font-medium text-[#64748b] w-32 mt-1">Address:</label>
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea
                      value={invoice.address}
                      onChange={(e) => setInvoice({ ...invoice, address: e.target.value })}
                      className="w-full border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none h-16 resize-none"
                    ></textarea>
                    <button className="text-[12px] text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded w-fit flex items-center gap-1">
                      <Plus size={12} /> Click here to add an address
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] font-medium text-[#64748b] w-32">Sales Credit :</label>
                  <select
                    value={invoice.salesCredit}
                    onChange={(e) => setInvoice({ ...invoice, salesCredit: e.target.value })}
                    className="flex-1 border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none bg-[#0a1628]"
                  >
                    <option>None</option>
                    <option>Credit 30 Days</option>
                  </select>
                </div>
                <div className="flex items-start gap-2">
                  <label className="text-[13px] font-medium text-[#64748b] w-32 mt-1">Shipping Address :</label>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="sameAsBilling"
                        checked={invoice.isSameAsBilling}
                        onChange={(e) => setInvoice({ ...invoice, isSameAsBilling: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <label htmlFor="sameAsBilling" className="text-[13px] font-medium text-[#334155]">Same as Billing address</label>
                    </div>
                    {!invoice.isSameAsBilling && (
                      <textarea
                        value={invoice.shippingAddress}
                        onChange={(e) => setInvoice({ ...invoice, shippingAddress: e.target.value })}
                        className="w-full border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none h-16 resize-none"
                      ></textarea>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
            <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
              <h2 className="text-[14px] font-bold text-[#334155]">Document Details</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-medium text-[#64748b] w-24">PI No. :</label>
                <input
                  type="text"
                  value={invoice.piNo}
                  onChange={(e) => setInvoice({ ...invoice, piNo: e.target.value })}
                  className="flex-1 border border-[#d1d5db] rounded px-2 py-1 text-[13px] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-medium text-[#64748b] w-24">Reference :</label>
                <input
                  type="text"
                  value={invoice.reference}
                  onChange={(e) => setInvoice({ ...invoice, reference: e.target.value })}
                  className="flex-1 border border-[#d1d5db] rounded px-2 py-1 text-[13px] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-medium text-[#64748b] w-24">PI Date :</label>
                <input
                  type="date"
                  value={invoice.piDate}
                  onChange={(e) => setInvoice({ ...invoice, piDate: e.target.value })}
                  className="flex-1 border border-[#d1d5db] rounded px-2 py-1 text-[13px] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-medium text-[#64748b] w-24">Due Date :</label>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                  className="flex-1 border border-[#d1d5db] rounded px-2 py-1 text-[13px] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Item List Section */}
        <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
          <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
            <h2 className="text-[14px] font-bold text-[#334155]">Item List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1628] border-b border-[#e5e7eb]">
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-left w-12 border-r border-[#e5e7eb]">No.</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-left min-w-[250px] border-r border-[#e5e7eb]">Item & Description</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-20 border-r border-[#e5e7eb]">Qty</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-24 border-r border-[#e5e7eb]">Unit</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-32 border-r border-[#e5e7eb]">Rate (₹)</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-32 border-r border-[#e5e7eb]">Discount (₹)</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-32 border-r border-[#e5e7eb]">Taxable (₹)</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-32 border-r border-[#e5e7eb]">Amt (₹)</th>
                  <th className="px-3 py-2 text-[12px] font-bold text-[#64748b] text-center w-32">Lead Time</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b border-[#e5e7eb] hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-1.5 text-[13px] border-r border-[#e5e7eb]">{item.no}</td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb]">
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Type item name or description..."
                        className="w-full bg-transparent border-none focus:outline-none text-[13px] resize-none py-1 h-8"
                      ></textarea>
                    </td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb]">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-[13px]"
                      />
                    </td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb]">
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-[13px]"
                      >
                        <option>Nos</option>
                        <option>Pcs</option>
                        <option>Mtrs</option>
                      </select>
                    </td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb]">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-[13px]"
                      />
                    </td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb]">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-[13px]"
                      />
                    </td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb] text-center text-[13px] font-medium">{item.taxable.toLocaleString()}</td>
                    <td className="px-3 py-1.5 border-r border-[#e5e7eb] text-center text-[13px] font-medium">{item.amount.toLocaleString()}</td>
                    <td className="px-3 py-1.5">
                      <input
                        type="text"
                        value={item.leadTime}
                        onChange={(e) => handleItemChange(index, 'leadTime', e.target.value)}
                        className="w-full text-center bg-transparent border-none focus:outline-none text-[13px]"
                        placeholder="e.g. 1 week"
                      />
                    </td>
                    <td className="px-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        disabled={invoice.items.length === 1}
                      >
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-[#e5e7eb]">
            <button
              onClick={handleAddItem}
              className="flex items-center gap-1.5 text-[12px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded hover:bg-green-100 transition shadow-sm"
            >
              <PlusCircle size={14} /> Add Item
            </button>
          </div>
        </div>

        {/* Footer Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <div className="lg:col-span-3 space-y-4">
            {/* Terms and Conditions */}
            <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
              <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
                <h2 className="text-[14px] font-bold text-[#334155]">Terms & Conditions</h2>
              </div>
              <div className="p-4">
                <button className="flex items-center gap-1.5 text-[12px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded hover:bg-green-100 transition shadow-sm mb-4">
                  <PlusCircle size={14} /> Add Term / Condition
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Notes */}
              <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
                <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
                  <h2 className="text-[14px] font-bold text-[#334155]">Notes</h2>
                </div>
                <div className="p-4">
                  <textarea
                    value={invoice.notes}
                    onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                    className="w-full border border-[#d1d5db] rounded px-3 py-1.5 text-[14px] focus:outline-none h-24 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
                <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
                  <h2 className="text-[14px] font-bold text-[#334155]">Bank Details</h2>
                </div>
                <div className="p-4 flex flex-col items-center justify-center min-h-[120px] bg-[#05080f]/50">
                  <button className="flex items-center gap-2 text-[13px] font-medium text-[#64748b] bg-[#0a1628] border border-[#d1d5db] px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition">
                    <Settings size={14} /> Click here to add a bank.
                  </button>
                </div>
              </div>
            </div>

            {/* Upload File */}
            <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden max-w-sm">
              <div className="p-4 flex items-center gap-4">
                <label className="text-[13px] font-medium text-[#64748b]">Upload File :</label>
                <button className="bg-orange-500 text-[#e8f0fe] px-4 py-1.5 rounded text-[13px] font-medium flex items-center gap-2 hover:bg-orange-600 transition shadow-sm">
                  <FileText size={16} /> Upload File
                </button>
              </div>
            </div>

            {/* Next Actions */}
            <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
              <div className="bg-[#05080f] px-4 py-2 border-b border-[#e5e7eb]">
                <h2 className="text-[14px] font-bold text-[#334155]">Next Actions</h2>
              </div>
              <div className="p-4 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { label: 'Save as Template', key: 'saveAsTemplate' },
                  { label: 'Share by Email', key: 'shareByEmail' },
                  { label: 'Share by Whatsapp', key: 'shareByWhatsapp' },
                  { label: 'Print Document after Saving', key: 'printAfterSaving' },
                  { label: 'Alert me on Opening', key: 'alertOnOpening' },
                ].map((action) => (
                  <div key={action.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={action.key}
                      checked={invoice.nextActions[action.key]}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        nextActions: { ...invoice.nextActions, [action.key]: e.target.checked }
                      })}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <label htmlFor={action.key} className="text-[13px] font-medium text-[#334155]">{action.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="space-y-4">
            <div className="bg-[#0a1628] border border-[#e5e7eb] rounded shadow-sm overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-[13px] text-[#64748b]">
                  <span>Total :</span>
                  <span className="font-bold text-[#1e293b]">₹ {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-[15px] font-bold text-[#1e293b]">
                  <span>Grand Total :</span>
                  <span>₹ {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded hover:bg-green-100 transition shadow-sm">
                <Plus size={14} /> Add Extra Charge
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded hover:bg-green-100 transition shadow-sm">
                <Plus size={14} /> Add Discount
              </button>
            </div>
          </div>
        </div>

        {/* Final Actions Bottom */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#d1d5db]">
          <button
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="bg-[#166534] text-[#e8f0fe] px-6 py-2 rounded font-bold text-[14px] flex items-center gap-2 hover:bg-green-700 transition shadow-sm"
          >
            {isSaved ? <><Check size={16} className="inline-block" /> Saved!</> : 'Save'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="bg-[#166534] text-[#e8f0fe] px-6 py-2 rounded font-bold text-[14px] flex items-center gap-2 hover:bg-green-700 transition shadow-sm"
          >
            Save & Enter Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProformaInvoice;
