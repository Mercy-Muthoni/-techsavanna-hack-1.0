import React, { useState } from 'react';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  const dayData = {
    1: {
      events: [
        { time: '08:00', title: 'Check‑in & Badge Pickup', desc: 'Registration, welcome pack, sensor kits issued.' },
        { time: '09:30', title: 'Opening Ceremony', desc: 'Theme briefing, judging criteria, track deep‑dives.' },
        { time: '11:00', title: 'Team Formation & Ideation', desc: 'Skill‑matching board opens; pitch your idea, find teammates.' },
        { time: '13:00', title: 'Lunch + Mentor Speed Rounds', desc: '15‑minute mentor slots across all three tracks.' },
        { time: '15:00', title: 'Build Begins', desc: 'Hardware lab and API sandboxes open.' }
      ]
    },
    2: {
      events: [
        { time: '08:00', title: 'Breakfast & Standups', desc: 'Each team reports progress to their mentor.' },
        { time: '10:00', title: 'Deep Build Block', desc: 'Sensor integration, model training, dashboarding.' },
        { time: '14:00', title: 'Midpoint Checkpoint', desc: 'Optional demo to mentors for early feedback.' },
        { time: '19:00', title: 'Night Build + Snacks', desc: 'Quiet hours from 00:00; overnight workspace stays open.' }
      ]
    },
    3: {
      events: [
        { time: '08:00', title: 'Final Sprint', desc: 'Last fixes, demo rehearsal, submission prep.' },
        { time: '12:00', title: 'Project Submission Deadline', desc: 'Upload repo, demo link and pitch deck on the portal.' },
        { time: '13:30', title: 'Judging & Demos', desc: 'Live demos to judging panel, track by track.' },
        { time: '17:00', title: 'Awards & Closing Ceremony', desc: 'Leaderboard reveal, prizes and certificates.' }
      ]
    }
  };

  return (
    <section id="schedule">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Schedule</span>
          <h2>Three days, one build window</h2>
          <p>A detailed agenda for the full in‑person event.</p>
        </div>
        <div className="day-tabs reveal">
          {[1, 2, 3].map((dayNumber) => (
            <button 
              key={dayNumber}
              className={`day-tab ${activeDay === dayNumber ? 'active' : ''}`}
              onClick={() => setActiveDay(dayNumber)}
            >
              Day {dayNumber} · {['Ignite', 'Build', 'Ship'][dayNumber - 1]}
            </button>
          ))}
        </div>
        <div className="timeline reveal">
          <div className="day-panel active">
            {dayData[activeDay].events.map((event, index) => (
              <div className="tline-item" key={index}>
                <span className="time">{event.time}</span>
                <div>
                  <h4>{event.title}</h4>
                  <p>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
