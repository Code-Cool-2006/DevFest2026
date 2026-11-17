// Central content/config for the site. Edit here to update the event details.

export const EVENT = {
  year: 2026,
  city: 'Belgaum',
  // Countdown target (local time): 26 Nov 2026, 9:00 AM.
  date: new Date(2026, 10, 26, 9, 0, 0),
  dateLabel: '26 NOVEMBER 2026',
  venueShort: 'KLS Gogte Institute of Technology, Belagavi',
  venueMapHero: 'https://goo.gl/maps/DqDGRCLnYi6BVxeE8',
  venueMap: 'https://maps.app.goo.gl/fScSNy5N3ZgkLqPj7',
  registerUrl: 'https://konfhub.com/google-developer-group-belgaum-devfest-2026',
  eventPage: 'https://gdg.community.dev/gdg-belgaum/', // swap for the 2026 event page once published
}

export const NAV_LINKS = [
  { label: 'HOME', href: '/#home' },
  { label: 'WHAT', href: '/#what' },
  { label: 'WHY', href: '/#why' },
  { label: 'SCHEDULE', href: '/#schedule' },
  { label: 'SPEAKERS', href: '/#speakers' },
  { label: 'VENUE', href: '/#venu' },
  { label: 'TEAM', href: '/team' },
]

export const FEATURES = [
  { icon: 'tf-ion-android-phone-portrait', color: 'var(--color1)', title: 'TECHNICAL ABUNDANCE', text: 'DevFest Belgaum 2026 gives you a full package of knowledge and one on one interaction with global experts and technologies.' },
  { icon: 'tf-ion-person-stalker', color: 'var(--color3)', title: 'NETWORKING', text: 'Expand your branches of knowledge and identity further. Connect and collaborate with developers and tech enthusiasts on a single platform.' },
  { icon: 'tf-gift2', color: 'var(--color4)', title: 'GET SWAGS', text: "A day of knowledge packed sessions, events with empty stomach is just not fun! GDG Belgaum is making sure that your visit will surely leave the city on your mind. As a souvenir for our great journey, you'll also be getting some cool goodies and google badges." },
  { icon: 'tf-ion-code-working', color: 'var(--color1)', title: 'WORKSHOPS & CODE SESSIONS', text: 'A coding rendezvous with your friends plus hands-on experience for various workshops and sessions! What else could we ask for? Initiate your journey towards a new technology and get to learn it from experts.' },
  { icon: 'tf-ion-android-person', color: 'var(--color2)', title: "BE BELGAUM'S BEST DEVELOPER", text: "Put your skills to the test as you work your way through multiple rounds of coding, decoding for the title of Belgaum's Best Developer and $5,000 USD worth gifts. Do you have what it takes?" },
]

