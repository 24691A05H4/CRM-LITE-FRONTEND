// src/data/sampleLeads.js

/**
 * Array of sample leads used as initial data for the CRM.
 * Upgraded schema with values, owners, and stage progression timestamps 
 * for advanced analytics visualizations.
 */
export const sampleLeads = [
  {
    id: 'lead-1',
    name: 'Aarav Patel',
    company: 'TechFlow Solutions',
    email: 'aarav.patel@techflow.in',
    phone: '+91 98765 43210',
    status: 'New',
    source: 'Website',
    value: 25000,
    owner: 'Sarah',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: null,
    meetingAt: null,
    proposalAt: null,
    wonAt: null
  },
  {
    id: 'lead-2',
    name: 'Priya Sharma',
    company: 'Innovate India',
    email: 'priya.sharma@innovateindia.com',
    phone: '+91 87654 32109',
    status: 'Contacted',
    source: 'LinkedIn',
    value: 45000,
    owner: 'Alex',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: null,
    proposalAt: null,
    wonAt: null
  },
  {
    id: 'lead-3',
    name: 'Rahul Desai',
    company: 'Desai Enterprises',
    email: 'rahul@desaienterprises.co.in',
    phone: '+91 76543 21098',
    status: 'Won',
    source: 'Referral',
    value: 120000,
    owner: 'Sarah',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    proposalAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    wonAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'lead-4',
    name: 'Neha Gupta',
    company: 'Gupta Logistics',
    email: 'neha.gupta@guptalogistics.com',
    phone: '+91 65432 10987',
    status: 'Lost',
    source: 'Cold Call',
    value: 85000,
    owner: 'David',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    proposalAt: null,
    wonAt: null
  },
  {
    id: 'lead-5',
    name: 'Vikram Singh',
    company: 'Singh Tech',
    email: 'vikram.singh@singhtech.in',
    phone: '+91 54321 09876',
    status: 'Meeting Scheduled', // Equivalent to "Meeting"
    source: 'Email Campaign',
    value: 60000,
    owner: 'Alex',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    proposalAt: null,
    wonAt: null
  },
  {
    id: 'lead-6',
    name: 'Anjali Verma',
    company: 'Verma Consulting',
    email: 'anjali.verma@vermaconsulting.com',
    phone: '+91 99887 76655',
    status: 'New',
    source: 'Other',
    value: 15000,
    owner: 'Sarah',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: null,
    meetingAt: null,
    proposalAt: null,
    wonAt: null
  },
  {
    id: 'lead-7',
    name: 'Sanjay Kumar',
    company: 'Kumar Industries',
    email: 'sanjay@kumar.in',
    phone: '+91 77766 55544',
    status: 'Proposal Sent', // Equivalent to "Proposal"
    source: 'LinkedIn',
    value: 210000,
    owner: 'David',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    proposalAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    wonAt: null
  },
  {
    id: 'lead-8',
    name: 'Meera Reddy',
    company: 'Reddy Builders',
    email: 'meera@reddybuilders.co.in',
    phone: '+91 99881 12233',
    status: 'Won',
    source: 'Website',
    value: 360000,
    owner: 'Alex',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    contactedAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString(),
    meetingAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    proposalAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    wonAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  }
];
