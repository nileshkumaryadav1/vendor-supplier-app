"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [enrolledEvent, setEnrolledEvent] = useState(null);
  const [students, setStudents] = useState([]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* <h1 className="text-3xl font-bold">{event?.title}</h1> */}

      {/* Event Info */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4"> Details</h2>
      </section>
    </div>
  );
}
