// type: 'video'  → horizontal 16:9 card
// type: 'reel'   → vertical 9:16 portrait card

export const SECTION_VIDEOS = {
  entertainment: [
    {
      id: 'programs', title: 'Our Programs', type: 'video',
      videos: [
        { id: 1, title: 'Ithin Ithin Kohomada — Episode 200 Special', thumb: '/images/ithin-ithin-kohomada.jpeg', duration: '45:22', views: '234K', channel: 'Supreme Entertainment', postedAt: '2 days ago' },
        { id: 2, title: 'Suba Arana Morning Show — Monday Edition', thumb: '/images/every-morning.jpeg', duration: '1:02:14', views: '89K', channel: 'Supreme Entertainment', postedAt: '1 day ago' },
        { id: 3, title: 'Dawasa Wiriya — Weekly Wrap-Up', thumb: '/images/janahada.jpeg', duration: '38:45', views: '124K', channel: 'Supreme TV', postedAt: '3 days ago' },
        { id: 4, title: "Chef's Table Sri Lanka — Episode 12: Jaffna Edition", thumb: '/images/every-morning.jpeg', duration: '52:30', views: '178K', channel: 'Supreme Entertainment', postedAt: '5 days ago' },
        { id: 5, title: 'Kalpana Music Show — Yohani Special', thumb: '/images/samanmaliya.jpeg', duration: '1:15:00', views: '312K', channel: 'Supreme Music', postedAt: '1 week ago' },
        { id: 6, title: 'Good Morning Supreme — Weekend Edition', thumb: '/images/every-morning.jpeg', duration: '2:30:00', views: '67K', channel: 'Supreme TV', postedAt: '2 days ago' },
      ],
    },
    {
      id: 'teledramas', title: 'Tele Dramas', type: 'video',
      videos: [
        { id: 1, title: 'Sanda Eliya — Episode 248 (Full HD)', thumb: '/images/samanmaliya.jpeg', duration: '22:15', views: '198K', channel: 'Supreme Entertainment', postedAt: '1 day ago' },
        { id: 2, title: 'Mal Mithuru — Episode 112', thumb: '/images/yowun-wasanthaye.jpeg', duration: '24:30', views: '145K', channel: 'Supreme Entertainment', postedAt: '1 day ago' },
        { id: 3, title: 'Sihina Genalla — Season 2 Finale (Extended)', thumb: '/images/janahada.jpeg', duration: '48:00', views: '910K', channel: 'Supreme Entertainment', postedAt: '3 days ago' },
        { id: 4, title: 'Adarei Man Adarei — Episode 87', thumb: '/images/samanmaliya.jpeg', duration: '21:45', views: '77K', channel: 'Supreme Entertainment', postedAt: '1 day ago' },
        { id: 5, title: 'Hiranya — Episode 34', thumb: '/images/yowun-wasanthaye.jpeg', duration: '23:10', views: '56K', channel: 'Supreme Entertainment', postedAt: '2 days ago' },
        { id: 6, title: 'Thanha Mal — Episode 19', thumb: '/images/samanmaliya.jpeg', duration: '20:55', views: '43K', channel: 'Supreme Entertainment', postedAt: '3 days ago' },
      ],
    },
    {
      id: 'reels', title: 'Entertainment Reels', type: 'reel',
      videos: [
        { id: 1, title: 'Sanda Eliya S3 — First Look 🔥', thumb: '/images/samanmaliya.jpeg', duration: '0:58', views: '1.2M', channel: 'Supreme Entertainment', postedAt: '2 hrs ago' },
        { id: 2, title: "Yohani's Stage Entrance at BMICH 😍", thumb: '/images/ithin-ithin-kohomada.jpeg', duration: '0:45', views: '890K', channel: 'Supreme Music', postedAt: '4 hrs ago' },
        { id: 3, title: 'Behind the Scenes: Mal Mithuru', thumb: '/images/yowun-wasanthaye.jpeg', duration: '1:02', views: '456K', channel: 'Supreme Entertainment', postedAt: '6 hrs ago' },
        { id: 4, title: 'Colombo Fashion Week Highlights ✨', thumb: '/images/samanmaliya.jpeg', duration: '0:52', views: '678K', channel: 'Supreme Style', postedAt: '8 hrs ago' },
        { id: 5, title: 'Best Moments: Ithin Ithin Kohomada Ep 200', thumb: '/images/ithin-ithin-kohomada.jpeg', duration: '0:59', views: '234K', channel: 'Supreme Entertainment', postedAt: '1 day ago' },
        { id: 6, title: 'Viduthalai 2 — Sri Lanka Theatre Reactions', thumb: '/images/janahada.jpeg', duration: '0:48', views: '345K', channel: 'Supreme Entertainment', postedAt: '12 hrs ago' },
      ],
    },
  ],

  sports: [
    {
      id: 'highlights', title: 'Match Highlights', type: 'video',
      videos: [
        { id: 1, title: 'SL vs IND ODI Highlights — Series Decider Full Match', thumb: '/images/cricket.jpeg', duration: '18:42', views: '312K', channel: 'Supreme Sports', postedAt: '2 days ago' },
        { id: 2, title: 'IPL 2025: RCB vs MI Super Over Drama — Extended Highlights', thumb: '/images/cricket.jpeg', duration: '12:08', views: '1.4M', channel: 'Supreme Sports', postedAt: '3 days ago' },
        { id: 3, title: 'National Kabaddi Championship — Grand Final', thumb: '/images/cricket.jpeg', duration: '45:20', views: '92K', channel: 'Supreme Sports', postedAt: '5 days ago' },
        { id: 4, title: 'Mahela Jayawardena Tribute: 40 Greatest Shots', thumb: '/images/cricket.jpeg', duration: '22:15', views: '2.8M', channel: 'Supreme Sports', postedAt: '1 week ago' },
        { id: 5, title: 'SL vs AUS Test: Day 2 Full Highlights', thumb: '/images/cricket.jpeg', duration: '25:30', views: '445K', channel: 'Supreme Sports', postedAt: '4 days ago' },
        { id: 6, title: 'Asia Rugby Sevens Series — Semi Final Highlights', thumb: '/images/cricket.jpeg', duration: '14:22', views: '67K', channel: 'Supreme Sports', postedAt: '6 days ago' },
      ],
    },
    {
      id: 'reels', title: 'Sports Reels', type: 'reel',
      videos: [
        { id: 1, title: 'Nissanka 100 off 68 balls — Watch the celebration 🏏🔥', thumb: '/images/cricket.jpeg', duration: '0:55', views: '4.2M', channel: 'Supreme Sports', postedAt: '2 hrs ago' },
        { id: 2, title: 'RCB Super Over: Last ball six!! 😱', thumb: '/images/cricket.jpeg', duration: '0:38', views: '2.8M', channel: 'Supreme Sports', postedAt: '3 hrs ago' },
        { id: 3, title: 'Kabaddi tackle of the year 💪', thumb: '/images/cricket.jpeg', duration: '0:22', views: '890K', channel: 'Supreme Sports', postedAt: '6 hrs ago' },
        { id: 4, title: 'SL Rugby 7s — Try line sprint! 🏉', thumb: '/images/cricket.jpeg', duration: '0:45', views: '567K', channel: 'Supreme Sports', postedAt: '10 hrs ago' },
        { id: 5, title: 'Marathon start — 18,000 runners! 🏃', thumb: '/images/cricket.jpeg', duration: '0:52', views: '345K', channel: 'Supreme Sports', postedAt: '12 hrs ago' },
        { id: 6, title: "Jayawardena's greatest six ever? 🤩", thumb: '/images/cricket.jpeg', duration: '0:30', views: '1.1M', channel: 'Supreme Sports', postedAt: '1 day ago' },
      ],
    },
  ],

  politics: [
    {
      id: 'parliament', title: 'Parliament Coverage', type: 'video',
      videos: [
        { id: 1, title: 'LIVE: Emergency Parliament Session — Budget & IMF Deal', thumb: '/images/live.jpeg', duration: 'LIVE', views: '9.8K watching', channel: 'Supreme News', postedAt: 'Live now' },
        { id: 2, title: 'Budget 2026 Final Reading — Full Session', thumb: '/images/janahada.jpeg', duration: '3:45:22', views: '234K', channel: 'Supreme News', postedAt: '1 day ago' },
        { id: 3, title: "President's Address to Parliament — Full Speech", thumb: '/images/janahada.jpeg', duration: '1:12:30', views: '445K', channel: 'Supreme News', postedAt: '3 days ago' },
        { id: 4, title: 'Opposition No-Confidence Motion — Full Debate', thumb: '/images/news-cover.jpeg', duration: '2:34:00', views: '189K', channel: 'Supreme News', postedAt: '2 days ago' },
        { id: 5, title: 'Election Commission Press Conference — Full', thumb: '/images/janahada.jpeg', duration: '45:00', views: '78K', channel: 'Supreme News', postedAt: '4 days ago' },
        { id: 6, title: 'Cabinet Reshuffle: Minister Swearing-In Ceremony', thumb: '/images/news-cover.jpeg', duration: '38:20', views: '124K', channel: 'Supreme News', postedAt: '9 hrs ago' },
      ],
    },
    {
      id: 'interviews', title: 'Political Interviews', type: 'video',
      videos: [
        { id: 1, title: 'Finance Minister on IMF Deal — Exclusive Interview', thumb: '/images/global-pulse.jpeg', duration: '28:15', views: '312K', channel: 'Supreme News', postedAt: '2 days ago' },
        { id: 2, title: 'Opposition Leader: "We Demand Transparency"', thumb: '/images/janahada.jpeg', duration: '22:30', views: '198K', channel: 'Supreme News', postedAt: '3 days ago' },
        { id: 3, title: 'IMF Mission Chief on Sri Lanka Recovery', thumb: '/images/global-pulse.jpeg', duration: '18:45', views: '156K', channel: 'Supreme News', postedAt: '5 days ago' },
        { id: 4, title: 'Cabinet Minister on Power Crisis — Interview', thumb: '/images/news-cover.jpeg', duration: '15:20', views: '89K', channel: 'Supreme News', postedAt: '6 days ago' },
      ],
    },
  ],

  news: [
    {
      id: 'latest', title: 'Latest News Videos', type: 'video',
      videos: [
        { id: 1, title: 'Supreme TV Prime Time News — 7PM Bulletin', thumb: '/images/live.jpeg', duration: 'LIVE', views: '14.2K watching', channel: 'Supreme News', postedAt: 'Live now' },
        { id: 2, title: 'Morning News — Full Bulletin | June 7, 2026', thumb: '/images/news-cover.jpeg', duration: '28:45', views: '89K', channel: 'Supreme News', postedAt: '8 hrs ago' },
        { id: 3, title: 'Parliament Emergency Session — Full Coverage', thumb: '/images/janahada.jpeg', duration: '3:12:00', views: '234K', channel: 'Supreme News', postedAt: '14 min ago' },
        { id: 4, title: 'Weather Update: Southern Province Flood Warning', thumb: '/images/news-cover.jpeg', duration: '8:30', views: '45K', channel: 'Supreme Weather', postedAt: '1 hr ago' },
        { id: 5, title: 'Health Ministry: Free Cancer Screening Launch', thumb: '/images/global-pulse.jpeg', duration: '22:10', views: '67K', channel: 'Supreme News', postedAt: '3 hrs ago' },
        { id: 6, title: 'Sinharaja Protection Declaration — Full Event', thumb: '/images/news-cover.jpeg', duration: '15:45', views: '34K', channel: 'Supreme News', postedAt: '5 hrs ago' },
      ],
    },
    {
      id: 'reels', title: 'News Reels', type: 'reel',
      videos: [
        { id: 1, title: 'Breaking: Parliament called TONIGHT ⚡', thumb: '/images/live.jpeg', duration: '0:58', views: '2.1M', channel: 'Supreme News', postedAt: '14 min ago' },
        { id: 2, title: 'Rain warning — stay safe this weekend 🌧️', thumb: '/images/news-cover.jpeg', duration: '0:45', views: '456K', channel: 'Supreme Weather', postedAt: '1 hr ago' },
        { id: 3, title: 'Free cancer screening: How to register 📋', thumb: '/images/global-pulse.jpeg', duration: '1:02', views: '678K', channel: 'Supreme Health', postedAt: '3 hrs ago' },
        { id: 4, title: 'Sinharaja buffer zone explained 🌿', thumb: '/images/news-cover.jpeg', duration: '0:52', views: '345K', channel: 'Supreme News', postedAt: '5 hrs ago' },
        { id: 5, title: 'Fuel racket bust: 14 arrested 🚔', thumb: '/images/janahada.jpeg', duration: '0:39', views: '891K', channel: 'Supreme News', postedAt: '7 hrs ago' },
        { id: 6, title: 'University results out — cutoffs explained 📚', thumb: '/images/news-cover.jpeg', duration: '0:55', views: '1.2M', channel: 'Supreme News', postedAt: '9 hrs ago' },
      ],
    },
  ],

  business: [
    {
      id: 'market', title: 'Market Analysis', type: 'video',
      videos: [
        { id: 1, title: 'CSE Hits 14,000 — What It Means for Investors', thumb: '/images/global-pulse.jpeg', duration: '12:15', views: '48K', channel: 'Supreme Business', postedAt: '3 hrs ago' },
        { id: 2, title: 'Weekly Market Wrap — June 7, 2026', thumb: '/images/global-pulse.jpeg', duration: '18:30', views: '34K', channel: 'Supreme Business', postedAt: '1 day ago' },
        { id: 3, title: 'Central Bank Rate Cut — Full Press Conference', thumb: '/images/news-cover.jpeg', duration: '35:00', views: '78K', channel: 'Supreme Business', postedAt: '8 hrs ago' },
        { id: 4, title: 'Dialog 5G Launch — Kandy & Galle Coverage', thumb: '/images/global-pulse.jpeg', duration: '22:45', views: '56K', channel: 'Supreme Business', postedAt: '5 hrs ago' },
        { id: 5, title: 'Port of Colombo Q1 Record — CEO Interview', thumb: '/images/news-cover.jpeg', duration: '15:20', views: '23K', channel: 'Supreme Business', postedAt: '1 day ago' },
        { id: 6, title: 'VoltLK EV Startup — Founder Story', thumb: '/images/global-pulse.jpeg', duration: '28:10', views: '42K', channel: 'Supreme Business', postedAt: '2 days ago' },
      ],
    },
    {
      id: 'reels', title: 'Business Reels', type: 'reel',
      videos: [
        { id: 1, title: 'CSE crosses 14,000 — in 60 secs 📈', thumb: '/images/global-pulse.jpeg', duration: '1:00', views: '567K', channel: 'Supreme Business', postedAt: '3 hrs ago' },
        { id: 2, title: '5G is here — what changes for you? 📡', thumb: '/images/news-cover.jpeg', duration: '0:55', views: '345K', channel: 'Supreme Business', postedAt: '5 hrs ago' },
        { id: 3, title: 'Rate cut: good or bad for you? 🏦', thumb: '/images/global-pulse.jpeg', duration: '0:48', views: '234K', channel: 'Supreme Business', postedAt: '8 hrs ago' },
        { id: 4, title: 'VoltLK: Sri Lankan EV revolution 🚗⚡', thumb: '/images/news-cover.jpeg', duration: '0:58', views: '678K', channel: 'Supreme Business', postedAt: '2 days ago' },
        { id: 5, title: 'Tourism at record high — the numbers! 🏨', thumb: '/images/global-pulse.jpeg', duration: '0:42', views: '456K', channel: 'Supreme Business', postedAt: '1 day ago' },
      ],
    },
  ],

  world: [
    {
      id: 'international', title: 'World Coverage', type: 'video',
      videos: [
        { id: 1, title: 'G7 AI Framework — Full Summit Coverage', thumb: '/images/global-pulse.jpeg', duration: '2:45:00', views: '234K', channel: 'Supreme World', postedAt: '4 hrs ago' },
        { id: 2, title: 'India-Pakistan Peace Talks — Special Report', thumb: '/images/global-pulse.jpeg', duration: '35:20', views: '445K', channel: 'Supreme World', postedAt: '6 hrs ago' },
        { id: 3, title: 'Global Oil Price Drop — Market Reaction', thumb: '/images/news-cover.jpeg', duration: '18:45', views: '156K', channel: 'Supreme Business', postedAt: '8 hrs ago' },
        { id: 4, title: 'WHO: End of Mpox Emergency — Press Conference', thumb: '/images/global-pulse.jpeg', duration: '45:00', views: '312K', channel: 'Supreme World', postedAt: '10 hrs ago' },
        { id: 5, title: 'SpaceX Starship Lunar Mission — Full Launch', thumb: '/images/live.jpeg', duration: '3:20:00', views: '2.1M', channel: 'Supreme World', postedAt: '12 hrs ago' },
        { id: 6, title: 'EU Digital Services Reform — What It Means', thumb: '/images/global-pulse.jpeg', duration: '22:30', views: '89K', channel: 'Supreme World', postedAt: '1 day ago' },
      ],
    },
    {
      id: 'reels', title: 'World Reels', type: 'reel',
      videos: [
        { id: 1, title: 'G7 AI deal — what it means for you 🌍', thumb: '/images/global-pulse.jpeg', duration: '0:59', views: '1.2M', channel: 'Supreme World', postedAt: '4 hrs ago' },
        { id: 2, title: 'India-Pakistan shake hands after 4 years 🕊️', thumb: '/images/news-cover.jpeg', duration: '0:45', views: '2.8M', channel: 'Supreme World', postedAt: '6 hrs ago' },
        { id: 3, title: 'Oil below $74 — what now for Sri Lanka? ⛽', thumb: '/images/global-pulse.jpeg', duration: '0:52', views: '678K', channel: 'Supreme World', postedAt: '8 hrs ago' },
        { id: 4, title: 'Starship to the moon — moment of liftoff 🚀', thumb: '/images/live.jpeg', duration: '0:38', views: '4.5M', channel: 'Supreme World', postedAt: '12 hrs ago' },
        { id: 5, title: 'Europe bans algorithm addiction — explained 📱', thumb: '/images/global-pulse.jpeg', duration: '1:00', views: '890K', channel: 'Supreme World', postedAt: '1 day ago' },
      ],
    },
  ],

  lifestyle: [
    {
      id: 'shows', title: 'Lifestyle Shows', type: 'video',
      videos: [
        { id: 1, title: 'Colombo Kitchen — Jaffna Curry Masterclass', thumb: '/images/every-morning.jpeg', duration: '28:30', views: '234K', channel: 'Supreme Lifestyle', postedAt: '1 day ago' },
        { id: 2, title: 'Home Makeover Sri Lanka — Episode 8', thumb: '/images/every-morning.jpeg', duration: '42:15', views: '178K', channel: 'Supreme Lifestyle', postedAt: '3 days ago' },
        { id: 3, title: 'Wellness Wednesday — Ayurveda for Beginners', thumb: '/images/every-morning.jpeg', duration: '35:00', views: '145K', channel: 'Supreme Lifestyle', postedAt: '2 days ago' },
        { id: 4, title: 'Fashion Forward Sri Lanka — Season 3 Finale', thumb: '/images/samanmaliya.jpeg', duration: '48:30', views: '312K', channel: 'Supreme Lifestyle', postedAt: '5 days ago' },
        { id: 5, title: 'Urban Gardening with Ayasha — Episode 5', thumb: '/images/every-morning.jpeg', duration: '22:45', views: '89K', channel: 'Supreme Lifestyle', postedAt: '6 days ago' },
        { id: 6, title: 'Mental Health Today — Expert Panel', thumb: '/images/every-morning.jpeg', duration: '55:00', views: '234K', channel: 'Supreme Lifestyle', postedAt: '1 week ago' },
      ],
    },
    {
      id: 'travel', title: 'Travel & Food', type: 'video',
      videos: [
        { id: 1, title: "Driving Sri Lanka's Coastal Highway — Full Documentary", thumb: '/images/every-morning.jpeg', duration: '1:15:00', views: '445K', channel: 'Supreme Travel', postedAt: '1 day ago' },
        { id: 2, title: 'Best New Restaurants 2026 — Colombo Edition', thumb: '/images/every-morning.jpeg', duration: '35:20', views: '312K', channel: 'Supreme Lifestyle', postedAt: '2 hrs ago' },
        { id: 3, title: 'Top 5 Ayurvedic Resorts — Our Honest Reviews', thumb: '/images/every-morning.jpeg', duration: '28:45', views: '234K', channel: 'Supreme Travel', postedAt: '4 hrs ago' },
        { id: 4, title: 'Galle Fort — Heritage & Modern Lifestyle', thumb: '/images/every-morning.jpeg', duration: '22:30', views: '178K', channel: 'Supreme Travel', postedAt: '2 days ago' },
        { id: 5, title: 'Kandy Food Tour — Street Eats Edition', thumb: '/images/every-morning.jpeg', duration: '18:15', views: '145K', channel: 'Supreme Food', postedAt: '3 days ago' },
      ],
    },
    {
      id: 'reels', title: 'Lifestyle Reels', type: 'reel',
      videos: [
        { id: 1, title: 'Jaffna curry in 60 seconds 🍛', thumb: '/images/every-morning.jpeg', duration: '1:00', views: '2.3M', channel: 'Supreme Lifestyle', postedAt: '1 hr ago' },
        { id: 2, title: 'Rooftop garden transformation 🌱', thumb: '/images/every-morning.jpeg', duration: '0:55', views: '1.8M', channel: 'Supreme Lifestyle', postedAt: '6 hrs ago' },
        { id: 3, title: 'Traditional Kandyan meets streetwear 👗', thumb: '/images/samanmaliya.jpeg', duration: '0:48', views: '3.2M', channel: 'Supreme Style', postedAt: '8 hrs ago' },
        { id: 4, title: 'Ayurvedic morning routine 🧘', thumb: '/images/every-morning.jpeg', duration: '0:59', views: '1.1M', channel: 'Supreme Wellness', postedAt: '2 days ago' },
        { id: 5, title: 'Galle sunset timelapse 🌅', thumb: '/images/every-morning.jpeg', duration: '0:30', views: '4.7M', channel: 'Supreme Travel', postedAt: '3 days ago' },
        { id: 6, title: 'Colombo street food you MUST try 🥘', thumb: '/images/every-morning.jpeg', duration: '0:52', views: '2.9M', channel: 'Supreme Food', postedAt: '4 days ago' },
      ],
    },
  ],
};
