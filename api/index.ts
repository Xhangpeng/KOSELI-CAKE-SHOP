import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// eSewa Signature Generation
app.post("/api/payment/esewa/initiate", (req, res) => {
  try {
    const { amount, transaction_uuid, product_code } = req.body;
    const secretKey = process.env.ESEWA_SECRET_KEY || "8g8M9mH2Yq15ys4P";
    
    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(message)
      .digest("base64");

    res.json({ signature: hash });
  } catch (error) {
    console.error("eSewa initiation error:", error);
    res.status(500).json({ error: "Failed to initiate eSewa payment" });
  }
});

// Khalti Payment Initiation
app.post("/api/payment/khalti/initiate", async (req, res) => {
  try {
    const { amount, purchase_order_id, purchase_order_name, return_url } = req.body;
    const secretKey = process.env.KHALTI_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: "Khalti secret key not configured" });
    }

    const response = await fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
      method: "POST",
      headers: {
        "Authorization": `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url,
        website_url: process.env.VITE_APP_URL || "http://localhost:3000",
        amount: amount * 100,
        purchase_order_id,
        purchase_order_name,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Khalti initiation error:", error);
    res.status(500).json({ error: "Failed to initiate Khalti payment" });
  }
});

// eSewa Payment Verification
app.get("/api/payment/esewa/verify", async (req, res) => {
  try {
    const { data } = req.query;
    if (!data) return res.status(400).json({ error: "No data provided" });

    const decodedData = JSON.parse(Buffer.from(data as string, 'base64').toString('utf-8'));
    const { total_amount, transaction_uuid, product_code } = decodedData;

    const gatewayUrl = process.env.VITE_ESEWA_GATEWAY_URL?.includes('rc-epay') 
      ? "https://rc-epay.esewa.com.np/api/epay/transaction/status/"
      : "https://epay.esewa.com.np/api/epay/transaction/status/";

    const response = await fetch(`${gatewayUrl}?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`);
    const result = await response.json();

    if (result.status === "COMPLETE") {
      res.json({ success: true, orderId: transaction_uuid, details: result });
    } else {
      res.status(400).json({ success: false, details: result });
    }
  } catch (error) {
    console.error("eSewa verification error:", error);
    res.status(500).json({ error: "Failed to verify eSewa payment" });
  }
});

// Khalti Payment Verification
app.post("/api/payment/khalti/verify", async (req, res) => {
  try {
    const { pidx } = req.body;
    const secretKey = process.env.KHALTI_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: "Khalti secret key not configured" });
    }

    const response = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
      method: "POST",
      headers: {
        "Authorization": `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();
    
    if (data.status === "Completed") {
      res.json({ success: true, orderId: data.purchase_order_id, details: data });
    } else {
      res.status(400).json({ success: false, details: data });
    }
  } catch (error) {
    console.error("Khalti verification error:", error);
    res.status(500).json({ error: "Failed to verify Khalti payment" });
  }
});

export default app;
