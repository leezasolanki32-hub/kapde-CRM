import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Send, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Check } from "lucide-react";

const CreateQuotation = ({ setActiveTab }) => {
  const [quotation, setQuotation] = useState(() => ({
    customerName: '',
    customerPhone: '',
    quoteNumber: 'QT-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    validUntil: '',
    items: [{ description: '', quantity: 1, price: 0, total: 0 }],
    notes: '',
    terms: 'Valid for 30 days. 50% advance for custom orders.'
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSendOptions, setShowSendOptions] = useState(false);

  const handleAddItem = () => {
    setQuotation({
      ...quotation,
      items: [...quotation.items, { description: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = quotation.items.filter((_, i) => i !== index);
    setQuotation({ ...quotation, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...quotation.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setQuotation({ ...quotation, items: newItems });
  };

  const calculateSubtotal = () => {
    return quotation.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal; // You can add tax logic here if needed
  };

  const handleSaveQuotation = async () => {
    setIsSaving(true);
    
    const quotationData = {
      quoteNumber: quotation.quoteNumber,
      customerName: quotation.customerName,
      customerPhone: quotation.customerPhone,
      date: quotation.date,
      validUntil: quotation.validUntil,
      amount: calculateTotal(),
      items: quotation.items,
      notes: quotation.notes,
      terms: quotation.terms,
      type: 'Quotations',
      executive: 'Admin'
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotationData)
      });

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => {
          setActiveTab('Quotes');
        }, 1000);
      } else {
        alert('Failed to save quotation');
      }
    } catch (error) {
      alert('Error saving quotation. Is the backend running?');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const purpleColor = [168, 85, 247];
    const darkColor = [28, 28, 30];
    const grayColor = [107, 107, 112];

    try {
      // --- Header Design ---
      // Top purple bar
      doc.setFillColor(168, 85, 247);
      doc.rect(0, 0, 210, 40, 'F');

      // CRM Name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text("KapdeCRM", 14, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text("Manage Your Clothing Business", 14, 25);

      // Quotation Title
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text("QUOTATION", 196, 25, { align: 'right' });

      // --- Quote Details ---
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(140, 45, 56, 30, 3, 3, 'S');

      doc.setFontSize(9);
      doc.setTextColor(107, 107, 112);
      doc.text("Quote Number:", 145, 53);
      doc.text("Date Issued:", 145, 61);
      doc.text("Valid Until:", 145, 69);

      doc.setTextColor(28, 28, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(quotation.quoteNumber, 190, 53, { align: 'right' });
      doc.text(quotation.date, 190, 61, { align: 'right' });
      doc.text(quotation.validUntil || "N/A", 190, 69, { align: 'right' });

      // --- Billed To Section ---
      doc.setFontSize(12);
      doc.setTextColor(168, 85, 247);
      doc.text("BILLED TO", 14, 55);

      doc.setDrawColor(168, 85, 247);
      doc.setLineWidth(0.5);
      doc.line(14, 58, 40, 58);

      doc.setTextColor(28, 28, 30);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(quotation.customerName || "Customer Name", 14, 66);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 107, 112);
      doc.text(`Phone: ${quotation.customerPhone || "N/A"}`, 14, 72);

      // --- Items Table ---
      const tableColumn = ["Description", "Quantity", "Price", "Total"];
      const tableRows = quotation.items.map(item => [
        item.description || "-",
        item.quantity,
        `Rs. ${item.price.toLocaleString()}`,
        `Rs. ${item.total.toLocaleString()}`
      ]);

      autoTable(doc, {
        startY: 85,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [168, 85, 247],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { halign: 'center' },
          2: { halign: 'right' },
          3: { halign: 'right', fontStyle: 'bold' }
        },
        styles: { fontSize: 9, cellPadding: 5 },
        margin: { left: 14, right: 14 }
      });

      // --- Summary Section ---
      const finalY = doc.lastAutoTable?.finalY || 85;
      const summaryX = 130;

      doc.setFontSize(10);
      doc.setTextColor(107, 107, 112);
      doc.setFont('helvetica', 'normal');
      doc.text("Subtotal:", summaryX, finalY + 15);
      doc.text(`Rs. ${calculateSubtotal().toLocaleString()}`, 196, finalY + 15, { align: 'right' });

      doc.setDrawColor(230, 230, 230);
      doc.line(summaryX, finalY + 20, 196, finalY + 20);

      doc.setFontSize(14);
      doc.setTextColor(168, 85, 247);
      doc.setFont('helvetica', 'bold');
      doc.text("Total Amount:", summaryX, finalY + 28);
      doc.text(`Rs. ${calculateTotal().toLocaleString()}`, 196, finalY + 28, { align: 'right' });

      // --- Notes & Terms ---
      let currentY = finalY + 45;

      if (quotation.notes) {
        doc.setFontSize(10);
        doc.setTextColor(28, 28, 30);
        doc.setFont('helvetica', 'bold');
        doc.text("Special Notes:", 14, currentY);

        doc.setFontSize(9);
        doc.setTextColor(107, 107, 112);
        doc.setFont('helvetica', 'normal');
        const splitNotes = doc.splitTextToSize(quotation.notes, 100);
        doc.text(splitNotes, 14, currentY + 6);
        currentY += 10 + (splitNotes.length * 5);
      }

      if (quotation.terms) {
        doc.setFontSize(10);
        doc.setTextColor(28, 28, 30);
        doc.setFont('helvetica', 'bold');
        doc.text("Terms & Conditions:", 14, currentY);

        doc.setFontSize(9);
        doc.setTextColor(107, 107, 112);
        doc.setFont('helvetica', 'normal');
        const splitTerms = doc.splitTextToSize(quotation.terms, 180);
        doc.text(splitTerms, 14, currentY + 6);
      }

      // --- Footer ---
      const pageHeight = doc.internal.pageSize.height;

      // Footer line
      doc.setDrawColor(240, 240, 240);
      doc.line(14, pageHeight - 25, 196, pageHeight - 25);

      doc.setFontSize(11);
      doc.setTextColor(168, 85, 247);
      doc.setFont('helvetica', 'bold');
      doc.text("Thank you for choosing KapdeCRM!", 105, pageHeight - 15, { align: 'center' });

      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text("Generated automatically via KapdeCRM Boutique Management System", 105, pageHeight - 10, { align: 'center' });

      doc.save(`${quotation.quoteNumber}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Could not generate PDF. Please try again.");
    }
  };

  const handleSendViaWhatsApp = () => {
    const message = `Hello ${quotation.customerName || 'Customer'},\n\nPlease find the quotation details for ${quotation.quoteNumber}:\nTotal Amount: Rs. ${calculateTotal().toLocaleString()}\nDate: ${quotation.date}\n\nThank you!`;
    const phone = quotation.customerPhone ? quotation.customerPhone.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowSendOptions(false);
  };

  const handleSendViaSMS = () => {
    const message = `Hello ${quotation.customerName || 'Customer'},\nQuotation ${quotation.quoteNumber}\nTotal: Rs. ${calculateTotal().toLocaleString()}\nDate: ${quotation.date}`;
    const phone = quotation.customerPhone ? quotation.customerPhone.replace(/[^0-9]/g, '') : '';
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
    setShowSendOptions(false);
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('Quotes')}
          className="p-2 hover:bg-[#132847] rounded-full transition text-[#93c5fd] hover:text-[#3b82f6]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[28px] font-bold text-[#e8f0fe]">Create New Quotation</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <h2 className="text-[18px] font-bold text-[#e8f0fe] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>
              Customer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#93c5fd] mb-1.5 uppercase tracking-wide">Customer Name</label>
                <input
                  type="text"
                  value={quotation.customerName}
                  onChange={(e) => setQuotation({ ...quotation, customerName: e.target.value })}
                  className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition"
                  placeholder="e.g. Raj Patel"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#93c5fd] mb-1.5 uppercase tracking-wide">Phone Number</label>
                <input
                  type="text"
                  value={quotation.customerPhone}
                  onChange={(e) => setQuotation({ ...quotation, customerPhone: e.target.value })}
                  className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-bold text-[#e8f0fe] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>
                Line Items
              </h2>
              <button
                onClick={handleAddItem}
                className="text-[#3b82f6] text-[13px] font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {quotation.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-[#080d1a] rounded-xl border border-[#1e3a5f]/50 group transition hover:border-[#3b82f6]/30">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-1 uppercase">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#3b82f6]"
                      placeholder="e.g. Silk Saree - Wedding Collection"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-1 uppercase">Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-1 uppercase">Price (₹)</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-1 uppercase">Total</label>
                    <div className="w-full py-2 px-3 text-[14px] font-bold text-[#e8f0fe]">
                      ₹{item.total.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-end pb-1">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 text-[#E24B4A] hover:bg-[#ffebeb] rounded-lg transition"
                      disabled={quotation.items.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
              <label className="block text-[13px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wide">Notes</label>
              <textarea
                rows="3"
                value={quotation.notes}
                onChange={(e) => setQuotation({ ...quotation, notes: e.target.value })}
                className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#3b82f6] transition resize-none"
                placeholder="Internal notes or messages to customer..."
              ></textarea>
            </div>
            <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
              <label className="block text-[13px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wide">Terms & Conditions</label>
              <textarea
                rows="3"
                value={quotation.terms}
                onChange={(e) => setQuotation({ ...quotation, terms: e.target.value })}
                className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#3b82f6] transition resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-[#e8f0fe] text-[#0a1628] rounded-2xl p-6 shadow-xl sticky top-8">
            <h2 className="text-[16px] font-bold mb-6 uppercase tracking-widest opacity-60">Quotation Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[14px]">
                <span className="opacity-60 font-medium">Quote Number</span>
                <span className="font-bold">{quotation.quoteNumber}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="opacity-60 font-medium">Date</span>
                <span className="font-bold">{quotation.date}</span>
              </div>
              <div className="border-t border-[#3b82f6]/20/10 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="opacity-60 font-medium">Subtotal</span>
                  <span className="font-bold">₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[24px] font-bold mt-4 text-[#3b82f6]">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSaveQuotation}
                disabled={isSaving || isSaved}
                className={`w-full text-[#0a1628] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg ${isSaved ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : 'bg-[#3b82f6] hover:bg-[#2563eb] shadow-[#3b82f6]/20'
                  } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">Saving...</span>
                ) : isSaved ? (
                  <span className="flex items-center gap-2"><Check size={16} className="inline-block" /> Saved!</span>
                ) : (
                  <span className="flex items-center gap-2"><Save size={18} /> Save Quotation</span>
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowSendOptions(!showSendOptions)}
                  className="w-full bg-[#0a1628]/10 hover:bg-[#132847]/20 text-[#0a1628] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Send size={18} /> Send to Customer
                </button>

                {showSendOptions && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#2D2D30] border border-[#3b82f6]/20/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-[slideDownFade_0.2s_ease-out]">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full text-left px-4 py-3 text-[13px] text-[#0a1628] hover:bg-[#132847]/5 transition flex items-center gap-3"
                    >
                      <span className="text-green-500">WhatsApp</span>
                    </button>
                    <button
                      onClick={handleSendViaSMS}
                      className="w-full text-left px-4 py-3 text-[13px] text-[#0a1628] hover:bg-[#132847]/5 transition border-t border-[#3b82f6]/20/5 flex items-center gap-3"
                    >
                      <span className="text-blue-400">Text Message</span>
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-transparent border border-[#3b82f6]/20 hover:border-[#3b82f6]/20 text-[#0a1628]/80 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>

          <div className="bg-[#080d1a] border border-[#1e3a5f] rounded-2xl p-6">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] mb-2 uppercase">Pro Tip</h3>
            <p className="text-[13px] text-[#93c5fd] leading-relaxed">
              Adding clear terms and conditions helps avoid disputes later. Most boutiques include a 50% advance policy for custom designs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuotation;

