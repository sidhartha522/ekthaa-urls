import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const linkInfoData = {
  'ekthaa-business': {
    title: 'Ekthaa Business',
     description: `Ekthaa Business helps customers near you discover your store. When customers search for a product on Ekthaa AI or Google, your business can show up. You get a shareable business page with your location, products, offers, and social links. It also works as an all-in-one business app to manage credits, invoices, offers, products, and stock.\n\n1. Get discovered by nearby customers (for service businesses too)\nMany service-based businesses struggle to get discovered nearby.\nExample:\nMaybe you own a catering service, interior design business, event decoration, or any other service.\nIt’s hard for nearby customers to find you.\nGoogle Maps doesn’t always show:\n* Your prices\n* Your services clearly\n* How to contact you easily\nWith Ekthaa, people near you can:\n* Discover your business\n* See what services you offer\n* Check prices (if you add them)\n* View your location and contact you directly\n\n2. Product-focused discovery (exact product matters)\nPeople don’t always search for shops — they search for specific products.\nExample:\nMaybe you sell an imported table, sofa, or a specific furniture design.\nWhen customers search using Google Lens, it often shows:\n* A business in another state\n* Or even another country\nBut if you list your product on Ekthaa Business,\nyour business details are shown to them, because you sell that exact product nearby.\nThis helps customers buy locally instead of far away.\n\n3. Accept orders directly from customers\nMany customers overpay just because they don’t know local prices.\nExample:\nYou sell millets for ₹60/kg in your kirana shop.\nCustomers search online or on quick-commerce apps and end up paying much more.\nWith Ekthaa AI:\n* Customers search for the product\n* They see your shop\n* They can place an order directly\nYou receive a WhatsApp message with what they want.\nYou can:\n* Deliver it yourself\n* Or ask them to pick it up\nYou can also:\n* Set minimum order value\n* Set delivery distance\n* Talk to the customer directly\nNo middleman.\n\n4. Shareable business page (mini website)\nEkthaa gives you a single business page link.\nThis page includes:\n* Your business name\n* Location\n* Products or services\n* Offers\n* Contact details\n* Social media links\nYou can share this link on:\n* WhatsApp\n* Instagram bio\n* Google Business\n* Anywhere online\nIt works like your mini website, without building one.\n\n5. Manage customer credits (with customer access)\nCredits often get confusing.\nExample:\nRecurring bills, monthly customers, or even rents are:\n* Written in notebooks\n* Forgotten\n* Miscalculated\nWith Ekthaa Business, you can add credits digitally.\nBest part:\nIn the Ekthaa AI app, customers can also access their credit account.\nIf you trust a customer and you’re busy:\n* You can give them access\n* They can add credits themselves\n* Upload bill photos\nThe credit screen works like a chat, similar to PhonePe or WhatsApp:\n* You both see the balance\n* Previous entries\n* You can send reminders easily\nNo confusion, no arguments.\n\n6. Create invoices easily\nYou can generate invoices directly from the app.\nExample:\nCustomer buys multiple items → you create an invoice → share it instantly on WhatsApp.\nThis looks professional and helps maintain records.\n\n7. Run offers and clearance sales (reach the right people)\nYou might already be running offers.\nExample:\n* Clearance sale on clothes\n* Discount on furniture\n* Seasonal offers\nYou might spend lakhs on marketing, but:\n* Does it reach nearby customers?\n* Does it reach people searching right now?\nIf someone searches “clearance sale near me” on Google,\nyour business may not show up.\nIn Ekthaa AI:\n* There is a dedicated Offers section\n* Customers nearby can see offers around them\n* Customers can even ask Ekthaa AI and get your offer details\nYour offer reaches people who are actually looking to buy.\n\n8. Manage inventory easily\nYou can track what products you have.\nExample:\nIf stock is running low, you’ll know in advance.\nThis helps you:\n* Avoid out-of-stock issues\n* Plan purchases better\n* Manage your shop smoothly\n\n9. Add social media (videos build trust)\nYou can add:\n* Instagram reels\n* Shorts\n* YouTube videos\nWhen customers open your business profile:\n* They can watch your videos\n* See your products in action\n* Trust your business more\nThis business profile can be shared as your mini website.\n\n10. Conclusion\nEkthaa Business is built for local businesses.\nIt helps you:\n* Get discovered\n* Show your products or services\n* Accept orders\n* Manage credits\n* Run offers\n* Track inventory\n* And grow — all from one app\nNo technical knowledge needed.`
  },
  'student-stall': {
    title: 'Student Stall Application (Play & Win)',
    description: `Run a Play & Win stall at your college fest and engage students through fun games. All gifts and rewards will be provided by our brand sponsors—you just manage the stall.`
  },
  'internships': {
    title: 'Internships at Ekthaa',
    description: `Ekthaa offers unpaid internships where you'll work directly with the founding team on real, production-level tasks. Apply only if you have extraordinary skills or deep passion for startups and want real startup exposure.`
  },
  'ekthaa-ai': {
    title: 'Ekthaa AI',
    description: `Find the best deals, products, and businesses around you in seconds—by talking to AI. Personalized, local, and intelligent discovery built for students and local businesses.`
  },
  'builder-community': {
    title: 'Business & Builder Community',
    description: `A community for business owners, founders, and builders to connect, learn, and grow together. Share insights, explore collaborations, and build real things - not just talk. We also conduct a Business & Builder Walk at LB Nagar Circle every weekend 🚶‍♂️🤝`
  },
  'student-community': {
    title: 'Ekthaa Student Community',
    description: `A community for students to learn, explore opportunities, and build together. Internships, events, startup exposure, freelance gigs, paid opportunities, and real-world learning beyond college.`
  }
};

const LinkInfo = () => {
  const { link } = useParams();
  const navigate = useNavigate();
  const info = linkInfoData[link];

  useEffect(() => {
    if (link === 'ekthaa-business') {
      navigate('/ekthaa-business-details');
    }
    if (link === 'student-stall') {
      navigate('/student-stall-details');
    }
  }, [link, navigate]);

  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-beige px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Not Found</h1>
        <Link to="/" className="text-brand-teal underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-beige px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6 text-center">{info.title}</h1>
      <p className="text-gray-700 text-lg text-center max-w-2xl mb-8">{info.description}</p>
      <Link to="/" className="bg-brand-teal text-white px-8 py-3 rounded-xl font-bold text-lg text-center hover:bg-teal-600 transition shadow-lg">Back to Home</Link>
    </div>
  );
};

export default LinkInfo;
