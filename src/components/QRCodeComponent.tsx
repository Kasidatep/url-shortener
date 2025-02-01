import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRCodeComponent = ({ shortUrl }: { shortUrl: string }) => {
  const qrCodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (!qrCodeCanvasRef.current) {
      toast.error('QR Code not available for download.');
      return;
    }

    try {
      setIsLoading(true);
      const pngUrl = qrCodeCanvasRef.current
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success('QR Code downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download QR Code.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center pt-4"
          >
            <div className="p-2 bg-white rounded-lg">
              <QRCodeCanvas
                value={shortUrl}
                size={256}
                level="H"
                includeMargin={true}
                ref={qrCodeCanvasRef}
              />
            </div>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download QR Code"
            >
              {isLoading ? 'Downloading...' : 'Download QR Code'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default QRCodeComponent;