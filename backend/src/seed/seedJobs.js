
import dotenv from 'dotenv';
import connectDB from '../utils/db.js';
import Job from '../models/Job.js';

dotenv.config();

const jobs = [
  {
    title: 'Frontend Developer',
    company: 'TATA ',
    location: 'Remote',
    description: 'Build responsive UI with React. Collaborate with designers and backend engineers.',
    requirements: ['React', 'JavaScript', 'REST/JSON', 'Git']
  },
  {
    title: 'Backend Engineer',
    company: 'ABC Systems',
    location: 'Bengaluru, INDIA',
    description: 'Build responsive UI with React. Collaborate with designers and backend engineers.',
    requirements: ['Node.js', 'Express', 'MongoDB', 'JWT']
  },
  {
    title: 'Full Stack Developer',
    company: 'XYZ Labs',
    location: 'Hyderabad, INDIA',
    description: 'Build responsive UI with React. Collaborate with designers and backend engineers.',
    requirements: ['React', 'Node.js', 'MongoDB', 'Multer', 'AWS']
  }
  ,
  {
    title: 'Data Scientist',
    company: 'Delta Analytics',
    location: 'Remote',
    description: 'Analyze data, build predictive models, and visualize insights.',
    requirements: ['Python', 'Pandas',  'Machine Learning']
  },
  {
    title: 'DevOps Engineer',
    company: 'ABC Cloud',
    location: 'Ahemdabad',
    description: 'Manage CI/CD pipelines, cloud infrastructure, and system monitoring.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
    {
    title: 'Frontend Developer',
    company: 'TATA Tech',
    location: 'Remote',
    description: 'Build responsive UI with React. Collaborate with designers and backend engineers.',
    requirements: ['React', 'JavaScript', 'REST/JSON', 'Git']
  },
  {
    title: 'Backend Engineer',
    company: 'Acc Systems',
    location: 'Bengaluru',
    description: 'Design REST APIs with Node/Express, integrate MongoDB, ensure scalability.',
    requirements: ['Node.js', 'Express', 'MongoDB', 'JWT']
  },
  {
    title: 'Full Stack Developer',
    company: 'AX Labs',
    location: 'Hyderabad, INDIA',
    description: 'Own features end-to-end across frontend and backend using MERN stack.',
    requirements: ['React', 'Node.js', 'MongoDB', 'Multer', 'AWS (nice to have)']
  },
  {
    title: 'Data Scientist',
    company: 'Y Analytics',
    location: 'Remote',
    description: 'Analyze data, build predictive models, and visualize insights.',
    requirements: ['Python', 'Pandas', 'NumPy', 'Machine Learning']
  },
  {
    title: 'DevOps Engineer',
    company: 'ABB Cloud',
    location: 'Ahemdabad',
    description: 'Manage CI/CD pipelines, cloud infrastructure, and system monitoring.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
    
  {
    title: 'Full Stack Developer',
    company: 'ZX Labs',
    location: 'Hyderabad, INDIA',
    description: 'Own features end-to-end across frontend and backend using MERN stack.',
    requirements: ['React', 'Node.js', 'MongoDB', 'Multer', 'AWS (nice to have)']
  },
  {
    title: 'Data Scientist',
    company: 'JK Analytics',
    location: 'Remote',
    description: 'Analyze data, build predictive models, and visualize insights.',
    requirements: ['Python', 'Pandas', 'NumPy', 'Machine Learning']
  },
  {
    title: 'DevOps Engineer',
    company: 'ACO Cloud',
    location: 'Ahemdabad',
    description: 'Manage CI/CD pipelines, cloud infrastructure, and system monitoring.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
];

(async () => {
  try {
    await connectDB();
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log('Seeded jobs successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();
