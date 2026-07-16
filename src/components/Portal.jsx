import React, { useState, useEffect } from 'react';

const Portal = ({ 
  isOpen, 
  onClose, 
  user, 
  isAdmin, 
  view, 
  onViewChange, 
  onLogout,
  myTeam,
  setMyTeam,
  projectSubmitted,
  setProjectSubmitted,
  announcements,
  onPostAnnouncement,
  showToast
}) => {
  const [activeView, setActiveView] = useState(view || 'overview');
  const [teamName, setTeamName] = useState('');
  const [teamTrack, setTeamTrack] = useState('Air Quality Monitoring');
  const [joinCode, setJoinCode] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectStack, setProjectStack] = useState('');
  const [projectDemo, setProjectDemo] = useState('');
  const [annTitle, setAnnTitle] = useState('');
  const [annBody, setAnnBody] = useState('');

  useEffect(() => {
    if (view) {
      setActiveView(view);
    }
  }, [view]);

  const handleViewChange = (newView) => {
    setActiveView(newView);
    onViewChange(newView);
  };

  const createTeam = () => {
    if (!teamName.trim()) {
      showToast('Give your team a name');
      return;
    }
    setMyTeam({
      name: teamName,
      track: teamTrack,
      code: 'TS-' + Math.floor(1000 + Math.random() * 8999),
      members: [user?.name || 'You']
    });
    showToast('Team "' + teamName + '" created');
    setTeamName('');
  };

  const joinTeam = () => {
    if (!joinCode.trim()) {
      showToast('Enter an invite code');
      return;
    }
    setMyTeam({
      name: 'Team ' + joinCode,
      track: 'Air Quality Monitoring',
      code: joinCode,
      members: ['Alex M.', 'Brian K.', user?.name || 'You']
    });
    showToast('Joined team via ' + joinCode);
    setJoinCode('');
  };

  const leaveTeam = () => {
    setMyTeam(null);
    showToast('You left the team');
  };

  const submitProject = () => {
    if (!projectTitle.trim()) {
      showToast('Add a project title');
      return;
    }
    setProjectSubmitted(true);
    showToast('Project submitted');
  };

  const postAnnouncement = () => {
    if (!annTitle.trim()) {
      showToast('Add a title first');
      return;
    }
    onPostAnnouncement({
      t: annTitle,
      b: annBody || '—',
      badge: 'Admin',
      time: 'just now'
    });
    setAnnTitle('');
    setAnnBody('');
    showToast('Announcement published');
  };

  if (!isOpen) return null;

  return (
    <div id="portal" className="open">
      <div className="portal-shell">
        <aside className="portal-nav">
          <button 
            className={activeView === 'overview' ? 'active' : ''} 
            onClick={() => handleViewChange('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={activeView === 'profile' ? 'active' : ''} 
            onClick={() => handleViewChange('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={activeView === 'team' ? 'active' : ''} 
            onClick={() => handleViewChange('team')}
          >
            👥 My Team
          </button>
          <button 
            className={activeView === 'projects' ? 'active' : ''} 
            onClick={() => handleViewChange('projects')}
          >
            🚀 Project Submission
          </button>
          <button 
            className={activeView === 'leaderboard' ? 'active' : ''} 
            onClick={() => handleViewChange('leaderboard')}
          >
            🏆 Leaderboard
          </button>
          <button 
            className={activeView === 'certificate' ? 'active' : ''} 
            onClick={() => handleViewChange('certificate')}
          >
            🎓 Certificate
          </button>
          {isAdmin && (
            <button 
              className={activeView === 'admin' ? 'active' : ''} 
              onClick={() => handleViewChange('admin')}
            >
              🛠️ Admin Panel
            </button>
          )}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: '14px', paddingTop: '14px' }}>
            <button onClick={onLogout} style={{ color: '#c23f3f' }}>↩ Log out</button>
          </div>
        </aside>
        <main className="portal-main">
          {/* Overview View */}
          {activeView === 'overview' && (
            <div className="pview active">
              <h2 style={{ marginBottom: '4px' }}>Welcome back, <span id="ovName">{user?.name || 'Participant'}</span> 👋</h2>
              <p style={{ opacity: 0.65, fontSize: '14px', marginBottom: '26px' }}>
                Here's where TechSavanna Hack 1.0 stands for you right now.
              </p>
              <div className="grid4" style={{ marginBottom: '30px' }}>
                <div className="stat-card">
                  <b id="cd-days2">--</b>
                  <span>Days to event</span>
                </div>
                <div className="stat-card">
                  <b>{myTeam ? myTeam.name : 'No team'}</b>
                  <span>Team status</span>
                </div>
                <div className="stat-card">
                  <b>{projectSubmitted ? 'Submitted' : 'Not submitted'}</b>
                  <span>Project status</span>
                </div>
                <div className="stat-card">
                  <b>{myTeam ? '#' + (Math.floor(Math.random() * 6) + 1) : '—'}</b>
                  <span>Leaderboard rank</span>
                </div>
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Latest announcements</h3>
              <div id="ovAnnList">
                {announcements.slice(0, 2).map((a, i) => (
                  <div className="ann-item" key={i}>
                    <span className="ann-badge">{a.badge}</span>
                    <div>
                      <h4>{a.t}</h4>
                      <p>{a.b}</p>
                    </div>
                    <span className="t">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team View */}
          {activeView === 'team' && (
            <div className="pview active">
              <h2 style={{ marginBottom: '6px' }}>My team</h2>
              <p style={{ opacity: 0.65, fontSize: '14px', marginBottom: '22px' }}>
                Create a team, or browse open teams matched to your skills.
              </p>
              {!myTeam ? (
                <div id="noTeamView">
                  <div className="grid2" style={{ marginBottom: '30px' }}>
                    <div className="panel">
                      <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Create a team</h3>
                      <div className="field">
                        <label>Team name</label>
                        <input 
                          placeholder="e.g. Pulse Sensors" 
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Track</label>
                        <select 
                          value={teamTrack}
                          onChange={(e) => setTeamTrack(e.target.value)}
                        >
                          <option>Air Quality Monitoring</option>
                          <option>Water Safety</option>
                          <option>Personal Health</option>
                        </select>
                      </div>
                      <button className="btn btn-primary btn-block" onClick={createTeam}>
                        Create team
                      </button>
                    </div>
                    <div className="panel">
                      <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Join with invite code</h3>
                      <div className="field">
                        <label>Invite code</label>
                        <input 
                          placeholder="e.g. TS-4821"
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                        />
                      </div>
                      <button className="btn btn-ghost btn-block" onClick={joinTeam}>
                        Join team
                      </button>
                      <p className="helper">Or browse skill‑matched teams below and request to join.</p>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Suggested teams (skill‑matched)</h3>
                  <div id="suggestedTeams">
                    <div className="ann-item" style={{ alignItems: 'center' }}>
                      <div>
                        <h4>AeroGuard <span className="badge badge-green">Air Quality Monitoring</span></h4>
                        <p>3 members · looking for ML / Data Science</p>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showToast('Request sent to AeroGuard')}>
                        Request to join
                      </button>
                    </div>
                    <div className="ann-item" style={{ alignItems: 'center' }}>
                      <div>
                        <h4>RiverEye <span className="badge badge-green">Water Safety</span></h4>
                        <p>2 members · looking for IoT Hardware</p>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showToast('Request sent to RiverEye')}>
                        Request to join
                      </button>
                    </div>
                    <div className="ann-item" style={{ alignItems: 'center' }}>
                      <div>
                        <h4>VitaTrack <span className="badge badge-green">Personal Health</span></h4>
                        <p>4 members · looking for Frontend / UI</p>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showToast('Request sent to VitaTrack')}>
                        Request to join
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="hasTeamView">
                  <div className="panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h3 id="myTeamName" style={{ fontSize: '18px' }}>{myTeam.name}</h3>
                        <span className="badge badge-green">{myTeam.track}</span>
                      </div>
                      <span className="mono" style={{ fontSize: '12px', opacity: 0.6 }}>
                        Invite code: <b>{myTeam.code}</b>
                      </span>
                    </div>
                    <h4 style={{ fontSize: '13px', opacity: 0.7, margin: '18px 0 10px' }}>MEMBERS</h4>
                    <div id="myTeamMembers">
                      {myTeam.members.map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
                          <div className="mentor-avatar" style={{ width: '34px', height: '34px', fontSize: '12px', background: 'var(--accent)' }}>
                            {m.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span style={{ fontSize: '13.5px' }}>{m}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ marginTop: '16px' }} onClick={leaveTeam}>
                      Leave team
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Projects View */}
          {activeView === 'projects' && (
            <div className="pview active">
              <h2 style={{ marginBottom: '6px' }}>Project submission</h2>
              <p style={{ opacity: 0.65, fontSize: '14px', marginBottom: '22px' }}>
                Submit once your team is finalized. You can update this until the Day 3 deadline.
              </p>
              <div className="panel" style={{ maxWidth: '640px' }}>
                <div className="field">
                  <label>Project title</label>
                  <input 
                    placeholder="e.g. AeroGuard — Smart Air Quality Alerts"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Track</label>
                  <select>
                    <option>Air Quality Monitoring</option>
                    <option>Water Safety</option>
                    <option>Personal Health</option>
                  </select>
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea 
                    rows="4" 
                    placeholder="What problem does it solve, and how?"
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Tech stack</label>
                    <input 
                      placeholder="React, Node.js, ESP32, TensorFlow Lite"
                      value={projectStack}
                      onChange={(e) => setProjectStack(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Demo link</label>
                    <input 
                      placeholder="https://..."
                      value={projectDemo}
                      onChange={(e) => setProjectDemo(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={submitProject}>Submit project</button>
                <p className="helper" id="projStatusText">
                  {projectSubmitted ? 'Submitted ✓ — you can update until the deadline.' : 'No submission yet.'}
                </p>
              </div>
            </div>
          )}

          {/* Admin View */}
          {activeView === 'admin' && isAdmin && (
            <div className="pview active">
              <h2 style={{ marginBottom: '6px' }}>Admin panel</h2>
              <p style={{ opacity: 0.65, fontSize: '14px', marginBottom: '22px' }}>
                Manage announcements and monitor overall participation.
              </p>
              <div className="grid4" style={{ marginBottom: '30px' }}>
                <div className="stat-card"><b>128</b><span>Participants</span></div>
                <div className="stat-card"><b>34</b><span>Teams formed</span></div>
                <div className="stat-card"><b>21</b><span>Projects submitted</span></div>
                <div className="stat-card"><b>9</b><span>Judges active</span></div>
              </div>
              <div className="panel" style={{ marginBottom: '26px' }}>
                <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Post an announcement</h3>
                <div className="field">
                  <label>Title</label>
                  <input 
                    placeholder="e.g. Lunch is served in Hall B"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea 
                    rows="2" 
                    placeholder="Details for participants..."
                    value={annBody}
                    onChange={(e) => setAnnBody(e.target.value)}
                  ></textarea>
                </div>
                <button className="btn btn-primary btn-sm" onClick={postAnnouncement}>Publish</button>
              </div>
              <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Registered teams</h3>
              <div className="panel" style={{ padding: '0', overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Team</th>
                      <th>Track</th>
                      <th>Members</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>AeroGuard</strong></td><td>Air Quality</td><td>3</td><td><span className="badge badge-green">Submitted</span></td></tr>
                    <tr><td><strong>HydroWatch</strong></td><td>Water Safety</td><td>4</td><td><span className="badge badge-green">Submitted</span></td></tr>
                    <tr><td><strong>PulseNet</strong></td><td>Personal Health</td><td>2</td><td><span className="badge badge-amber">Building</span></td></tr>
                    <tr><td><strong>CleanBreeze</strong></td><td>Air Quality</td><td>3</td><td><span className="badge badge-green">Submitted</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Portal;
