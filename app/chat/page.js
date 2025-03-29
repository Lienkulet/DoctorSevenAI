'use client';

import ChatSection from "@/components/Chat";
import ReportSection from "@/components/Report";
import { useState } from "react";

const page = () => {
    const [summary, setSummary] = useState(''); 
    return (
        <section className="app-container">
          <ReportSection summary={summary} setSummary={setSummary} />
          <ChatSection summary={summary} />
        </section>
      );
}

export default page