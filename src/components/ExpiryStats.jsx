import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Check, 
  AlertOctagon, 
  Info 
} from 'lucide-react';
import CountUp from 'react-countup';

const ExpiryStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    expired: 0,
    nearlyExpired: 0,
    safe: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://freshrackserver.vercel.app/api/foods/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Items',
      value: stats.total,
      icon: Info,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Safe Items',
      value: stats.safe,
      icon: Check,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Nearly Expired',
      value: stats.nearlyExpired,
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      title: 'Expired Items',
      value: stats.expired,
      icon: AlertOctagon,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Expiry Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className={`flex items-center gap-4 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${stat.color}`}
            >
              <stat.icon className="w-10 h-10" />
              <div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-3xl font-bold">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=",">
                    {({ countUpRef }) => (
                      <span ref={countUpRef} />
                    )}
                  </CountUp>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpiryStats;
