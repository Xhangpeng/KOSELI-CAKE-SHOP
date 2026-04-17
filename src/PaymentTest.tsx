import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, CreditCard } from 'lucide-react';

const PaymentTest = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const amount = 100; // Fixed amount for testing

  const handleEsewa = async () => {
    setLoading('esewa');
    try {
      const transaction_uuid = `TEST-${Date.now()}`;
      const product_code = 'EPAYTEST';
      
      console.log('Initiating eSewa payment for amount:', amount);
      
      const response = await fetch('/api/payment/esewa/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          transaction_uuid,
          product_code
        })
      });
      
      const { signature } = await response.json();
      console.log('Received eSewa signature:', signature);

      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', 'https://rc-epay.esewa.com.np/api/epay/main/v2/form');

      const fields: Record<string, string> = {
        amount: amount.toString(),
        tax_amount: '0',
        total_amount: amount.toString(),
        transaction_uuid: transaction_uuid,
        product_code: product_code,
        product_service_charge: '0',
        product_delivery_charge: '0',
        success_url: `${window.location.origin}/payment-success?orderId=${transaction_uuid}`,
        failure_url: `${window.location.origin}/payment-failure?orderId=${transaction_uuid}`,
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        signature: signature
      };

      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', value);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('eSewa Test Error:', error);
      toast.error('eSewa initiation failed');
    } finally {
      setLoading(null);
    }
  };

  const handleKhalti = async () => {
    setLoading('khalti');
    try {
      const orderId = `TEST-KH-${Date.now()}`;
      console.log('Initiating Khalti payment for amount:', amount);

      const response = await fetch('/api/payment/khalti/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          purchase_order_id: orderId,
          purchase_order_name: "Test Order",
          return_url: `${window.location.origin}/payment-success?orderId=${orderId}`
        })
      });

      const data = await response.json();
      console.log('Khalti initiation response:', data);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Khalti initiation failed');
      }
    } catch (error) {
      console.error('Khalti Test Error:', error);
      toast.error('Khalti initiation failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full p-8 space-y-6 shadow-lg rounded-3xl border-emerald-deep/10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-emerald-deep">Payment Gateway Test</h1>
          <p className="text-muted-foreground italic">Testing Sandbox Integration</p>
        </div>

        <div className="bg-emerald-deep/5 p-6 rounded-2xl text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Test Amount</p>
          <p className="text-4xl font-bold text-emerald-deep">Rs. {amount}</p>
        </div>

        <div className="grid gap-4">
          <Button 
            onClick={handleEsewa} 
            disabled={!!loading}
            className="h-14 bg-[#60bb46] hover:bg-[#50a03a] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3"
          >
            {loading === 'esewa' ? <Loader2 className="animate-spin" /> : <CreditCard />}
            Pay with eSewa
          </Button>

          <Button 
            onClick={handleKhalti} 
            disabled={!!loading}
            className="h-14 bg-[#5c2d91] hover:bg-[#4a2475] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3"
          >
            {loading === 'khalti' ? <Loader2 className="animate-spin" /> : <CreditCard />}
            Pay with Khalti
          </Button>
        </div>

        <div className="pt-4 border-t border-dashed border-emerald-deep/10 text-center">
          <p className="text-xs text-muted-foreground">
            Check the browser console (F12) to see initiation logs.
            After payment, you will be redirected to the verification page.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentTest;
