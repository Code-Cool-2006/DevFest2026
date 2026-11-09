// Central content/config for the site. Edit here to update the event details.

export const EVENT = {
  year: 2026,
  city: 'Belgaum',
  // Countdown target (local time), e.g. new Date(2026, 10, 28, 10, 0, 0) for 28 Nov 2026, 10 AM.
  // Leave as null until the date is announced — the countdown shows "--".
  date: null,
  dateLabel: 'DATE TO BE ANNOUNCED',
  venueShort: 'KLS Gogte Institute of Technology, Belagavi',
  venueMapHero: 'https://goo.gl/maps/DqDGRCLnYi6BVxeE8',
  venueMap: 'https://maps.app.goo.gl/fScSNy5N3ZgkLqPj7',
  registerUrl: 'https://forms.gle/BZuME4qBq3nxpaCW6',
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
  { icon: 'tf-ion-social-freebsd-devil', color: 'var(--color2)', title: 'GAMING ARENA', text: 'Unleash your competitive side! Dive into an exciting gaming zone featuring thrilling challenges and mini-tournaments.' },
  { icon: 'tf-ion-person-stalker', color: 'var(--color3)', title: 'NETWORKING', text: 'Expand your branches of knowledge and identity further. Connect and collaborate with developers and tech enthusiasts on a single platform.' },
  { icon: 'tf-gift2', color: 'var(--color4)', title: 'GET SWAGS', text: "A day of knowledge packed sessions, events with empty stomach is just not fun! GDG Belgaum is making sure that your visit will surely leave the city on your mind. As a souvenir for our great journey, you'll also be getting some cool goodies and google badges." },
  { icon: 'tf-ion-code-working', color: 'var(--color1)', title: 'WORKSHOPS & CODE SESSIONS', text: 'A coding rendezvous with your friends plus hands-on experience for various workshops and sessions! What else could we ask for? Initiate your journey towards a new technology and get to learn it from experts.' },
  { icon: 'tf-ion-android-person', color: 'var(--color2)', title: "BE BELGAUM'S BEST DEVELOPER", text: "Put your skills to the test as you work your way through multiple rounds of coding, decoding for the title of Belgaum's Best Developer and $5,000 USD worth gifts. Do you have what it takes?" },
]

const S = '/images/about/Schedule/'
export const SCHEDULE = [
  { time: '9.00AM', title: 'Registration', color: 'var(--color2)', img: S + 'registration.png', text: 'Kickstart your event journey by registering here! Secure your spot and stay updated on all event activities.' },
  { time: '10.15AM', title: 'Inauguration Ceremony', color: 'var(--color2)', img: S + 'opening.png', text: "We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths. DevFest 2026 continues the journey that began with the very first DevFest Belgaum in 2022." },
  { time: '11.30AM', title: 'Technical talk 1', color: 'var(--color3)', img: S + 'techtalk1.png', text: 'Dive into the latest innovations as industry experts share insights, trends, and best practices. Learn about real-world applications and emerging opportunities.' },
  { time: '12.00AM', title: 'Tech Activity', color: 'var(--color3)', img: S + 'techactivity.png', text: 'Engage in hands-on activities designed to spark creativity and build technical skills. Collaborate with peers, tackle challenges, and explore new technologies through fun, interactive sessions.' },
  { time: '12.45PM', title: 'Tech Workshop', color: 'var(--color4)', img: S + 'techworkshop.png', text: 'Participate in an in-depth workshop to develop practical skills and explore advanced tech tools. Get guided, hands-on experience from industry experts.' },
  { time: '2.00PM', title: 'Lunch break', color: 'var(--color2)', img: S + 'pizza.png', text: 'Expand your branches of knowledge and identity further. Connect and collaborate with developers and tech enthusiasts on a single platform.' },
  { time: '3.15PM', title: 'Hackathon and Gaming Competation', color: 'var(--color2)', img: S + 'hackathon.webp', text: 'Unleash your creativity and coding skills in our hackathon, or test your reflexes in thrilling gaming challenges. Compete, collaborate, and aim for victory in a fun, high-energy environment!' },
  { time: '6.00PM', title: 'Cultural Activity', color: 'var(--color3)', img: S + 'cultural.png', text: 'Celebrate diversity and creativity with engaging cultural performances and activities. Experience a blend of art, music, and traditions that bring our community together.' },
  { time: '6.30PM', title: 'Falicitation and Prize Distribution', color: 'var(--color3)', img: S + 'prize.jpg', text: 'Conclude the event with a memorable ceremony, honoring standout achievements and distributing awards to our deserving winners' },
]

// Placeholder speakers use the DevFest 2026 profile badges until real photos are added.
const BADGES = ['blue', 'red', 'green', 'bell']
export const SPEAKERS = BADGES.map((b, i) => ({ name: `Speaker ${i + 1}`, img: `/images/2026/badge-${b}.png` }))
