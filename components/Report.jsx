import { compressImage } from '@/utils/ImageCompressor';
import { useState } from 'react';

const ReportSection = ({ summary, setSummary }) => {
  const [base64Data, setBase64Data] = useState(''); // Store base64 string
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    const validImages = ['image/jpeg', 'image/png', 'image/webp'];
    const validDocs = ['application/pdf'];
    const isValidImage = validImages.includes(file.type);
    const isValidDoc = validDocs.includes(file.type);

    if (!(isValidImage || isValidDoc)) {
      console.error('Filetype not supported!');
      return;
    }

    if (isValidImage) {
      compressImage(file, (compressedFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setBase64Data(base64String);
        };
        reader.readAsDataURL(compressedFile);
      });
    }

    if (isValidDoc) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64Data(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSummarize = async () => {
    if (!base64Data) {
      console.error('Upload a valid report!');
      return;
    }

    setIsSummarizing(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: base64Data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const summaryText = await response.text();
      console.log(summaryText);
      setSummary(summaryText);
    } catch (error) {
      console.error('Summarize error:', error);
      setSummary(`Error: ${error.message}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Medical Report Analysis</h2>
      <div className="file-form">
        {isSummarizing && (
          <div className="absolute z-10 h-full w-full bg-gray-100/90 rounded-lg flex items-center justify-center">
            Summarizing...
          </div>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          disabled={isSummarizing}
        />
        <button
          onClick={handleSummarize}
          className="button"
          disabled={!base64Data || isSummarizing}
        >
          Summarize Report
        </button>
      </div>
      <div className="summary-section">
        <h3 className="summary-title">Summary</h3>
        {isSummarizing ? (
          <div className="loading">Summarizing...</div>
        ) : summary ? (
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary of the report will appear here..."
            className='summary-text'
            />
        ) : (
          <p className="summary-placeholder">Upload a report to see its summary.</p>
        )}
      </div>
    </div>
  );
};

export default ReportSection;