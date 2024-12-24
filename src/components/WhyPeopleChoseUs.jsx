import React from 'react';
import svg from '../assets/undraw_order-confirmed_m9e9.svg';

const WhyPeopleChoseUs = () => {
  const features = [
    {
      id: 1,
      title: '30,000 Restaurants Menus',
      description: 'We’re working with many restaurants in your city to put food all in one place.',
    },
    {
      id: 2,
      title: 'Easy Ordering by Phone',
      description: 'This allows you to order quickly and easily. Accessible at any time.',
    },
    {
      id: 3,
      title: 'Free Mobile Application',
      description: 'Mobile App allows you to choose restaurants, view prices, and check orders.',
    },
    {
      id: 4,
      title: 'Easy Online Ordering',
      description: 'Once logged in, you can easily navigate around the site to complete your order.',
    },
    {
      id: 5,
      title: '100% Positive Feedbacks',
      description: 'We care about our customers, which is why we get 100% positive feedbacks.',
    },
    {
      id: 6,
      title: 'Fast Guaranteed Delivery',
      description: 'We take responsibility for ensuring that orders are delivered to you safely.',
    },
  ];

  return (
    <div className="bg-light-card dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary px-6 py-12 lg:px-20">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4">
        WHY PEOPLE CHOOSE US
      </h2>
      <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-12">
        Clients’ Most Popular Choice
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
        {/* Left column */}
        <div className="space-y-8 lg:w-1/3">
          {features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="flex items-start justify-end gap-4">
              <div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {feature.description}
                </p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-light-card dark:bg-dark-card">
                <span className="text-lg font-bold">{feature.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="relative">
          <img
            src={svg}
            alt="Order Confirmed"
            className="w-60 lg:w-80 mx-auto"
          />
          <div className="absolute top-0 right-0 w-60 h-96 -z-10 rounded-full bg-gradient-to-br from-light-primary to-light-accent opacity-10"></div>
        </div>

        {/* Right column */}
        <div className="space-y-8 lg:w-1/3">
          {features.slice(3).map((feature) => (
            <div key={feature.id} className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-light-card dark:bg-dark-card">
                <span className="text-lg font-bold">{feature.id}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyPeopleChoseUs;
