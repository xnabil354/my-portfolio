// ./pages/adblock.tsx

import Head from 'next/head';
import { useEffect, useState } from 'react';

const AdBlockPage = () => {
    const [adBlockDetected, setAdBlockDetected] = useState(false);

    useEffect(() => {
        const checkAdBlock = () => {
            const ad = document.createElement('div');
            ad.className = 'ad';
            document.body.appendChild(ad);
            setTimeout(() => {
                if (ad.offsetHeight === 0) {
                    setAdBlockDetected(true);
                }
                document.body.removeChild(ad);
            }, 100);
        };
        checkAdBlock();
    }, []);

    const handleDisableAdBlocker = () => {
        const ad = document.createElement('div');
        ad.className = 'ad';
        document.body.appendChild(ad);
        setTimeout(() => {
            if (ad.offsetHeight === 0) {
                window.location.href = '/adblock-disabled';
            }
            document.body.removeChild(ad);
        }, 100);
    };

    return (
        <>
            <Head>
                <title>AdBlock Detection - My AdBlock Site</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-md">
                    {adBlockDetected ? (
                        <>
                            <h1 className="text-xl font-bold mb-4">AdBlock Detected</h1>
                            <p className="text-gray-600">
                                It looks like you have an AdBlocker enabled. Please disable it
                                to continue using our site. We rely on advertisements to keep
                                our site running and provide you with quality content.
                            </p>
                            <button
                                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                onClick={handleDisableAdBlocker}
                            >
                                Disable AdBlocker
                            </button>
                        </>
                    ) : (
                        <p className="text-lg font-medium">Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdBlockPage;
