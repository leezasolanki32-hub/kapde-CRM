import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Send, Download, LifeBuoy } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Check } from "lucide-react";

const CreateCreditNote = ({ setActiveTab }) => {
  const [creditNote, setCreditNote] = useState(() => ({
    customerName: '',
    customerPhone: '',
    originalInvoiceRef: '',
    creditNoteNumber: 'CN-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, price: 0, total: 0 }],
    notes: 'Credit for returned items / pricing adjustment.',
    terms: 'This credit can be applied to future invoices.'
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSendOptions, setShowSendOptions] = useState(false);

  const handleAddItem = () => {
    setCreditNote({
      ...creditNote,
      items: [...creditNote.items, { description: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = creditNote.items.filter((_, i) => i !== index);
    setCreditNote({ ...creditNote, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...creditNote.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setCreditNote({ ...creditNote, items: newItems });
  };

  const calculateSubtotal = () => {
    return creditNote.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleSaveCreditNote = async () => {
    setIsSaving(true);
    
    const noteData = {
      creditNoteNumber: creditNote.creditNoteNumber,
      customerName: creditNote.customerName,
      customerPhone: creditNote.customerPhone,
      originalInvoiceRef: creditNote.originalInvoiceRef,
      date: creditNote.date,
      items: creditNote.items,
      notes: creditNote.notes,
      terms: creditNote.terms,
      amount: calculateTotal(),
      status: 'Unused'
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/credit-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => {
          setActiveTab('Invoices');
        }, 1000);
      } else {
        alert('Failed to save credit note');
      }
    } catch (error) {
      alert('Error saving credit note. Is the backend running?');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    try {
      // --- Header Design ---
      doc.setFillColor(30, 41, 59); // Dark blue/slate for credit note to distinguish from invoice
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text("KapdeCRM", 14, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text("Professional Boutique Billing", 14, 25);

      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text("CREDIT NOTE", 196, 25, { align: 'right' });

      // --- Details ---
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(140, 45, 56, 30, 3, 3, 'S');

      doc.setFontSize(9);
      doc.setTextColor(107, 107, 112);
      doc.text("CN No:", 145, 53);
      doc.text("Date:", 145, 61);
      doc.text("Ref Inv:", 145, 69);

      doc.setTextColor(28, 28, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(creditNote.creditNoteNumber, 190, 53, { align: 'right' });
      doc.text(creditNote.date, 190, 61, { align: 'right' });
      doc.text(creditNote.originalInvoiceRef || "N/A", 190, 69, { align: 'right' });

      // --- Billed To Section ---
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text("CREDIT TO", 14, 55);

      doc.setDrawColor(30, 41, 59);
      doc.setLineWidth(0.5);
      doc.line(14, 58, 40, 58);

      doc.setTextColor(28, 28, 30);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(creditNote.customerName || "Customer Name", 14, 66);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 107, 112);
      doc.text(`Phone: ${creditNote.customerPhone || "N/A"}`, 14, 72);

      // --- Items Table ---
      const tableColumn = ["Description", "Quantity", "Price", "Credit Total"];
      const tableRows = creditNote.items.map(item => [
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
          fillColor: [30, 41, 59],
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
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.text("Total Credit:", summaryX, finalY + 28);
      doc.text(`Rs. ${calculateTotal().toLocaleString()}`, 196, finalY + 28, { align: 'right' });

      // --- Notes & Terms ---
      let currentY = finalY + 45;

      if (creditNote.notes) {
        doc.setFontSize(10);
        doc.setTextColor(28, 28, 30);
        doc.setFont('helvetica', 'bold');
        doc.text("Notes:", 14, currentY);
        doc.setFontSize(9);
        doc.setTextColor(107, 107, 112);
        doc.setFont('helvetica', 'normal');
        const splitNotes = doc.splitTextToSize(creditNote.notes, 100);
        doc.text(splitNotes, 14, currentY + 6);
        currentY += 10 + (splitNotes.length * 5);
      }

      if (creditNote.terms) {
        doc.setFontSize(10);
        doc.setTextColor(28, 28, 30);
        doc.setFont('helvetica', 'bold');
        doc.text("Terms & Conditions:", 14, currentY);
        doc.setFontSize(9);
        doc.setTextColor(107, 107, 112);
        doc.setFont('helvetica', 'normal');
        const splitTerms = doc.splitTextToSize(creditNote.terms, 180);
        doc.text(splitTerms, 14, currentY + 6);
      }

      const pageHeight = doc.internal.pageSize.height;
      doc.setDrawColor(240, 240, 240);
      doc.line(14, pageHeight - 25, 196, pageHeight - 25);
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.text("KapdeCRM - Official Credit Document", 105, pageHeight - 15, { align: 'center' });

      doc.save(`${creditNote.creditNoteNumber}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Could not generate PDF. Please try again.");
    }
  };

  const handleSendViaWhatsApp = () => {
    const message = `Hello ${creditNote.customerName || 'Customer'},\n\nPlease find the details for Credit Note ${creditNote.creditNoteNumber}:\nTotal Credit Amount: Rs. ${calculateTotal().toLocaleString()}\n\nThis credit can be adjusted against future invoices.\nThank you!`;
    const phone = creditNote.customerPhone ? creditNote.customerPhone.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowSendOptions(false);
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('Invoices')}
          className="p-2 hover:bg-[#f1f5f9] rounded-full transition text-[#93c5fd] hover:text-[#0f172a]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[28px] font-bold text-[#e8f0fe]">Create Credit Note</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <h2 className="text-[18px] font-bold text-[#e8f0fe] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0f172a] rounded-full"></span>
              Credit Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#93c5fd] mb-1.5 uppercase tracking-wide">Customer Name</label>
                <input
                  type="text"
                  value={creditNote.customerName}
                  onChange={(e) => setCreditNote({ ...creditNote, customerName: e.target.value })}
                  className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] transition"
                  placeholder="e.g. Raj Patel"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#93c5fd] mb-1.5 uppercase tracking-wide">Original Invoice Ref.</label>
                <input
                  type="text"
                  value={creditNote.originalInvoiceRef}
                  onChange={(e) => setCreditNote({ ...creditNote, originalInvoiceRef: e.target.value })}
                  className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] transition"
                  placeholder="e.g. INV-1234"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#93c5fd] mb-1.5 uppercase tracking-wide">Phone Number</label>
                <input
                  type="text"
                  value={creditNote.customerPhone}
                  onChange={(e) => setCreditNote({ ...creditNote, customerPhone: e.target.value })}
                  className="w-full border border-[#1e3a5f] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] transition"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-bold text-[#e8f0fe] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0f172a] rounded-full"></span>
                Returned / Adjusted Items
              </h2>
              <button
                onClick={handleAddItem}
                className="text-[#0f172a] text-[13px] font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {creditNote.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-5 bg-[#0a1628] rounded-xl border border-[#1e3a5f] shadow-sm group transition-all hover:border-[#0f172a] hover:shadow-md">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wider">Item Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full bg-[#080d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a] transition"
                      placeholder="e.g. Return: Silk Saree"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wider">Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-[#080d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0f172a] text-center"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wider">Credit Val (₹)</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#080d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0f172a]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-[11px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wider">Total</label>
                    <div className="w-full py-2.5 px-2 text-[15px] font-bold text-[#e8f0fe]">
                      ₹{item.total.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-end pb-1">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="p-2.5 text-[#E24B4A] hover:bg-[#ffebeb] rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      disabled={creditNote.items.length === 1}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
              <label className="block text-[13px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wide">Reason for Credit</label>
              <textarea
                rows="3"
                value={creditNote.notes}
                onChange={(e) => setCreditNote({ ...creditNote, notes: e.target.value })}
                className="w-full border border-[#1e3a5f] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0f172a] transition resize-none bg-[#080d1a]"
                placeholder="Message displayed on credit note..."
              ></textarea>
            </div>
            <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
              <label className="block text-[13px] font-bold text-[#93c5fd] mb-2 uppercase tracking-wide">Terms</label>
              <textarea
                rows="3"
                value={creditNote.terms}
                onChange={(e) => setCreditNote({ ...creditNote, terms: e.target.value })}
                className="w-full border border-[#1e3a5f] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0f172a] transition resize-none bg-[#080d1a]"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-[#e8f0fe] text-[#0a1628] rounded-3xl p-8 shadow-2xl sticky top-8 border border-[#3b82f6]/20/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f172a] blur-[80px] opacity-40 -mr-16 -mt-16"></div>
            
            <h2 className="text-[14px] font-bold mb-8 uppercase tracking-[0.2em] text-[#94a3b8]">Credit Summary</h2>

            <div className="space-y-5 mb-10 relative z-10">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#0a1628]/50 font-medium">CN Number</span>
                <span className="font-bold tracking-tight">{creditNote.creditNoteNumber}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#0a1628]/50 font-medium">Date</span>
                <span className="font-bold">{creditNote.date}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#0a1628]/50 font-medium">Linked Invoice</span>
                <span className="font-bold">{creditNote.originalInvoiceRef || '-'}</span>
              </div>
              
              <div className="pt-6 border-t border-[#3b82f6]/20/10 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#0a1628]/50 font-medium text-[13px]">Subtotal</span>
                  <span className="font-bold text-[15px]">₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <span className="text-[#0a1628]/50 font-bold uppercase text-[11px] tracking-widest mb-1">Total Credit</span>
                  <span className="text-[32px] font-bold text-[#0a1628] tracking-tighter leading-none">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <button
                onClick={handleSaveCreditNote}
                disabled={isSaving || isSaved}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                  isSaved 
                    ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
                    : 'bg-[#0f172a] hover:bg-[#1e293b] shadow-[#0f172a]/30 hover:-translate-y-0.5 active:translate-y-0 border border-[#3b82f6]/20/10'
                } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#3b82f6]/20/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : isSaved ? (
                  <span className="flex items-center gap-2"><Check size={16} className="inline-block" /> Credit Note Saved!</span>
                ) : (
                  <span className="flex items-center gap-2"><Save size={20} /> Create Credit Note</span>
                )}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowSendOptions(!showSendOptions)}
                  className={`w-full bg-[#0a1628]/5 border border-[#3b82f6]/20/10 hover:bg-[#132847]/10 text-[#0a1628] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${showSendOptions ? 'bg-[#0a1628]/10 ring-2 ring-[#0f172a]/50' : ''}`}
                >
                  <Send size={20} /> Send to Customer
                </button>

                {showSendOptions && (
                  <div className="absolute bottom-full left-0 w-full mb-3 bg-[#2D2D30] border border-[#3b82f6]/20/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-[slideUpFade_0.2s_ease-out]">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full text-left px-5 py-4 text-[14px] text-[#0a1628] hover:bg-[#0f172a] transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 group-hover:text-[#0a1628]">WhatsApp</span>
                      </div>
                      <span className="text-[10px] bg-[#0a1628]/10 px-2 py-0.5 rounded-full uppercase opacity-50 group-hover:opacity-100 group-hover:bg-black/20">Fast</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleDownloadPDF}
                className="w-full bg-transparent border border-[#3b82f6]/20/10 hover:border-[#3b82f6]/20/30 hover:bg-[#132847]/5 text-[#0a1628]/60 hover:text-[#0a1628] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
              >
                <Download size={20} /> Download PDF
              </button>
            </div>
          </div>

          <div className="bg-[#080d1a] border border-[#1e3a5f] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <LifeBuoy size={48} />
            </div>
            <h3 className="text-[14px] font-bold text-[#e8f0fe] mb-2 uppercase tracking-wide">Credit Pro-Tip</h3>
            <p className="text-[13px] text-[#93c5fd] leading-relaxed relative z-10">
              Always link a credit note to the original invoice to keep your accounting books clean and easily traceable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCreditNote;
