import SEO from "../../components/common/SEO";

const PrivacyPolicy = () => {
  return (
    <main>
      <SEO
        title="Privacy Policy"
        description="Read the IT Sparks Technologies privacy policy to understand how we collect, use, and protect your personal information."
        canonical="/privacy-policy"
      />

      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark">
            Privacy Policy
          </h1>
          <p className="text-textGray mt-4">
            Last updated: {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <article className="prose max-w-none text-textGray leading-8">
            <p>
              IT Sparks Technologies ("we", "us", "our") respects your
              privacy and is committed to protecting the personal
              information you share with us through this website. This
              Privacy Policy explains what information we collect, how we
              use it, and the choices you have.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              1. Information We Collect
            </h2>
            <p>
              When you fill out an enquiry form, contact form, or brochure
              download request on our website, we may collect your name,
              phone number, email address, and any message or course
              interest you share with us. We do not knowingly collect
              sensitive personal information such as financial or health
              data through this website.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Respond to your course enquiries and questions</li>
              <li>Provide information about our courses, batches, and offers</li>
              <li>Contact you regarding admissions, demos, or placement support</li>
              <li>Improve our website and course offerings</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              3. Third-Party Services
            </h2>
            <p>
              We use trusted third-party services to operate this website,
              including cloud storage providers for images and documents.
              These providers only process data on our behalf and are not
              authorized to use it for their own purposes.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to improve your browsing
              experience and understand how visitors use our site. You can
              disable cookies through your browser settings, though some
              parts of the site may not function as intended.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              5. Data Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to
              third parties for marketing purposes. Your information is
              only shared internally with our admissions and training team
              to respond to your enquiry.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              6. Data Security
            </h2>
            <p>
              We take reasonable technical and organizational measures to
              protect your personal information from unauthorized access,
              alteration, or disclosure. However, no method of transmission
              over the internet is completely secure.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              7. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us using the
              details below.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with an updated revision
              date.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through our{" "}
              <a href="/contact" className="text-primary font-bold">
                Contact page
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;