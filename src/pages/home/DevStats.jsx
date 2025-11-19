import React, { useState, useEffect } from 'react';
// import '../scripts/waka_hours.js'; // 1. REMOVED: We'll add this logic inside the component
import './styles/DevStats.css';

// 2. CHANGED: Removed SiTwitter, Added SiX
import {
  SiGithub, SiLinkedin, SiX, SiInstagram, SiSpotify,
  SiYoutube, SiFacebook, SiDiscord
} from 'react-icons/si';

// --- GitHub Config ---
const GITHUB_USERNAME = "Shashwath-K";
// (GitHub URLs remain the same)
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;
const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

// --- WakaTime Config ---
// 3. ADDED: WakaTime URL from your function
const WAKATIME_URL = 'https://wakatime.com/share/@ShashwathK/0942d213-cb36-417f-8482-4b108e70ac85.json';
// --- Socials Config ---
// 4. CHANGED: Updated Twitter to X
const socials = [
  { name: "GitHub", link: "https://github.com/Shashwath-K", icon: <SiGithub />, class: "social__btn--github" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/shashwath-k-s-2b4277225/", icon: <SiLinkedin />, class: "social__btn--linkedin" },
  { name: "X", link: "https://x.com/shashwath_k15", icon: <SiX />, class: "social__btn--x" }, // CHANGED
  { name: "Instagram", link: "https://www.instagram.com/shashwath_kukku?igsh=cXprb2JnMGRqMmZu", icon: <SiInstagram />, class: "social__btn--instagram" },
  { name: "Spotify", link: "https://open.spotify.com/user/31omectxpm23tbqslxwj5b24a5qa", icon: <SiSpotify />, class: "social__btn--spotify" },
  { name: "YouTube", link: "https://www.youtube.com/@shashwath.k.s5239", icon: <SiYoutube />, class: "social__btn--youtube" },
  { name: "Facebook", link: "https://www.facebook.com/profile.php?id=100009465161906", icon: <SiFacebook />, class: "social__btn--facebook" },
  { name: "Discord", link: "https://discord.com/users/shashwath_k15", icon: <SiDiscord />, class: "social__btn--discord" },
];

// --- GitHub Stats Initial State ---
const initialGitHubStats = {
  avatarUrl: "https://avatars.githubusercontent.com/u/79392783?v=4",
  login: GITHUB_USERNAME,
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
  rate: "...",
  repos: "...",
  followers: "...",
  following: "...",
  stars: "...",
  issues: "...",
  prs: "...",
};

// 5. ADDED: WakaTime Stats Initial State
const initialWakaStats = {
  dailyHours: "...",
  totalHours: "...",
};

const DevStats = () => {
  const [githubStats, setGitHubStats] = useState(initialGitHubStats);
  
  // 6. ADDED: WakaTime state
  const [wakaStats, setWakaStats] = useState(initialWakaStats);

  // --- Fetch GitHub Data ---
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // (GitHub fetch logic remains the same)
        const userRes = await fetch(GITHUB_API_URL);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        
        const rateLimitRemaining = userRes.headers.get('x-ratelimit-remaining');
        const rateLimitTotal = userRes.headers.get('x-ratelimit-limit');

        const reposRes = await fetch(GITHUB_REPOS_URL);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        const eventsRes = await fetch(GITHUB_EVENTS_URL);
        if (!eventsRes.ok) throw new Error('Failed to fetch events');
        const eventsData = await eventsRes.json();
        
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const recentPRs = eventsData
          .filter(event => event.type === 'PullRequestEvent' && event.payload.action === 'opened' && new Date(event.created_at) > ninetyDaysAgo)
          .length;
          
        const recentIssues = eventsData
          .filter(event => event.type === 'IssuesEvent' && event.payload.action === 'opened' && new Date(event.created_at) > ninetyDaysAgo)
          .length;

        setGitHubStats({
          avatarUrl: userData.avatar_url || initialGitHubStats.avatarUrl,
          login: userData.login,
          profileUrl: userData.html_url,
          rate: `${rateLimitRemaining}/${rateLimitTotal}`,
          repos: userData.public_repos.toString(),
          followers: userData.followers.toString(),
          following: userData.following.toString(),
          stars: totalStars.toString(),
          issues: recentIssues.toString(),
          prs: recentPRs.toString(),
        });

      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setGitHubStats(prev => ({ ...prev, rate: "Error" }));
      }
    };

    fetchGitHubData();
  }, []); // Empty dependency array means this runs once on mount

  // 7. ADDED: Your WakaTime logic, adapted for React state
  useEffect(() => {
    async function fetchWakaStats() {
      try {
        const response = await fetch(WAKATIME_URL);
        const stats = await response.json();
        const dailyData = stats.data;

        let dailyHoursText = '0.0';
        let totalHoursText = '0.0';

        if (Array.isArray(dailyData) && dailyData.length > 0) {
          const mostRecentDay = dailyData[dailyData.length - 1];
          const recentSeconds = mostRecentDay.grand_total?.total_seconds;

          dailyHoursText = typeof recentSeconds === 'number'
            ? (recentSeconds / 3600).toFixed(1)
            : '0.0';

          const totalSeconds = dailyData.reduce((sum, day) => {
            return sum + (day.grand_total?.total_seconds || 0);
          }, 0);

          totalHoursText = (totalSeconds / 3600).toFixed(1);
        }
        
        setWakaStats({
          dailyHours: dailyHoursText,
          totalHours: totalHoursText
        });

      } catch (error) {
        console.error('WakaTime fetch failed:', error);
        setWakaStats({
          dailyHours: 'N/A',
          totalHours: 'N/A'
        });
      }
    }

    fetchWakaStats();
  }, []); // Empty dependency array means this runs once on mount


  return (
    <section 
      id="dev-stats" 
      className="dev-stats-section section site-container" 
      aria-labelledby="dev-stats-heading"
    >
      <h2 id="dev-stats-heading" className="section-title">Developer Stats</h2>

      <div className="dev-stats__grid">
        {/* Main GitHub Card */}
        <div className="dev-card dev-card--github">
          {/* (GitHub JSX remains the same) */}
          <div className="card-content">
            <div className="card-header">
              <div className="card-header__user">
                <img id="gh-avatar" src={githubStats.avatarUrl} alt="GitHub avatar" className="card-header__avatar" />
                <div className="card-header__info">
                  <div id="gh-login" className="card-header__title">{githubStats.login}</div>
                  <a id="gh-profile" href={githubStats.profileUrl} target="_blank" rel="noopener noreferrer" className="card-header__link">
                    View GitHub profile
                  </a>
                </div>
              </div>
              <div className="card-header__meta">
                <div>Rate <span id="gh-rate">{githubStats.rate}</span></div>
                <div>Repos: <span id="gh-repos-small">{githubStats.repos}</span></div>
              </div>
            </div>
            <div className="contrib-grid-wrapper">
              <img src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`} alt="GitHub contribution graph" className="contrib-img" onError={(e) => e.currentTarget.replaceWith('N/A')} />
            </div>
            <div className="metrics__grid">
              <div className="metric"><div className="metric__label">Followers</div><div className="metric__value" id="gh-followers">{githubStats.followers}</div></div>
              <div className="metric"><div className="metric__label">Following</div><div className="metric__value" id="gh-following">{githubStats.following}</div></div>
              <div className="metric"><div className="metric__label">Stars</div><div className="metric__value" id="gh-stars">{githubStats.stars}</div></div>
              <div className="metric"><div className="metric__label">Open Issues</div><div className="metric__value" id="gh-issues">{githubStats.issues}</div></div>
              <div className="metric"><div className="metric__label">Recent PRs</div><div className="metric__value"id="gh-prs">{githubStats.prs}</div></div>
              <div className="metric"><div className="metric__label">Public Repos</div><div className="metric__value" id="gh-repos">{githubStats.repos}</div></div>
            </div>
          </div>
        </div>

        {/* Right Column for WakaTime and Socials */}
        <div className="dev-stats__right-col">
          {/* WakaTime Card */}
          <div className="dev-card dev-card--wakatime">
            <div className="card-content">
              <div className="card-header">
                <div className="card-header__user">
                  <div className="card-header__icon icon--vscode" aria-label="VS Code icon"></div>
                  <div className="card-header__info">
                    <div className="card-header__title">WakaTime</div>
                    <div className="card-header__subtitle">Coding Activity</div>
                  </div>
                </div>
              </div>

              <div className="metrics__grid wakatime-metrics">
                <div className="metric">
                  <div className="metric__label">Daily Coding Hours</div>
                  {/* 8. CHANGED: Now reads from React state */}
                  <div className="metric__value" id="waka-daily-hours">{wakaStats.dailyHours}</div>
                </div>
                <div className="metric">
                  <div className="metric__label">Total Hours (Period)</div>
                  {/* 9. CHANGED: Now reads from React state */}
                  <div className="metric__value" id="waka-total-hours">{wakaStats.totalHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Socials Card */}
          <div className="dev-card dev-card--socials">
            <div className="card-content">
              <div className="card-header">
                <div className="card-header__title">Socials</div>
              </div>
              <div className="socials__grid">
                {socials.map((social) => (
                  <a 
                    key={social.name}
                    className={`social__btn ${social.class}`} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={social.name}
                  >
                    {/* This correctly renders the icon component */}
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevStats;