import { Challan } from '../types';
import { Printer, X, FileText, CheckCircle, AlertTriangle, XCircle, Building2, User, Calendar } from 'lucide-react';

interface InvoicePrintModalProps {
  challan: Challan | null;
  onClose: () => void;
}

export default function InvoicePrintModal({ challan, onClose }: InvoicePrintModalProps) {
  if (!challan) return null;

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalAmount = () => {
    if (!challan.items) return 0;
    return challan.items.reduce((sum, item) => sum + (Number(item.unitPriceSnapshot) * item.quantity), 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Action Bar (Hidden when printing) */}
        <div className="no-print p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sales Delivery Challan / Invoice</h3>
              <p className="text-xs text-slate-400">Preview & Print Official Delivery Note</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="p-8 overflow-y-auto bg-slate-950 printable-area text-slate-100 space-y-6">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black text-sm">
                  F
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white uppercase">FUNDSROOM ERP</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">Wholesale & Distribution Logistics Division</p>
              <p className="text-xs text-slate-400">GSTIN: 27AAAAA0000A1Z5 | Reg: ISO 9001:2026</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-slate-700 bg-slate-800">
                {challan.status === 'CONFIRMED' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />}
                {challan.status === 'DRAFT' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mr-1.5" />}
                {challan.status === 'CANCELLED' && <XCircle className="w-3.5 h-3.5 text-rose-400 mr-1.5" />}
                <span className={
                  challan.status === 'CONFIRMED' ? 'text-emerald-400' :
                  challan.status === 'DRAFT' ? 'text-amber-400' : 'text-rose-400'
                }>
                  {challan.status} DELIVERY CHALLAN
                </span>
              </div>
              <h2 className="text-xl font-extrabold font-mono text-sky-400">{challan.challanNumber}</h2>
              <p className="text-xs text-slate-400 flex items-center justify-start sm:justify-end gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: {new Date(challan.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
            </div>
          </div>

          {/* Customer & Logistics Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Customer / Billed To</span>
              </h4>
              <p className="text-sm font-bold text-white">{challan.customer?.businessName || 'N/A'}</p>
              <p className="text-xs text-slate-300 font-medium">{challan.customer?.name}</p>
              <p className="text-xs text-slate-400 mt-1">{challan.customer?.address}</p>
              <p className="text-xs text-slate-400">Mobile: {challan.customer?.mobile} | Email: {challan.customer?.email}</p>
              {challan.customer?.gstNumber && (
                <p className="text-xs font-mono text-sky-400 mt-1">GSTIN: {challan.customer.gstNumber}</p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky-400" />
                <span>Dispatch & Authorization</span>
              </h4>
              <p className="text-xs text-slate-300">Generated By: <span className="font-semibold text-white">{challan.createdBy}</span></p>
              <p className="text-xs text-slate-300">Logistics Mode: <span className="font-semibold text-white">Road Transport</span></p>
              <p className="text-xs text-slate-300">Total Unit Count: <span className="font-bold text-sky-400">{challan.totalQuantity} Units</span></p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-300 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 font-mono">SKU Code</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Qty</th>
                  <th className="py-3 px-4 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {challan.items && challan.items.length > 0 ? (
                  challan.items.map((item, index) => {
                    const lineTotal = Number(item.unitPriceSnapshot) * item.quantity;
                    return (
                      <tr key={item.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono text-slate-400">{index + 1}</td>
                        <td className="py-3 px-4 font-semibold text-white">{item.productNameSnapshot}</td>
                        <td className="py-3 px-4 font-mono text-sky-400">{item.skuSnapshot}</td>
                        <td className="py-3 px-4 text-right font-mono">₹{Number(item.unitPriceSnapshot).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-right font-bold text-white">{item.quantity}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">₹{lineTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">No line items in this challan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Terms & Conditions:</p>
              <p>1. Goods once sold/delivered will not be taken back.</p>
              <p>2. Subject to local jurisdiction only.</p>
              <p>3. This is a computer-generated delivery challan snapshot.</p>
            </div>

            <div className="w-full sm:w-64 bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items:</span>
                <span className="font-bold text-white">{challan.items?.length || 0} Products</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Quantity:</span>
                <span className="font-bold text-white">{challan.totalQuantity} Units</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                <span>Grand Total:</span>
                <span className="text-emerald-400 font-mono">₹{calculateTotalAmount().toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-12 text-center text-xs">
            <div className="border-t border-slate-700 pt-2">
              <p className="font-semibold text-slate-300">Receiver's Signature</p>
              <p className="text-[10px] text-slate-400">Goods received in good condition</p>
            </div>
            <div className="border-t border-slate-700 pt-2">
              <p className="font-semibold text-slate-300">Authorized Signatory</p>
              <p className="text-[10px] text-slate-400">For Fundsroom Operations Logistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
