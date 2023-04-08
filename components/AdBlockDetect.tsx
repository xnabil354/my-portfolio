import { useState, useEffect } from "react";

const AdblockDetect = () => {
    const [adBlockDetected, setAdBlockDetected] = useState(false);

    useEffect(() => {
        const ad = document.createElement("ins");
        ad.className = "adsbygoogle";
        ad.style.display = "none";
        document.body.appendChild(ad);

        const adBlockEnabled = !ad.offsetHeight;
        document.body.removeChild(ad);

        setAdBlockDetected(adBlockEnabled);
    }, []);

    if (adBlockDetected) {
        return (
            <div className="bg-red-500 text-white p-4">
                Please disable your ad blocker to support our website.
            </div>
        );
    } else {
        return null;
    }
};

export default AdblockDetect;