const S = '/images/about/Schedule/'
export const SCHEDULE = [
  { time: '9:00AM – 10:00AM', title: 'Registration, Check-in & Seating', color: 'var(--color1)', img: S + 'registration.png', text: 'Kickstart your DevFest journey — check in, grab your badge, and find your seat.' },
  { time: '10:00AM – 10:15AM', title: 'Inauguration & Welcome', color: 'var(--color2)', img: S + 'opening.png', text: 'Official opening of DevFest Belagavi 2026 with a warm welcome from the GDG team.' },
  { time: '10:15AM – 10:45AM', title: "What's Next for AI in India?", color: 'var(--color3)', img: '/images/speaker/rivu-chakraborty.jpg', speaker: 'Rivu Chakraborty', text: 'An exciting look at the future of Artificial Intelligence in the Indian tech landscape.' },
  { time: '10:50AM – 11:20AM', title: 'Every Workload Finds Its Runtime: Where Do AI Agents Actually Belong?', color: 'var(--color3)', img: '/images/speaker/sayed-imran.jpg', speaker: 'Sayed Imran', text: 'Exploring the right runtime environments for AI agents across different workloads.' },
  { time: '11:25AM – 11:55AM', title: 'Your LLM Bill Is Too High: A Practical Guide to Token Budgeting', color: 'var(--color3)', img: '/images/speaker/geeta-kakrani.jpg', speaker: 'Geeta Kakrani', text: 'Practical strategies to optimize your LLM usage and dramatically reduce token costs.' },
  { time: '11:55AM – 12:15PM', title: 'Tea Break & Networking', color: 'var(--color4)', img: S + 'techactivity.png', text: 'Recharge with tea and coffee while networking with fellow developers and speakers.' },
  { time: '12:15PM – 12:45PM', title: 'AI Security: Breaking, Securing & Building Trustworthy AI Applications', color: 'var(--color3)', img: '/images/speaker/prakhar-gandhi.jpg', speaker: 'Prakhar Gandhi', text: 'Deep dive into AI security challenges and how to build trustworthy, robust AI systems.' },
  { time: '12:50PM – 1:20PM', title: 'Android Testing with AI and Compose', color: 'var(--color3)', img: '/images/speaker/adit-lal.jpg', speaker: 'Adit Lal', text: 'Modern approaches to Android testing using AI and Jetpack Compose.' },
  { time: '1:25PM – 1:55PM', title: 'Hackathon Winner\'s Playbook: Ideate, Build & Win with Agentic AI', color: 'var(--color3)', img: '/images/speaker/yash-thakare.jpg', speaker: 'Yash Thakare', text: 'Learn winning strategies for hackathons using the latest Agentic AI frameworks and tools.' },
  { time: '1:55PM – 2:25PM', title: 'Speaker Felicitation & Track Briefing', color: 'var(--color2)', img: S + 'prize.jpg', text: 'Honoring our speakers and briefing attendees on the upcoming afternoon tracks.' },
  { time: '2:25PM – 3:30PM', title: 'Lunch Break', color: 'var(--color3)', img: S + 'pizza.png', text: 'Enjoy a relaxing lunch break — a great opportunity to connect and collaborate with fellow attendees.' },
  {
    time: '3:45PM – 6:15PM',
    title: 'Track A: Meet the Speakers',
    color: 'var(--color1)',
    images: [
      { name: 'Rivu', img: '/images/speaker/rivu-chakraborty.jpg' },
      { name: 'Sayed', img: '/images/speaker/sayed-imran.jpg' },
      { name: 'Geeta', img: '/images/speaker/geeta-kakrani.jpg' },
      { name: 'Prakhar', img: '/images/speaker/prakhar-gandhi.jpg' },
      { name: 'Adit', img: '/images/speaker/adit-lal.jpg' },
      { name: 'Yash', img: '/images/speaker/yash-thakare.jpg' },
    ],
    speaker: 'All 6 Keynote Speakers',
    text: 'Networking & learning with all six speakers in small rotating groups.'
  },
  {
    time: '3:45PM – 6:15PM',
    title: 'Track B: Code Challenge',
    color: 'var(--color2)',
    images: [
      { name: 'Sourab Metri', img: '/images/Team/CodeChallenge_Judge.jpeg' },
      { name: 'Faisal Nadaf', img: '/images/Team/CodeChallenge_Judge 2.png' },
    ],
    speaker: 'Sourab Metri & Faisal Nadaf (Judges)',
    text: 'A structured test of technical knowledge, reasoning and problem-solving evaluated by our contest judges.'
  },
  { time: '6:30PM – 7:00PM', title: 'Valedictory, Winners & Closing', color: 'var(--color4)', img: S + 'cultural.png', text: 'Closing ceremony celebrating the winners and wrapping up an incredible day at DevFest Belagavi 2026.' },
]

export const SPEAKERS = [
  {
    name: 'Yash Thakare',
    img: '/images/speaker/yash-thakare.jpg',
    topic: "Hackathon Winner's Playbook: Ideate, Build & Win with Agentic AI",
    linkedin: 'https://www.linkedin.com/in/yashthakare',
  },
  {
    name: 'Geeta Kakrani',
    img: '/images/speaker/geeta-kakrani.jpg',
    topic: 'Your LLM Bill Is Too High: A Practical Guide to Token Budgeting',
    linkedin: 'https://www.linkedin.com/in/geetakakrani/',
  },
  {
    name: 'Adit Lal',
    img: '/images/speaker/adit-lal.jpg',
    topic: 'Android Testing with AI and Compose',
    linkedin: 'https://www.linkedin.com/in/aditlal',
  },
  {
    name: 'Prakhar Gandhi',
    img: '/images/speaker/prakhar-gandhi.jpg',
    topic: 'AI Security: Breaking, Securing & Building Trustworthy AI Applications',
    linkedin: 'https://www.linkedin.com/in/prakhargandhi14/',
  },
  {
    name: 'Rivu Chakraborty',
    img: '/images/speaker/rivu-chakraborty.jpg',
    objectPosition: '78% 12%',
    topic: "What's Next for AI in India?",
    linkedin: 'https://www.linkedin.com/in/rivuchk',
  },
  {
    name: 'Sayed Imran',
    img: '/images/speaker/sayed-imran.jpg',
    topic: 'Every Workload Finds Its Runtime: Where Do AI Agents Actually Belong?',
    linkedin: 'https://www.linkedin.com/in/sayed-imran',
  },
  {
    name: 'Sourab Metri',
    img: '/images/Team/CodeChallenge_Judge.jpeg',
    objectPosition: 'center 20%',
    topic: 'Code Challenge Judge',
    role: 'Judge',
  },
  {
    name: 'Faisal Nadaf',
    img: '/images/Team/CodeChallenge_Judge 2.png',
    objectPosition: 'center 20%',
    topic: 'Code Challenge Judge',
    role: 'Judge',
  },
]
