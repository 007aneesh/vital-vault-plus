'use client'
import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'

type NavItem = {
  text: string
  link: string
}

export default function Page() {
  const navItems: NavItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About Us', link: '/about-us' },
    { text: 'Contact Us', link: '/contact-us' },
  ]

  return (
    <>
      <Navbar navItems={navItems} />
      <div>
        <div className='text-center pt-24 pb-12 bg-dashboard'>
          <h1 className='text-4xl font-bold text-primary'>Privacy Policy</h1>
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center py-6 px-4 lg:px-28 lg:pt-16'>
          <div className='flex flex-col items-center justify-center w-full lg:w-[90%] mb-12'>
            <p className='max-w-md md:max-w-2xl lg:max-w-full text-sm md:text-base font-medium md:text-center text-primary-grey'>
              This Privacy Policy describes how Vital Vault collects, uses, and
              protects your personal and health information when you use our
              healthcare data management platform. By accessing or using our
              services, you acknowledge that you have read and understood this
              policy. We collect various types of information to provide and
              improve our healthcare data management services, including
              personal identifiers such as your name, date of birth, contact
              information, and government-issued identification numbers; health
              and medical information including medical history, diagnoses,
              treatment plans, medication records, lab results, and healthcare
              provider notes; insurance and payment information including policy
              details, claims history, and billing records; and technical data
              such as device information, IP addresses, and usage patterns on
              our platform. All collected information is processed in compliance
              with HIPAA (Health Insurance Portability and Accountability Act)
              regulations and other applicable healthcare privacy laws. We
              implement robust security measures including advanced encryption
              protocols, secure socket layer (SSL) technology, firewalls, and
              regular security audits to protect your data from unauthorized
              access, disclosure, alteration, or destruction. Access to your
              health information is strictly controlled and limited to
              authorized healthcare providers, administrators, and personnel
              directly involved in your care or the platform&apos;s operation.
              We maintain detailed access logs and conduct regular audits to
              ensure compliance with our security protocols. Your information
              may be shared with healthcare providers directly involved in your
              care, insurance companies for claims processing, and other third
              parties as required by law or with your explicit consent. We never
              sell your personal or health information to advertisers or
              marketing companies. Our platform includes features that allow you
              to view, update, and manage your health information, communication
              preferences, and privacy settings. You have the right to request
              access to your health records, receive copies of your data,
              request corrections to inaccurate information, and in certain
              circumstances, restrict the processing of your information. As a
              healthcare data management platform, we retain your information
              for the period necessary to fulfill our services, comply with
              legal obligations, and meet regulatory requirements for medical
              record retention. Data retention periods vary based on the type of
              information and applicable regulations. We may update this Privacy
              Policy periodically to reflect changes in our practices,
              regulatory requirements, or technology capabilities. When we make
              significant changes, we will notify you through the platform or
              via email. Your continued use of our services after such
              modifications constitutes acceptance of the updated policy. We are
              committed to protecting the privacy of minors and comply with all
              applicable laws regarding the collection and use of information
              from individuals under 18 years of age. If you believe we have
              inadvertently collected information from a minor without
              appropriate consent, please contact us immediately. In the event
              of a data breach or security incident that compromises your
              personal information, we will notify you and relevant authorities
              as required by law and take immediate steps to mitigate any
              potential harm. If you have questions, concerns, or requests
              regarding your privacy rights or this policy, you can contact our
              Privacy Officer through our secure messaging system. This Privacy
              Policy was last updated on January 17, 2025, and supersedes all
              previous versions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
