export const INITIAL_COMPANIES = [
  // STRICTLY REMOTE COMPANIES
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Remote', // 'Remote' or 'Hybrid'
    logo: 'https://about.gitlab.com/ico/favicon-192x192.png',
    careersUrl: 'https://about.gitlab.com/jobs/',
    location: '100% Remote Worldwide',
    description: 'DevOps platform provided as a single application. 100% all-remote workforce across 65+ countries.',
    techStack: ['Ruby on Rails', 'Go', 'Vue.js', 'PostgreSQL', 'Kubernetes', 'GCP'],
    domain: 'DevOps / Open Source'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Remote',
    logo: 'https://cdn.zapier.com/zapier/images/favicon.ico',
    careersUrl: 'https://zapier.com/careers',
    location: '100% Remote Worldwide',
    description: 'Workflow automation for businesses. Fully remote team of over 800+ employees globally.',
    techStack: ['Python', 'Django', 'React', 'AWS', 'PostgreSQL', 'Kafka'],
    domain: 'Automation / SaaS'
  },
  {
    id: 'automattic',
    name: 'Automattic',
    category: 'Remote',
    logo: 'https://automattic.com/files/2021/04/cropped-automattic-icon-2021-192x192.png',
    careersUrl: 'https://automattic.com/work-with-us/',
    location: '100% Remote Worldwide',
    description: 'Creator of WordPress.com, WooCommerce, Tumblr, and Day One. Pioneer of distributed work.',
    techStack: ['PHP', 'JavaScript', 'React', 'Node.js', 'MySQL', 'Elasticsearch'],
    domain: 'Web & E-Commerce'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Remote',
    logo: 'https://supabase.com/favicon/favicon-192x192.png',
    careersUrl: 'https://supabase.com/careers',
    location: '100% Remote Worldwide',
    description: 'The Open Source Firebase Alternative. Built for developers worldwide.',
    techStack: ['Elixir', 'Go', 'PostgreSQL', 'TypeScript', 'Docker', 'Kubernetes'],
    domain: 'Developer Infrastructure / Cloud'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Remote',
    logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
    careersUrl: 'https://vercel.com/careers',
    location: 'Remote-First Worldwide',
    description: 'Creator of Next.js and frontend cloud platform for deployment and hosting.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Go', 'AWS', 'Rust'],
    domain: 'Frontend & Cloud Platforms'
  },
  {
    id: 'canonical',
    name: 'Canonical (Ubuntu)',
    category: 'Remote',
    logo: 'https://assets.ubuntu.com/v1/49a1a858-favicon-32x32.png',
    careersUrl: 'https://canonical.com/careers',
    location: '100% Remote Worldwide',
    description: 'Publisher of Ubuntu OS and open source cloud infrastructure tools.',
    techStack: ['Python', 'Go', 'C/C++', 'Linux Kernel', 'OpenStack', 'Kubernetes'],
    domain: 'Operating Systems & Cloud Infrastructure'
  },
  {
    id: 'elastic',
    name: 'Elastic',
    category: 'Remote',
    logo: 'https://static-www.elastic.co/v3/assets/bltefdd0b5372409d9a/blt725fb63cefc755c3/5e8188188174415843b0ce94/favicon-192x192.png',
    careersUrl: 'https://www.elastic.co/careers',
    location: 'Distributed Worldwide (Remote)',
    description: 'Creator of Elasticsearch, Logstash, and Kibana (ELK Stack). Distributed by design.',
    techStack: ['Java', 'Go', 'Elasticsearch', 'Kafka', 'React', 'Docker'],
    domain: 'Search & Data Analytics'
  },
  {
    id: 'toggl',
    name: 'Toggl',
    category: 'Remote',
    logo: 'https://toggl.com/blog/wp-content/uploads/2020/09/toggl-track-favicon.png',
    careersUrl: 'https://toggl.com/jobs/',
    location: '100% Remote Worldwide',
    description: 'Time tracking and productivity tools used by millions of teams globally.',
    techStack: ['Go', 'PostgreSQL', 'React', 'Ruby', 'Docker', 'GCP'],
    domain: 'Productivity & SaaS'
  },
  {
    id: 'doist',
    name: 'Doist',
    category: 'Remote',
    logo: 'https://doist.com/favicon.ico',
    careersUrl: 'https://doist.com/careers',
    location: '100% Remote Worldwide',
    description: 'Creators of Todoist and Twist. Async-first remote culture spanning 35+ countries.',
    techStack: ['Python', 'React', 'Swift', 'Kotlin', 'PostgreSQL', 'Redis'],
    domain: 'Productivity & Collaboration'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    category: 'Remote',
    logo: 'https://duckduckgo.com/favicon.ico',
    careersUrl: 'https://duckduckgo.com/hiring',
    location: '100% Remote Worldwide',
    description: 'Privacy-focused search engine and web browser built by a fully remote global team.',
    techStack: ['Perl', 'Python', 'JavaScript', 'PostgreSQL', 'Linux', 'AWS'],
    domain: 'Search & Consumer Privacy'
  },
  {
    id: 'sourcegraph',
    name: 'Sourcegraph',
    category: 'Remote',
    logo: 'https://sourcegraph.com/favicon.png',
    careersUrl: 'https://about.sourcegraph.com/careers',
    location: 'Remote-First Worldwide',
    description: 'Code intelligence platform and AI code assistant (Cody) for developers.',
    techStack: ['Go', 'TypeScript', 'React', 'GraphQL', 'PostgreSQL', 'Docker'],
    domain: 'Developer Tools & AI'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    category: 'Remote',
    logo: 'https://assets-cms.kraken.com/images/512x512.png',
    careersUrl: 'https://www.kraken.com/careers',
    location: '100% Remote Worldwide',
    description: 'Global crypto exchange & digital asset platform.',
    techStack: ['PHP', 'Rust', 'Go', 'React', 'Kafka', 'C++'],
    domain: 'Fintech & Blockchain'
  },

  // MIXED / HYBRID / ON-SITE COMPANIES
  {
    id: 'google',
    name: 'Google',
    category: 'Hybrid',
    logo: 'https://www.google.com/favicon.ico',
    careersUrl: 'https://www.google.com/about/careers/applications/jobs/results/',
    location: 'Hybrid / Office Hubs Worldwide',
    description: 'Global tech giant specializing in Search, Cloud, AI, Android, and Infrastructure.',
    techStack: ['Java', 'C++', 'Go', 'Python', 'Angular', 'Kubernetes', 'GCP'],
    domain: 'Cloud, AI & Big Tech'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Hybrid',
    logo: 'https://www.microsoft.com/favicon.ico',
    careersUrl: 'https://careers.microsoft.com/',
    location: 'Hybrid / Global Hubs',
    description: 'Cloud computing (Azure), enterprise software, developer platforms (GitHub), and AI.',
    techStack: ['C# / .NET', 'TypeScript', 'React', 'Java', 'Azure', 'SQL Server'],
    domain: 'Enterprise & Cloud'
  },
  {
    id: 'amazon',
    name: 'Amazon / AWS',
    category: 'Hybrid',
    logo: 'https://www.amazon.com/favicon.ico',
    careersUrl: 'https://www.amazon.jobs/',
    location: 'Hybrid / Global Tech Hubs',
    description: 'E-commerce and cloud computing pioneer (AWS). Large backend Java & microservices footprint.',
    techStack: ['Java', 'Spring Boot', 'C++', 'Go', 'AWS', 'DynamoDB', 'NoSQL'],
    domain: 'E-Commerce & Cloud'
  },
  {
    id: 'meta',
    name: 'Meta (Facebook)',
    category: 'Hybrid',
    logo: 'https://static.xx.fbcdn.net/rsrc.php/yT/r/a9fB2Wit0ZJ.ico',
    careersUrl: 'https://www.metacareers.com/',
    location: 'Hybrid / Global Tech Hubs',
    description: 'Social networking, VR, and AI research (PyTorch, LLaMA, React).',
    techStack: ['Python', 'C++', 'Hack / PHP', 'React', 'PyTorch', 'MySQL'],
    domain: 'Social Media & AI'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Hybrid',
    logo: 'https://stripe.com/favicon.ico',
    careersUrl: 'https://stripe.com/jobs',
    location: 'Hybrid / Remote Hubs',
    description: 'Financial infrastructure for the internet. Powers payments for millions of businesses.',
    techStack: ['Ruby', 'Java', 'Go', 'React', 'Scala', 'MongoDB', 'AWS'],
    domain: 'Fintech & Payments'
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    category: 'Hybrid',
    logo: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon-32x32.png',
    careersUrl: 'https://www.atlassian.com/company/careers',
    location: 'Team Anywhere (Hybrid / Remote options)',
    description: 'Creators of Jira, Confluence, Trello, and Bitbucket. High scale Java & Cloud systems.',
    techStack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'GraphQL'],
    domain: 'Developer Collaboration & SaaS'
  },
  {
    id: 'uber',
    name: 'Uber',
    category: 'Hybrid',
    logo: 'https://www.uber.com/favicon.ico',
    careersUrl: 'https://www.uber.com/us/en/careers/',
    location: 'Hybrid / Tech Hubs Worldwide',
    description: 'Global mobility & logistics network operating high-concurrency microservices.',
    techStack: ['Go', 'Java', 'Python', 'React', 'Kafka', 'Cassandra', 'MySQL'],
    domain: 'Mobility & Distributed Systems'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    category: 'Hybrid',
    logo: 'https://www.coinbase.com/favicon.ico',
    careersUrl: 'https://www.coinbase.com/careers',
    location: 'Remote-First / Hybrid Hubs',
    description: 'Leading cryptocurrency exchange platform providing financial technology infrastructure.',
    techStack: ['Go', 'React', 'Ruby', 'Node.js', 'AWS', 'PostgreSQL'],
    domain: 'Fintech & Crypto'
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'Hybrid',
    logo: 'https://www.snowflake.com/wp-content/themes/snowflake/favicon.ico',
    careersUrl: 'https://careers.snowflake.com/',
    location: 'Hybrid / Office Hubs',
    description: 'Data Cloud platform providing high-performance data warehousing and analytics.',
    techStack: ['Java', 'C++', 'Go', 'React', 'AWS', 'Azure', 'Distributed Systems'],
    domain: 'Data Warehouse & Cloud'
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'Hybrid',
    logo: 'https://www.datadoghq.com/favicon.ico',
    careersUrl: 'https://www.datadoghq.com/careers/',
    location: 'Hybrid / Global Hubs',
    description: 'Monitoring and security platform for cloud-scale applications and infrastructure.',
    techStack: ['Go', 'Python', 'C++', 'React', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    domain: 'Observability & Cloud Security'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Hybrid',
    logo: 'https://www.salesforce.com/favicon.ico',
    careersUrl: 'https://careers.salesforce.com/',
    location: 'Hybrid / Office Hubs',
    description: 'World leading CRM cloud platform and enterprise software ecosystem.',
    techStack: ['Java', 'Apex', 'React', 'Python', 'Oracle', 'AWS'],
    domain: 'Enterprise CRM & Cloud'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Hybrid',
    logo: 'https://open.spotifycdn.com/cdn/images/favicon32.45ab7fc1.png',
    careersUrl: 'https://lifeatspotify.com/',
    location: 'Work From Anywhere (Hybrid / Remote)',
    description: 'Audio streaming subscription service serving over 500 million active users.',
    techStack: ['Java', 'Python', 'C++', 'React', 'GCP', 'BigQuery'],
    domain: 'Audio & Streaming Systems'
  }
];
