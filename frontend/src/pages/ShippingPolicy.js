import React from "react";

function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 dark:bg-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Shipping Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Shipping Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At Market Pulse, we are committed to delivering your orders safely and on time. This Shipping Policy outlines our shipping methods, delivery times, costs, and procedures.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We currently ship to locations within Sri Lanka. International shipping may be available for select items - please contact us for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Shipping Methods and Delivery Times
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Standard Shipping
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Delivery Time:</strong> 3-5 business days
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Cost:</strong> Rs. 200 (Free for orders over Rs. 500)
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Standard shipping is our most economical option. Orders are processed within 1-2 business days and shipped via our standard courier service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.2 Express Shipping
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Delivery Time:</strong> 1-2 business days
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Cost:</strong> Rs. 500
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Express shipping is available for urgent orders. Orders placed before 2:00 PM on weekdays will be processed the same day.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.3 Same-Day Delivery
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Delivery Time:</strong> Same day (Colombo and surrounding areas only)
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Cost:</strong> Rs. 800
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Same-day delivery is available for orders placed before 12:00 PM on weekdays in Colombo and selected areas. Orders must be placed before the cutoff time to qualify.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Free Shipping
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We offer <strong>FREE standard shipping</strong> on all orders over <strong>Rs. 500</strong>. Free shipping applies automatically at checkout when your order total meets the minimum requirement.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Free shipping uses our standard shipping method (3-5 business days). If you need faster delivery, you can upgrade to express or same-day shipping at checkout.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Order Processing
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1 Processing Time
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Orders are typically processed within 1-2 business days (Monday through Friday, excluding public holidays). Processing time begins after:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Payment has been confirmed</li>
              <li>Order has been verified</li>
              <li>All items are in stock</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.2 Order Status Updates
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You will receive email notifications at each stage of your order:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Order confirmation (immediately after purchase)</li>
              <li>Order processing (when your order enters our fulfillment system)</li>
              <li>Shipping confirmation (with tracking number)</li>
              <li>Delivery confirmation (when your order is delivered)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Tracking Your Order
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Track your package in real-time on the courier's website</li>
              <li>View estimated delivery date</li>
              <li>See delivery status updates</li>
              <li>Access delivery history</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You can also track your order by logging into your account and visiting the "My Orders" section.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Delivery Areas
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6.1 Delivery Coverage
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We currently deliver to all major cities and towns in Sri Lanka, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Colombo and Greater Colombo Area</li>
              <li>Kandy</li>
              <li>Galle</li>
              <li>Matara</li>
              <li>Kurunegala</li>
              <li>Anuradhapura</li>
              <li>Jaffna</li>
              <li>And other major cities</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              For remote areas, delivery may take additional time. Please contact us to confirm delivery availability to your location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Delivery Attempts and Failed Deliveries
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.1 Delivery Attempts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our courier partners will make up to <strong>3 delivery attempts</strong> at the address provided. If delivery cannot be completed:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>The package will be held at the nearest courier depot</li>
              <li>You will be notified via email and SMS</li>
              <li>You can arrange for pickup or reschedule delivery</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7.2 Failed Deliveries
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If delivery fails after all attempts, the package will be returned to us. In such cases:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>You will be contacted to arrange alternative delivery</li>
              <li>Return shipping costs may apply</li>
              <li>Refund will be processed minus shipping costs if delivery cannot be completed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Shipping Costs
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Shipping costs are calculated based on:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Shipping method selected</li>
              <li>Package weight and dimensions</li>
              <li>Delivery location</li>
              <li>Order value (free shipping for orders over Rs. 500)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Shipping costs are displayed at checkout before you complete your purchase. All prices include applicable taxes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Multiple Items in One Order
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If your order contains multiple items, they may be shipped together or separately depending on:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Item availability</li>
              <li>Warehouse location</li>
              <li>Shipping method selected</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              If items are shipped separately, you will receive separate tracking numbers for each shipment. You will only be charged one shipping fee for the entire order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Delayed or Lost Packages
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10.1 Delayed Deliveries
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to meet all delivery estimates, delays may occur due to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Weather conditions</li>
              <li>Public holidays</li>
              <li>High order volumes</li>
              <li>Courier service delays</li>
              <li>Incorrect or incomplete delivery address</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10.2 Lost Packages
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If your package is lost in transit, please contact us immediately. We will:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Investigate with the courier service</li>
              <li>Provide a replacement or full refund</li>
              <li>Keep you updated throughout the process</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. International Shipping
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              International shipping is available for select items and locations. Please contact us at <strong>shipping@marketpulse.com</strong> to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Check if your country is eligible for shipping</li>
              <li>Get a shipping quote</li>
              <li>Learn about customs and import duties</li>
              <li>Understand delivery timelines</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              International orders may be subject to customs fees, import duties, and taxes, which are the responsibility of the customer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about our Shipping Policy or need assistance with your order, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> shipping@marketpulse.com
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

export default ShippingPolicy;

