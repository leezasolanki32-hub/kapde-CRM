import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, PlusCircle, User, MapPin, Box } from 'lucide-react';

const CreateTicket = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    ticketDate: '',
    ticketNo: '',
    dueDate: '',
    billingAddress: '',
    shippingAddress: '',
    sameAsBilling: true,
    product: '',
    quantityApplicable: false,
    rate: '',
    notes: '',
    sendAcknowledgement: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ticket saved successfully!');
    setActiveTab('Support');
  };

  const handleSaveAndAddAnother = (e) => {
    e.preventDefault();
    alert('Ticket saved! Ready for next entry.');
    // Reset form or handle next entry
    setFormData({
      customerName: '',
      ticketDate: '',
      ticketNo: '',
      dueDate: '',
      billingAddress: '',
      shippingAddress: '',
      sameAsBilling: true,
      product: '',
      quantityApplicable: false,
      rate: '',
      notes: '',
      sendAcknowledgement: false,
    });
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1000px] mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('Support')}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-[#93c5fd]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight">Create Ticket</h1>
          <p className="text-[14px] text-[#93c5fd] mt-1 font-medium">Log a new support ticket or service request</p>
        </div>
      </div>

      <div className="bg-[#0a1628] rounded-2xl border border-[#1e3a5f] shadow-sm overflow-hidden">
        <form className="p-6 md:p-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Customer Details */}
            <div className="space-y-6">
              <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
                <User size={16} className="text-[#3b82f6]" /> Customer Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Customer *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Ticket Date *</label>
                    <input
                      type="date"
                      name="ticketDate"
                      required
                      value={formData.ticketDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Ticket No. *</label>
                    <input
                      type="text"
                      name="ticketNo"
                      required
                      value={formData.ticketNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                    />
                  </div>
                </div>

                <div className="w-1/2 pr-2">
                  <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Address */}
            <div className="space-y-6">
              <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
                <MapPin size={16} className="text-[#3b82f6]" /> Address
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Billing Address</label>
                  <textarea
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f] resize-none"
                    placeholder="Enter billing address"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[12px] font-bold text-[#93c5fd] uppercase">Shipping Address</label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="sameAsBilling"
                        checked={formData.sameAsBilling}
                        onChange={handleInputChange}
                        className="w-3.5 h-3.5 accent-[#3b82f6] rounded border-gray-300"
                      />
                      <span className="text-[12px] font-medium text-[#93c5fd] group-hover:text-[#e8f0fe] transition-colors">Same as Billing address</span>
                    </label>
                  </div>
                  {!formData.sameAsBilling && (
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f] resize-none mt-2"
                      placeholder="Enter shipping address"
                    ></textarea>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-4 pt-4 border-t border-[#1e3a5f]">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
              <Box size={16} className="text-[#3b82f6]" /> Product Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Product / Service *</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                    placeholder="Enter product or service"
                  />
                  <label className="flex items-center gap-2 cursor-pointer w-fit mt-1">
                    <input
                      type="checkbox"
                      name="quantityApplicable"
                      checked={formData.quantityApplicable}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 accent-[#3b82f6] rounded border-gray-300"
                    />
                    <span className="text-[12px] font-medium text-[#93c5fd]">Quantity Applicable</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Rate *</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#93c5fd]">₹</span>
                    <input
                      type="number"
                      name="rate"
                      required
                      value={formData.rate}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f] font-bold text-[#e8f0fe]"
                    />
                  </div>
                  <span className="text-[13px] font-medium text-[#93c5fd]">/ no.s</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 mt-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f] resize-none"
                placeholder="Detailed description of the issue or requirement..."
              ></textarea>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                name="sendAcknowledgement"
                checked={formData.sendAcknowledgement}
                onChange={handleInputChange}
                className="w-4 h-4 accent-[#3b82f6] rounded border-gray-300"
              />
              <span className="text-[13px] font-bold text-[#e8f0fe]">Send Acknowledgement to Customer</span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#3b82f6] text-[#e8f0fe] rounded-xl font-bold text-[14px] hover:bg-[#2563eb] transition-all shadow-md shadow-purple-200"
            >
              <CheckCircle size={18} /> Save
            </button>
            <button
              type="button"
              onClick={handleSaveAndAddAnother}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#e8f0fe] text-[#0a1628] rounded-xl font-bold text-[14px] hover:bg-[#333] transition-all shadow-md"
            >
              <PlusCircle size={18} /> Save & Add Another
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
