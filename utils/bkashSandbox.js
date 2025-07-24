export const initializeBkash = async (amount, invoiceNumber) => {
  try {
    // In a real implementation, you would call your backend API here
    // For sandbox, we'll simulate the response
    const sandboxResponse = {
      paymentID: `sandbox-pid-${Math.random().toString(36).substr(2, 9)}`,
      bkashURL: "https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/redirect",
      success: true,
    };

    return sandboxResponse;
  } catch (error) {
    console.error("bKash initialization error:", error);
    throw error;
  }
};

export const executeBkashPayment = async (paymentID) => {
  try {
    // Simulate a successful payment in sandbox
    return {
      transactionStatus: "Completed",
      paymentID,
      amount: "1000", // This would be dynamic in real implementation
      currency: "BDT",
      merchantInvoiceNumber: `INV-${Date.now()}`,
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`,
    };
  } catch (error) {
    console.error("bKash execution error:", error);
    throw error;
  }
};
