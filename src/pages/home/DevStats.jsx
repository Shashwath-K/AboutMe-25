import React, { useState, useEffect } from 'react';

// TODO: Create a CSS file at this path and move your 'dev-stats.css'
// styles into it. Then, uncomment the line below.
 import './styles/DevStats.css';

// --- GitHub Config ---
const GITHUB_USERNAME = "Shashwath-K";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;
const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

// --- WakaTime Config ---
// TODO: WakaTime stats require a private API key and a proxy/serverless function
// to avoid exposing it. For now, we'll just show placeholders.
const WAKATIME_USER = "3f94bafd-99a7-42fc-8ef7-e16bab495046";

// --- Socials Config ---
const socials = [
  { name: "GitHub", link: "https://github.com/Shashwath-K", icon: "si-github", class: "social__btn--github" },
  { name: "LinkedIn", link: "#", icon: "si-linkedin", class: "social__btn--linkedin" },
  { name: "Twitter", link: "#", icon: "si-twitter", class: "social__btn--twitter" },
  { name: "Instagram", link: "#", icon: "si-instagram", class: "social__btn--instagram" },
  { name: "Spotify", link: "#", icon: "si-spotify", class: "social__btn--spotify" },
  { name: "YouTube", link: "#", icon: "si-youtube", class: "social__btn--youtube" },
  { name: "Facebook", link: "#", icon: "si-facebook", class: "social__btn--facebook" },
  { name: "Discord", link: "#", icon: "si-discord", class: "social__btn--discord" },
];

// --- GitHub Stats Initial State ---
const initialGitHubStats = {
  avatarUrl: "https://avatars.githubusercontent.com/u/79392783?v=4", // Default avatar
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

// --- WakaTime Stats Initial State ---
const initialWakaStats = {
  dailyHours: "...",
  totalHours: "...",
};

const DevStats = () => {
  const [githubStats, setGitHubStats] = useState(initialGitHubStats);
  const [wakaStats, setWakaStats] = useState(initialWakaStats);

  // --- Fetch GitHub Data ---
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // --- 1. Fetch Basic User Info ---
        const userRes = await fetch(GITHUB_API_URL);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        
        const rateLimitRemaining = userRes.headers.get('x-ratelimit-remaining');
        const rateLimitTotal = userRes.headers.get('x-ratelimit-limit');

        // --- 2. Fetch Repos to count stars ---
        const reposRes = await fetch(GITHUB_REPOS_URL);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // --- 3. Fetch Events to count recent PRs and Issues ---
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

        // --- 4. Set All Stats ---
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
        // Keep partial or default data
        setGitHubStats(prev => ({ ...prev, rate: "Error" }));
      }
    };

    fetchGitHubData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Fetch WakaTime Data ---
  useEffect(() => {
    const fetchWakaTimeData = async () => {
      // TODO: Implement WakaTime fetching.
      // This usually requires a serverless function (on Vercel or Netlify)
      // to proxy your request and securely add your WAKA_API_KEY.
      //
      // Example for a serverless function:
      // 1. Create `/api/wakatime.js`
      // 2. Fetch `/api/wakatime` from this component.
      // 3. Your serverless function fetches `https.../wakatime.com/api/v1/users/current/stats/last_7_days?api_key=YOUR_SECRET`
      // 4. It then returns the JSON to this component.
      //
      // For now, we'll just log a message.
      console.log("WakaTime fetching is not implemented. Set up a serverless proxy.");
      // setWakaStats({ ... });
    };

    fetchWakaTimeData();
  }, []);

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
          <div className="card-content">
            <div className="card-header">
              <div className="card-header__user">
                <img 
                  id="gh-avatar" 
                  src={githubStats.avatarUrl} 
                  alt="GitHub avatar" 
                  className="card-header__avatar" 
                />
                <div className="card-header__info">
                  <div id="gh-login" className="card-header__title">{githubStats.login}</div>
                  <a 
                    id="gh-profile" 
                    href={githubStats.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-header__link"
                  >
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
              <img 
                src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`} 
                alt="GitHub contribution graph" 
                className="contrib-img" 
                onError={(e) => e.currentTarget.replaceWith('N/A')} 
              />
            </div>

            <div className="metrics__grid">
              <div className="metric"><div className="metric__label">Followers</div><div className="metric__value" id="gh-followers">{githubStats.followers}</div></div>
              <div className="metric"><div className="metric__label">Following</div><div className="metric__value" id="gh-following">{githubStats.following}</div></div>
              <div className="metric"><div className="metric__label">Stars</div><div className="metric__value" id="gh-stars">{githubStats.stars}</div></div>
              <div className="metric"><div className="metric__label">Open Issues</div><div className="metric__value" id="gh-issues">{githubStats.issues}</div></div>
              <div className="metric"><div className="metric__label">Recent PRs</div><div className="metric__value" id="gh-prs">{githubStats.prs}</div></div>
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
                  <div className="metric__value" id="waka-daily-hours">{wakaStats.dailyHours}</div>
                </div>
                <div className="metric">
                  <div className="metric__label">Total Hours (Period)</div>
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
                    <i className={`si ${social.icon}`}></i>
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

