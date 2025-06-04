import React from "react";

function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 dark:bg-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Refund Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At Market Pulse, we want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for returns, refunds, and exchanges of products purchased through our website.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Please read this policy carefully before making a purchase. By making a purchase, you agree to be bound by the terms of this Refund Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Eligibility for Refunds
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Return Window
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have <strong>14 days</strong> from the date of delivery to request a return or refund for eligible items. The return period begins on the day you receive the product.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.2 Eligible Items
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Items eligible for return must meet the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Product must be unused, unopened, and in its original packaging</li>
              <li>Product must be in the same condition as when you received it</li>
              <li>All original tags, labels, and accessories must be included</li>
              <li>Product must not be damaged, altered, or missing any parts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.3 Non-Refundable Items
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The following items are not eligible for return or refund:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Perishable goods (food items, beverages, etc.)</li>
              <li>Personalized or custom-made products</li>
              <li>Digital products and downloadable software</li>
              <li>Gift cards and vouchers</li>
              <li>Items damaged due to misuse or negligence</li>
              <li>Items returned after the 14-day return window</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How to Request a Return
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To initiate a return, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Log in to your account on our website</li>
              <li>Navigate to "My Orders" or "Order History"</li>
              <li>Select the order containing the item you wish to return</li>
              <li>Click "Request Return" and provide a reason for the return</li>
              <li>Wait for return authorization (typically within 1-2 business days)</li>
              <li>Package the item securely in its original packaging</li>
              <li>Ship the item back using the provided return label</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300">
              Alternatively, you can contact our customer service team at <strong>support@marketpulse.com</strong> or call <strong>+94 117 551 111</strong> to initiate a return.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Return Shipping
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1 Return Shipping Costs
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Free Returns:</strong> We offer free return shipping for items that are defective, damaged, or incorrect items sent by us.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Customer-Paid Returns:</strong> For returns due to change of mind or other customer-initiated reasons, return shipping costs will be deducted from your refund amount.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.2 Return Address
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once your return is authorized, we will provide you with a return shipping label and the return address. Please use the provided label to ensure your return is processed correctly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Refund Processing
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.1 Refund Timeline
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once we receive and inspect your returned item, we will process your refund:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Inspection:</strong> 2-3 business days after receiving the returned item</li>
              <li><strong>Refund Processing:</strong> 5-7 business days after approval</li>
              <li><strong>Credit Card Refunds:</strong> 7-14 business days to appear on your statement</li>
              <li><strong>Bank Transfer Refunds:</strong> 3-5 business days</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.2 Refund Method
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Refunds will be issued to the original payment method used for the purchase. If the original payment method is no longer available, please contact us to arrange an alternative refund method.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.3 Partial Refunds
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              In certain circumstances, we may issue partial refunds:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Items returned in used or damaged condition</li>
              <li>Missing accessories or parts</li>
              <li>Items that have been worn or used beyond normal inspection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Exchanges
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We currently do not offer direct exchanges. If you wish to exchange an item for a different size, color, or product, please:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Return the original item following our return process</li>
              <li>Place a new order for the desired item</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300">
              We will process your refund for the returned item, and you can use those funds to purchase the new item.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Defective or Damaged Items
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you receive a defective or damaged item, please contact us immediately at <strong>support@marketpulse.com</strong> or <strong>+94 117 551 111</strong>. We will:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provide a prepaid return shipping label</li>
              <li>Process a full refund or replacement at no additional cost</li>
              <li>Expedite the refund or replacement process</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Please include photos of the defect or damage when contacting us to help us process your claim faster.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Cancellations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You may cancel your order before it ships. Once an order has been shipped, it cannot be cancelled and must be returned following our standard return process.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              To cancel an order, please contact us as soon as possible. If the order has already been processed for shipping, we will attempt to intercept it, but cannot guarantee cancellation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about our Refund Policy or need assistance with a return, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> support@marketpulse.com
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Phone:</strong> +94 117 551 111
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (Sri Lanka Time)
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> 147 Kottawa Road, Nugegoda, Sri Lanka
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;

