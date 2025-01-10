import { Card } from "flowbite-react";
import React, { useState } from "react";
import { FaBolt, FaCheckCircle, FaLightbulb, FaHeadset } from "react-icons/fa";
import NavbarComponent from "../../components/navbar";
import FooterComponent from "../../components/footer";
import h23 from '../../assets/images/H23.jpg'
const features = [
  {
    title: "Centralized Marketplace",
    description:
      "Our platform serves as a one-stop shop for shippers and carriers. Shippers can post their transportation needs, and carriers can offer their available transportation capacity. This centralization reduces the hassle of managing multiple logistics channels and ensures that all stakeholders can find what they need in one place.",
  },
 
  {
    title: "Optimized Resource Allocation",
    description:
      "Utilizing advanced algorithms, our platform predicts demand patterns and optimizes routes to reduce empty miles and improve fleet utilization. This ensures that resources are used efficiently, reducing operational costs and environmental impact.",
  },
  {
    title: "Seamless Communication",
    description:
      "Integrated communication tools, including instant messaging, automated notifications, and document sharing, facilitate real-time collaboration between shippers and carriers. This seamless communication helps prevent miscommunications, resolve issues quickly, and improve overall coordination.",
  },
  {
    title: "Scalable and Flexible",
    description:
      "Built on a robust cloud-based infrastructure, our platform can handle increasing volumes of data and transactions, ensuring reliability and performance even as user demand grows. Additionally, the platform offers flexible features and customization options, allowing businesses to tailor the system to their specific requirements.",
  },
  {
    title: "Security and Compliance",
    description:
      "We prioritize the security and compliance of our platform. Advanced security measures, such as encryption, access controls, and audit logs, protect user data and ensure the integrity of transactions. Our platform complies with relevant industry regulations and standards, providing users with a safe and trustworthy system.",
  },
];

const choose = [
  {
    icon: <FaBolt className="text-yellow-500" size={40} />,
    title: "Efficiency",
    description:
      "Our platform streamlines logistics operations, reducing administrative overhead and operational costs. By centralizing logistics activities and optimizing resource allocation, we help businesses operate more efficiently.",
  },
  {
    icon: <FaCheckCircle className="text-green-500" size={40} />,
    title: "Reliability",
    description:
      "With real-time tracking and optimized resource allocation, we ensure timely delivery and improved customer satisfaction. Our platform’s robust infrastructure guarantees reliability and performance, even under high demand.",
  },
  {
    icon: <FaLightbulb className="text-blue-500" size={40} />,
    title: "Innovation",
    description:
      "We leverage the latest technologies to continuously enhance our platform and stay ahead of industry trends. Our commitment to innovation ensures that our users benefit from the most advanced features and capabilities.",
  },
  {
    icon: <FaHeadset className="text-red-500" size={40} />,
    title: "Support",
    description:
      "Our dedicated support team is always available to assist with any questions or issues, ensuring a smooth user experience. We provide comprehensive support to help users get the most out of our platform.",
  },
];

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Visit our sign-up page and fill out the registration form. You will receive a confirmation email to verify your account.",
  },
  {
    question: "How can I post a transportation request?",
    answer:
      "Once logged in, navigate to the 'Post a Request' section, fill in the details of your transportation needs, and submit your request.",
  },
  {
    question: "How do I track my shipment?",
    answer:
      "Go to the 'Track Shipment' section, enter your tracking number, and you will see real-time updates on your shipment's location and status.",
  },
  {
    question: "What security measures are in place to protect my data?",
    answer:
      "We use advanced encryption, access controls, and regular security audits to ensure your data is protected and transactions are secure.",
  },
];

const testimonials = [
  {
    quote:
      "This platform has transformed our logistics operations. The real-time tracking and seamless communication tools have significantly improved our efficiency.",
    name: "Muhammad Haris Tariq",
    title: "Logistics CEO",
    image: `${h23}`,
  },
  
  
];

function About() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
    <NavbarComponent/>
      <div className="relative h-[600px] w-full">
        <img
          src="https://www.uberfreight.com/wp-content/uploads/2023/09/DRONE_CASTAIC_0001_R2-1.jpg"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-8 left-8  bg-opacity-50 p-4 rounded">
          <p className="text-white text-4xl font-bold">About Us</p>
        </div>
      </div>

      {/* welcome section */}
      <p className="text-center text-4xl font-bold p-4">Welcome</p>
      <p className="m-4 text-center">
        Our logistics platform is designed to revolutionize the way businesses
        manage their supply chain and transportation needs. By connecting
        shippers and carriers in a centralized marketplace, we offer a seamless,
        efficient, and transparent solution for all logistics operations. Our
        mission is to enhance the efficiency of logistics operations, reduce
        costs, and improve the overall customer experience.
      </p>

      {/* mission section */}

      <p className="text-center text-4xl font-bold p-4">Our Mission</p>
      <p className="m-4 text-center">
        We aim to simplify logistics operations by providing a comprehensive
        platform that streamlines communication, enhances visibility, and
        optimizes resource allocation. Leveraging advanced technologies such as
        real-time data analytics and artificial intelligence, we strive to
        create a more responsive and reliable logistics ecosystem.
      </p>

      {/* feature section */}

      <p className="m-4 font-bold text-4xl">Key Feature</p>
      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4 justify-items-center">
        {features.map((feature, index) => (
          <Card key={index} className="w-full h-full p-4">
            <h5 className="text-2xl font-bold mb-2">{feature.title}</h5>
            <p className="text-gray-700 dark:text-gray-400">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      {/* why choose us section */}

      <div className="py-12 px-4 bg-gray-100">
        <p className="m-4 font-bold text-4xl text-center">Why Choose Us</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {choose.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Faq]s Sestion */}
      <div className="py-12 px-4 bg-gray-100">
        <p className="m-4 font-bold text-4xl text-center">
          Frequently Asked Questions (FAQs)
        </p>
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left bg-white p-4 rounded-lg shadow-md focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-lg font-medium">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="py-12 px-4 bg-gray-100">
        <p className="m-4 font-bold text-4xl text-center">
          Customer Testimonials
        </p>
        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto w-80">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="italic text-gray-600 text-center mb-4">
                "{testimonial.quote}"
              </p>
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterComponent/>
    </>
  );
}

export default About;
