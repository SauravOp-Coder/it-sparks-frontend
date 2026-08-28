import SEO from "../../components/common/SEO";

const TermsAndConditions = () => {
  return (
    <main>
      <SEO
        title="Terms and Conditions"
        description="Read the terms and conditions for using the IT Sparks Technologies website and enrolling in our courses."
        canonical="/terms-and-conditions"
      />

      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark">
            Terms and Conditions
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
              These Terms and Conditions govern your use of the IT Sparks
              Technologies website and any enquiry, enrollment, or
              interaction you make through it. By using this website, you
              agree to these terms.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              1. Use of Website
            </h2>
            <p>
              This website is intended to provide information about our IT
              training courses, batches, faculty, and placement support. You
              agree to use this website only for lawful purposes and not to
              misuse any content, forms, or functionality on the site.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              2. Course Information
            </h2>
            <p>
              Course details including duration, fees, syllabus, and batch
              timings shown on this website are indicative and may change
              without prior notice. Please confirm the latest details with
              our admissions team before enrolling.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              3. Enrollment and Fees
            </h2>
            <p>
              Enrollment in any course is confirmed only after completing
              the admission process and applicable fee payment as
              communicated by our team. Fees once paid are subject to our
              refund/cancellation policy.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              4. Placement Assistance
            </h2>
            <p>
              IT Sparks Technologies provides placement assistance and
              guidance as part of select courses. This assistance does not
              constitute a guarantee of employment. Placement outcomes
              depend on individual performance, skill level, and market
              conditions.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              5. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, logos, course
              material, and images, is the property of IT Sparks
              Technologies unless otherwise stated, and may not be
              reproduced or distributed without our written permission.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              IT Sparks Technologies is not liable for any indirect,
              incidental, or consequential loss arising from the use of
              this website or reliance on information provided on it.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              7. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms and Conditions at any time. Updated
              terms will be posted on this page with a revised date.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              8. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India, and any
              disputes will be subject to the jurisdiction of the courts in
              Pune, Maharashtra.
            </p>

            <h2 className="text-2xl font-extrabold text-dark mt-10 mb-4">
              9. Contact Us
            </h2>
            <p>
              For any questions about these Terms and Conditions, please
              reach out through our{" "}
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

export default TermsAndConditions;