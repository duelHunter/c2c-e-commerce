import React from "react";

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 dark:bg-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using Market Pulse's website, mobile application, or services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms apply to all visitors, users, and others who access or use the Service. Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Use of the Service
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Eligibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>You are at least 18 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You will use the Service in accordance with these Terms and all applicable laws</li>
              <li>All information you provide is accurate, current, and complete</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.2 Account Registration
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To access certain features of the Service, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information to keep it accurate</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Products and Pricing
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.1 Product Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions, images, or other content on the Service is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.2 Pricing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All prices are displayed in Sri Lankan Rupees (Rs.) and are subject to change without notice. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Modify prices at any time</li>
              <li>Correct pricing errors (even after an order has been placed)</li>
              <li>Refuse or cancel orders placed at incorrect prices</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.3 Product Availability
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Product availability is subject to change. We reserve the right to discontinue any product at any time. If a product becomes unavailable after you place an order, we will notify you and provide a full refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Orders and Payment
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1 Order Acceptance
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you place an order, you are making an offer to purchase products. We reserve the right to accept or reject your order for any reason, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Product availability</li>
              <li>Errors in pricing or product information</li>
              <li>Suspected fraud or unauthorized transactions</li>
              <li>Errors in your order</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.2 Payment Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Payment must be received before we process and ship your order. We accept:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Credit and debit cards (Visa, Mastercard, American Express)</li>
              <li>Digital payment methods (as available)</li>
              <li>Bank transfers (for select orders)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              By providing payment information, you represent that you are authorized to use the payment method and that the payment information is accurate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Seller Responsibilities
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you list products for sale on our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provide accurate product descriptions and images</li>
              <li>Maintain adequate inventory to fulfill orders</li>
              <li>Ship products within the stated timeframe</li>
              <li>Respond to customer inquiries promptly</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not list prohibited or illegal items</li>
              <li>Resolve customer disputes in good faith</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to suspend or terminate seller accounts that violate these Terms or engage in fraudulent activity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Prohibited Uses
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
              <li>To interfere with or circumvent the security features of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service and its original content, features, and functionality are owned by Market Pulse and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Reproduce, distribute, modify, create derivative works of, publicly display, or publicly perform any content from the Service without our prior written consent</li>
              <li>Use our trademarks, logos, or other proprietary information without our express written consent</li>
              <li>Remove any copyright or other proprietary notations from the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. User Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, or other material ("User Content"). You are responsible for User Content that you post on or through the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By posting User Content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, and distribute such User Content.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You represent and warrant that you own or have the necessary rights to grant the license described above and that your User Content does not violate any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Disclaimers and Limitation of Liability
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9.1 Disclaimer of Warranties
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9.2 Limitation of Liability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, MARKET PULSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Our total liability to you for all claims arising from or related to the Service shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to defend, indemnify, and hold harmless Market Pulse, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees, arising out of or in any way connected with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party right, including any intellectual property right</li>
              <li>Any User Content you post or transmit through the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Your right to use the Service will immediately cease</li>
              <li>We may delete your account and all associated data</li>
              <li>Any outstanding orders may be cancelled</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You may terminate your account at any time by contacting us or using the account deletion feature in your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              14. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> legal@marketpulse.com
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

export default TermsOfService;

