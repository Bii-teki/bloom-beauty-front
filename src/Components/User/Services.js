import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Services = () => {
  const services = [
    {
      title: 'Facial Treatments',
      description: 'Revitalize your skin with our expert facial treatments. Achieve a healthy and radiant complexion.',
      icon: 'fas fa-spa',
    },
    {
      title: 'Hair Styling',
      description: 'Transform your look with our professional hair styling services. From cuts to colors, we do it all.',
      icon: 'fas fa-cut',
    },
    {
      title: 'Nail Care',
      description: 'Pamper your hands and feet with our nail care services. We offer manicures, pedicures, and nail art.',
      icon: 'fas fa-hand-holding-heart',
    },
    {
      title: 'Makeup Artistry',
      description: 'Get ready for any occasion with our makeup artists. We\'ll enhance your natural beauty with our makeup skills.',
      icon: 'fas fa-magic',
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto text-center text-black">
        <h2 className="text-4xl font-semibold mb-4">Our Products</h2>
        <Carousel showStatus={false} showThumbs={false} infiniteLoop autoPlay interval={4000}>
          {services.map((service, index) => (
            <div key={index} className="p-4 ">
              <i className={`${service.icon} text-4xl mb-4`} />
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-lg">{service.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Services;
