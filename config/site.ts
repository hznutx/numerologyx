export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Numerologyx',
  description: 'เบอร์มงคลที่ช่วยให้คุณประสบความสำเร็จ',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },

    {
      label: 'วิเคราะห์เบอร์ปัจจุบัน',
      href: '/check',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },

    {
      label: 'Projects',
      href: '/projects',
    },
  ],
  links: {
    github: 'https://github.com/hznutx',
    twitter: 'https://twitter.com/hznutx',
    discord: 'https://discord.gg/ZVkpqCWX',
    sponsor: 'https://i.ibb.co/8LhJnyht/image0.jpg',
  },
};
