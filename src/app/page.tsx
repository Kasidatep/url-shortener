'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockClosedIcon, CalendarIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customShortId, setCustomShortId] = useState('');
  const [password, setPassword] = useState('');
  const [expirationType, setExpirationType] = useState<'none' | 'clicks' | 'datetime'>('none');
  const [passwordType, setPasswordType] = useState<'none' | 'lock'>('none')
  const [maxClicks, setMaxClicks] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [errorCode, setErrorCode] = useState(0)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error('URL is required');
      return;
    }

    if (expirationType === 'clicks' && !maxClicks) {
      toast.error('Max clicks is required');
      return;
    }

    if (expirationType === 'datetime' && !expirationDate) {
      toast.error('Expiration date/time is required');
      return;
    }

   
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        customShortId,
        password,
        expirationType,
        maxClicks,
        expirationDate,
      }),
    });

    const data = await response.json();
    if(response.ok){
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
    }else{
      toast.error(data.message);
      if(data.code == '400100'){
        setCustomShortId('')
        
      }
    }
  
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className=" text-sm font-medium text-gray-700 flex items-center">
              Enter URL
              <button
                data-tooltip-id="url-tooltip"
                data-tooltip-content="Enter the full URL you want to shorten."
                className="ml-2 text-gray-400 hover:text-gray-500"
              >
                <InformationCircleIcon className="h-5 w-5" />
              </button>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Tooltip id="url-tooltip" />
          </div>

          {/* Advanced Options Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </button>

          {/* Advanced Options */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label className=" text-sm font-medium text-gray-700 flex items-center">
                    Custom Short ID
                    <button
                      data-tooltip-id="custom-id-tooltip"
                      data-tooltip-content="Enter a custom short ID for your URL."
                      className="ml-2 text-gray-400 hover:text-gray-500"
                    >
                      <InformationCircleIcon className="h-5 w-5" />
                    </button>
                  </label>
                  <input
                    type="text"
                    value={customShortId}
                    onChange={(e) => setCustomShortId(e.target.value)}
                    placeholder="my-custom-id"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Tooltip id="custom-id-tooltip" />
                </div>

                {/* Password Protection */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 flex items-center">
                    <LockClosedIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Password Protection
                  </label>
                  <div className="mt-1 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordType('none')
                        setPassword('')

                      }}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                        !password
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No Password
                    </button>
                    <button
                      type="button"
                      onClick={() =>{
                        setPasswordType('lock')
                      }}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                        password
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Password Lock
                    </button>
                  </div>
                </div>

                {/* Password Input (Conditional) */}
                {passwordType === 'lock' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </motion.div>
                )}

                {/* Expiration */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Expiration
                  </label>
                  <div className="mt-1 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setExpirationType('none')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                        expirationType === 'none'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No Expiration
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpirationType('clicks')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                        expirationType === 'clicks'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      After Clicks
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpirationType('datetime')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                        expirationType === 'datetime'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Date/Time
                    </button>
                  </div>
                </div>

                {/* Expiration Inputs (Conditional) */}
                {expirationType === 'clicks' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Max Clicks</label>
                    <input
                      type="number"
                      value={maxClicks}
                      onChange={(e) => setMaxClicks(e.target.value)}
                      placeholder="e.g., 10"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </motion.div>
                )}

                {expirationType === 'datetime' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">Expiration Date/Time</label>
                    <input
                      type="datetime-local"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />

    </div>
  );
}