const populateData = (home) => {
  setFormData({
    heroBadge: home.heroBadge || "",
    heroHeading: home.heroHeading || "",
    heroSubheading: home.heroSubheading || "",
    primaryButtonText: home.primaryButtonText || "",
    primaryButtonLink: home.primaryButtonLink || "",
    secondaryButtonText: home.secondaryButtonText || "",
    secondaryButtonLink: home.secondaryButtonLink || "",
    popularCoursesTitle: home.popularCoursesTitle || "",
    popularCoursesSubtitle: home.popularCoursesSubtitle || "",
    whyChooseTitle: home.whyChooseTitle || "",
    whyChooseSubtitle: home.whyChooseSubtitle || "",
    trainingTitle: home.trainingTitle || "",
    trainingSubtitle: home.trainingSubtitle || "",
    placementTitle: home.placementTitle || "",
    placementSubtitle: home.placementSubtitle || "",
    recruiterTitle: home.recruiterTitle || "",
    recruiterSubtitle: home.recruiterSubtitle || "",
    ctaTitle: home.ctaTitle || "",
    ctaSubtitle: home.ctaSubtitle || "",
    ctaButtonText: home.ctaButtonText || "",
    ctaButtonLink: home.ctaButtonLink || "",
    faqTitle: home.faqTitle || "Frequently Asked Questions",
    faqSubtitle: home.faqSubtitle || "Find answers to common questions.",
    whyChooseCardsText: Array.isArray(home.whyChooseCards)
      ? home.whyChooseCards.map((i) => `${i.title} | ${i.text}`).join("\n")
      : "",
    trainingStepsText: Array.isArray(home.trainingSteps)
      ? home.trainingSteps.map((i) => `${i.number} | ${i.title} | ${i.text}`).join("\n")
      : "",
    placementSupportCardsText: Array.isArray(home.placementSupportCards)
      ? home.placementSupportCards.map((i) => `${i.title} | ${i.text}`).join("\n")
      : "",
    recruitersText: Array.isArray(home.recruiters) ? home.recruiters.join(", ") : "",
  });

  // Ensure faqs state gets updated cleanly when API returns 200 OK
  if (Array.isArray(home.faqs)) {
    setFaqs(
      home.faqs.map((faq, idx) => ({
        question: faq.question || "",
        answer: faq.answer || "",
        order: faq.order ?? idx,
      }))
    );
  } else {
    setFaqs([]);
  }

  if (Array.isArray(home.sections) && home.sections.length > 0) {
    setSections([...home.sections].sort((a, b) => a.order - b.order));
  }
};