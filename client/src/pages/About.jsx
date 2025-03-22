import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">About</span>
              <span className="block text-green-600 dark:text-green-500">HomeStock</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your smart home inventory management solution
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Mission
              </p>
            </div>
          </div>
          <div className="relative">
            <svg className="hidden md:block absolute top-0 right-0 -mt-20 -mr-20" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="95e8f2de-6d30-4b7e-8159-f791729db21b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200 dark:text-gray-700" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)" />
            </svg>
            <svg className="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="7a00fe67-0343-4a3c-8e81-c145097a3ce0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200 dark:text-gray-700" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)" />
            </svg>
            <div className="relative md:bg-white dark:md:bg-gray-900 md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                <div className="prose prose-lg text-gray-500 dark:text-gray-400 lg:max-w-none">
                  <p className="text-lg">
                    Welcome to HomeStock, your smart home inventory management solution! HomeStock is designed to help you efficiently track, manage, and organize household essentials with ease.
                  </p>
                  <p className="text-lg mt-4">
                    Our platform features an intuitive inventory management system, automated shopping list recommendations based on stock levels, and seamless expense tracking.
                  </p>
                  <p className="text-lg mt-4">
                    A standout feature is our advanced grocery receipt scanning, which allows users to quickly update inventory by simply scanning receipts. With HomeStock, managing your home essentials has never been easier—save time, reduce waste, and stay organized effortlessly!
                  </p>
                </div>
                <div className="mt-6 prose prose-lg text-gray-500 dark:text-gray-400 lg:mt-0">
                  <p className="text-lg">
                    Our team is passionate about helping households run more efficiently. We understand the challenges of modern life and have built HomeStock to address the common pain points of home management.
                  </p>
                  <p className="text-lg mt-4">
                    Whether you're a busy parent, a professional with limited time, or someone who simply values organization, HomeStock is designed with you in mind.
                  </p>
                  <p className="text-lg mt-4">
                    We're constantly improving our platform based on user feedback and emerging technologies to provide you with the best possible experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white">Meet Our Team</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Passionate individuals dedicated to making home management easier for everyone.
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 md:grid-cols-4 lg:max-w-7xl">
              {/* Team Member 1 */}
              <li className="group">
                <div className="space-y-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-gray-900 dark:text-white">Osindu Vimukthi</h3>
                      <p className="text-green-600 dark:text-green-400">Grocery Reciept Scanning - Unique Feature</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-base">
                        I am a dedicated and passionate individual with a strong commitment to excellence. I am committed to continuous learning and growth, always seeking new opportunities to expand my knowledge and skills.
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              {/* Team Member 2 */}
              <li className="group">
                <div className="space-y-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-gray-900 dark:text-white">Yumeth Ransana</h3>
                      <p className="text-green-600 dark:text-green-400">Grocery List and Expenses Management</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-base">
                        I am responsible for managing the grocery list and expenses, ensuring that our household stays on track with its financial goals.
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              {/* Team Member 3 */}
              <li className="group">
                <div className="space-y-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-gray-900 dark:text-white">Thilan Hasitha</h3>
                      <p className="text-green-600 dark:text-green-400">Inventory Management</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-base">
                        I am responsible for managing the inventory, ensuring that we have the right products in stock and that they are properly stored and organized.
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              {/* Team Member 4 */}
              <li className="group">
                <div className="space-y-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-gray-900 dark:text-white">Ravindu Eshan</h3>
                      <p className="text-green-600 dark:text-green-400">User Profile Management</p>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-base">
                        I am responsible for managing user profiles, ensuring that our users have a personalized experience and that their data is secure and private.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Values</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              The principles that guide everything we do at HomeStock.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {/* Value 1 */}
            <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Efficiency</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                We believe in creating tools that save time and reduce stress in everyday life.
              </dd>
            </div>

            {/* Value 2 */}
            <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Security</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                Your data privacy and security are paramount in everything we build.
              </dd>
            </div>

                        {/* Value 3 */}
                        <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a2.5 2.5 0 015 0v6a2.5 2.5 0 01-5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Innovation</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                We continuously explore new technologies to improve home management.
              </dd>
            </div>

            {/* Value 4 */}
            <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Simplicity</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                We believe in straightforward solutions that anyone can use without a learning curve.
              </dd>
            </div>

            {/* Value 5 */}
            <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Community</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                We're building a community of organized households sharing tips and best practices.
              </dd>
            </div>

            {/* Value 6 */}
            <div className="relative group">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Sustainability</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                We help reduce waste by ensuring you know what you have and only buy what you need.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Have questions?</span>
            <span className="block text-green-200">We'd love to hear from you.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Contact Us
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
