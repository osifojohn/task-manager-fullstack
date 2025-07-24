import mongoose from 'mongoose';

import User from '../models/User';
import Task from '../models/Task';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager'
    );
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('🧹 Cleared existing data');

    const userData = {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      password: 'password123',
    };

    const user = await User.create(userData);
    console.log('👤 User created:', user.email);

    const tasksData = [
      // High Priority Tasks - Upcoming Deadlines
      {
        title: 'Q3 Financial Review',
        description:
          'Analyze Q3 financial performance and prepare board presentation with key metrics and recommendations',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['finance', 'quarterly', 'board', 'presentation'],
          dueDate: new Date('2025-08-10'),
          estimatedHours: 12,
          actualHours: 8,
          notes: 'Waiting for final numbers from accounting team',
        },
      },
      {
        title: 'Database Migration Test',
        description:
          'Test database migration scripts and validate data integrity',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['database', 'migration', 'testing', 'data-integrity'],
          dueDate: new Date('2025-08-04'),
          estimatedHours: 12,
          actualHours: 8,
          notes:
            'Testing environment setup complete, running validation scripts',
        },
      },
      {
        title: 'Mobile App Optimization',
        description:
          'Optimize mobile application performance and reduce loading times by 30%',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['mobile', 'performance', 'optimization', 'app'],
          dueDate: new Date('2025-07-30'),
          estimatedHours: 16,
          notes:
            'Performance baseline established, need to implement lazy loading',
        },
      },
      {
        title: 'Website Accessibility',
        description:
          'Update company website to meet WCAG 2.1 AA compliance standards',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['website', 'accessibility', 'wcag', 'compliance'],
          dueDate: new Date('2025-07-27'),
          estimatedHours: 15,
          notes:
            'Audit completed, need to implement alt text and keyboard navigation fixes',
        },
      },
      {
        title: 'API Rate Limiting',
        description:
          'Implement rate limiting and throttling for public API endpoints',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['api', 'rate-limiting', 'security', 'backend'],
          dueDate: new Date('2025-07-29'),
          estimatedHours: 8,
          notes:
            'Need to define rate limits per user tier and implement Redis caching',
        },
      },
      {
        title: 'Performance Monitoring',
        description:
          'Set up comprehensive application performance monitoring and alerting',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['monitoring', 'performance', 'alerting', 'devops'],
          dueDate: new Date('2025-07-30'),
          estimatedHours: 14,
          actualHours: 7,
          notes:
            'Monitoring tools configured, working on custom alert thresholds',
        },
      },

      // Medium Priority Tasks
      {
        title: 'Security Compliance Audit',
        description:
          'Prepare for annual SOC 2 Type II audit and ensure all security controls are documented',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['security', 'compliance', 'audit', 'soc2'],
          dueDate: new Date('2025-08-30'),
          estimatedHours: 25,
          actualHours: 15,
          notes:
            'Working with external auditors, need to update incident response procedures',
        },
      },
      {
        title: 'Cybersecurity Training',
        description:
          'Develop and deliver cybersecurity awareness training for all employees',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['cybersecurity', 'training', 'awareness', 'employees'],
          dueDate: new Date('2025-08-31'),
          estimatedHours: 16,
          actualHours: 9,
          notes:
            'Training modules created, scheduling sessions with department heads',
        },
      },
      {
        title: 'Backup Testing',
        description:
          'Conduct quarterly disaster recovery testing and update backup procedures',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['backup', 'disaster-recovery', 'testing', 'data'],
          dueDate: new Date('2025-08-31'),
          estimatedHours: 10,
          actualHours: 4,
          notes:
            'Database backup testing successful, working on application data recovery',
        },
      },
      {
        title: 'AI Integration Strategy',
        description:
          'Develop comprehensive strategy for integrating AI tools across all departments',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['ai', 'strategy', 'innovation', 'digital-transformation'],
          dueDate: new Date('2025-09-01'),
          estimatedHours: 20,
          notes:
            'Research ChatGPT Enterprise, Claude for Work, and Microsoft Copilot options',
        },
      },
      {
        title: 'Code Review Documentation',
        description:
          'Document and standardize code review processes for development team',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['code-review', 'documentation', 'development', 'process'],
          dueDate: new Date('2025-09-05'),
          estimatedHours: 4,
          notes: 'Team input gathered, need to formalize guidelines document',
        },
      },
      {
        title: 'Customer Feedback Dashboard',
        description:
          'Create interactive dashboard to visualize customer feedback trends and sentiment analysis',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: [
            'analytics',
            'dashboard',
            'customer-feedback',
            'visualization',
          ],
          dueDate: new Date('2025-09-10'),
          estimatedHours: 22,
          actualHours: 12,
          notes:
            'Data pipeline established, working on visualization components',
        },
      },
      {
        title: 'Cloud Migration Phase 3',
        description:
          'Complete migration of legacy systems to AWS cloud infrastructure',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['cloud', 'aws', 'migration', 'infrastructure'],
          dueDate: new Date('2025-09-15'),
          estimatedHours: 40,
          actualHours: 28,
          notes: 'Database migration completed, working on application servers',
        },
      },
      {
        title: 'Social Media Calendar Q4',
        description:
          'Plan and create content calendar for Q4 social media campaigns',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['social-media', 'content', 'marketing', 'q4'],
          dueDate: new Date('2025-09-15'),
          estimatedHours: 14,
          notes:
            'Holiday season focus, need to align with product launch timeline',
        },
      },
      {
        title: 'Customer Retention Analysis',
        description:
          'Analyze customer retention patterns and develop improvement strategies',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['retention', 'analysis', 'customer', 'strategy'],
          dueDate: new Date('2025-09-15'),
          estimatedHours: 18,
          actualHours: 11,
          notes: 'Data analysis 70% complete, identified key retention factors',
        },
      },
      {
        title: 'Knowledge Base Updates',
        description:
          'Update and reorganize customer support knowledge base articles',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['knowledge-base', 'documentation', 'support', 'customer'],
          dueDate: new Date('2025-09-20'),
          estimatedHours: 8,
          actualHours: 3,
          notes: 'Identified outdated articles, working on content updates',
        },
      },
      {
        title: 'Email Template Redesign',
        description:
          'Create new email templates that align with updated brand guidelines',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['email', 'marketing', 'templates', 'branding'],
          dueDate: new Date('2025-09-25'),
          estimatedHours: 6,
          notes: 'Brand guidelines finalized, ready to start template design',
        },
      },
      {
        title: 'Employee Performance System',
        description:
          'Implement new digital performance review system to replace manual processes',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['hr', 'performance', 'system', 'digital'],
          dueDate: new Date('2025-09-30'),
          estimatedHours: 18,
          actualHours: 10,
          notes:
            'Testing phase in progress, positive feedback from pilot group',
        },
      },
      {
        title: 'Employee Handbook Update',
        description:
          'Revise employee handbook with new policies and remote work guidelines',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['hr', 'handbook', 'policies', 'remote-work'],
          dueDate: new Date('2025-09-30'),
          estimatedHours: 6,
          notes: 'Need to include AI usage policy and updated PTO procedures',
        },
      },
      {
        title: 'Client Onboarding Automation',
        description:
          'Automate client onboarding process to reduce manual work by 60%',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['automation', 'onboarding', 'client', 'efficiency'],
          dueDate: new Date('2025-09-30'),
          estimatedHours: 25,
          notes: 'Workflow mapped, need to implement automated email sequences',
        },
      },
      {
        title: 'Product Launch Campaign',
        description:
          'Coordinate marketing campaign for new product launch scheduled for Q4 2025',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['marketing', 'product-launch', 'campaign', 'q4'],
          dueDate: new Date('2025-10-01'),
          estimatedHours: 30,
          notes:
            'Need to finalize messaging and creative assets with marketing team',
        },
      },
      {
        title: 'Office Space Redesign',
        description:
          'Plan and coordinate office space redesign to support hybrid work model',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['office', 'redesign', 'hybrid-work', 'facilities'],
          dueDate: new Date('2025-10-15'),
          estimatedHours: 20,
          actualHours: 8,
          notes:
            'Initial designs approved, working with contractors for quotes',
        },
      },
      {
        title: 'Project Management Migration',
        description:
          'Migrate from current PM tool to new platform with better integration',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['project-management', 'migration', 'tools', 'integration'],
          dueDate: new Date('2025-10-15'),
          estimatedHours: 20,
          notes: 'Tool evaluation completed, Notion and ClickUp shortlisted',
        },
      },
      {
        title: 'Customer Success Dashboard',
        description:
          'Create dashboard to track customer success KPIs and churn indicators',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['customer-success', 'metrics', 'dashboard', 'kpi'],
          dueDate: new Date('2025-10-20'),
          estimatedHours: 15,
          notes:
            'KPIs defined, need to connect data sources and build visualizations',
        },
      },
      {
        title: 'App Store Optimization',
        description:
          'Optimize app store listings to improve download rates and visibility',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['mobile', 'app-store', 'optimization', 'marketing'],
          dueDate: new Date('2025-10-30'),
          estimatedHours: 8,
          notes:
            'Keyword research completed, need to update screenshots and descriptions',
        },
      },
      {
        title: 'Inventory System Upgrade',
        description:
          'Research and evaluate new inventory management software options',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['inventory', 'software', 'evaluation', 'upgrade'],
          dueDate: new Date('2025-10-31'),
          estimatedHours: 12,
          notes: 'Initial vendor list compiled, need to schedule demos',
        },
      },
      {
        title: 'Conference Presentation Prep',
        description:
          'Prepare presentation for Tech Conference 2025 on digital transformation',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['conference', 'presentation', 'speaking', 'tech'],
          dueDate: new Date('2025-11-01'),
          estimatedHours: 10,
          actualHours: 3,
          notes: 'Outline completed, working on slide deck and demos',
        },
      },
      {
        title: 'UX Research Study Q4',
        description:
          'Conduct user experience research study for product improvement insights',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['ux', 'research', 'user-experience', 'product'],
          dueDate: new Date('2025-11-15'),
          estimatedHours: 22,
          notes: 'Research methodology approved, need to recruit participants',
        },
      },
      {
        title: 'Annual Budget Planning 2026',
        description:
          'Prepare detailed budget proposal for 2026 fiscal year across all departments',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'high',
          tags: ['budget', 'planning', '2026', 'finance'],
          dueDate: new Date('2025-11-30'),
          estimatedHours: 30,
          notes:
            'Department heads meetings scheduled to gather budget requirements',
        },
      },
      {
        title: 'Sustainability Initiative',
        description:
          'Develop company-wide sustainability program and carbon footprint reduction plan',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['sustainability', 'environment', 'initiative', 'carbon'],
          dueDate: new Date('2025-12-01'),
          estimatedHours: 18,
          notes: 'Initial assessment completed, need to set reduction targets',
        },
      },
      {
        title: 'Vendor Performance Review',
        description:
          'Conduct annual performance review of all major vendors and service providers',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['vendor', 'performance', 'review', 'annual'],
          dueDate: new Date('2025-12-15'),
          estimatedHours: 12,
          notes:
            'Evaluation criteria defined, need to gather stakeholder feedback',
        },
      },
      {
        title: 'Digital Asset Management',
        description:
          'Implement system for organizing and managing company digital assets',
        status: 'pending',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['digital-assets', 'management', 'organization', 'system'],
          dueDate: new Date('2025-12-31'),
          estimatedHours: 16,
          notes: 'Asset audit completed, evaluating cloud storage solutions',
        },
      },

      // Completed Tasks
      {
        title: 'Vendor Contract Renewals',
        description:
          'Review and negotiate renewals for software licenses and service contracts',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['contracts', 'vendors', 'procurement', 'renewals'],
          dueDate: new Date('2025-07-31'),
          estimatedHours: 8,
          actualHours: 6,
          notes:
            'Successfully negotiated 15% cost reduction on main software licenses',
        },
      },
      {
        title: 'CRM Training',
        description:
          'Conduct comprehensive training sessions for sales team on new CRM platform',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['training', 'crm', 'sales', 'onboarding'],
          dueDate: new Date('2025-07-15'),
          estimatedHours: 12,
          actualHours: 14,
          notes:
            'Training completed, created video tutorials for future reference',
        },
      },
      {
        title: 'Team Building Event',
        description:
          'Organize Q3 team building activity and coordinate logistics',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['team-building', 'event', 'hr', 'quarterly'],
          dueDate: new Date('2025-07-20'),
          estimatedHours: 5,
          actualHours: 4,
          notes: 'Successful event at local escape room, great team feedback',
        },
      },
      {
        title: 'Status Report Automation',
        description:
          'Automate weekly project status reports using dashboard data',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['automation', 'reporting', 'dashboard', 'weekly'],
          dueDate: new Date('2025-07-10'),
          estimatedHours: 4,
          actualHours: 5,
          notes: 'Automation implemented successfully, saving 2 hours per week',
        },
      },
      {
        title: 'Remote Work Policy Update',
        description:
          'Update remote work policies based on 2025 best practices and employee feedback',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['remote-work', 'policy', 'hr', 'feedback'],
          dueDate: new Date('2025-06-30'),
          estimatedHours: 8,
          actualHours: 10,
          notes:
            'Policy updated and approved, received positive employee feedback',
        },
      },
      {
        title: 'Compliance Training Update',
        description:
          'Update mandatory compliance training content for 2025 regulations',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'medium',
          tags: ['compliance', 'training', 'regulations', 'content'],
          dueDate: new Date('2025-07-01'),
          estimatedHours: 10,
          actualHours: 12,
          notes: 'Content updated and deployed, tracking completion rates',
        },
      },
      {
        title: 'Slack Workspace Optimization',
        description:
          'Reorganize Slack channels and implement better communication workflows',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['slack', 'communication', 'workflow', 'optimization'],
          dueDate: new Date('2025-07-05'),
          estimatedHours: 3,
          actualHours: 4,
          notes: 'Channel structure improved, team adoption going well',
        },
      },
      {
        title: 'Internal Newsletter Launch',
        description:
          'Launch monthly internal newsletter to improve company communication',
        status: 'done',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['newsletter', 'communication', 'internal', 'monthly'],
          dueDate: new Date('2025-06-15'),
          estimatedHours: 6,
          actualHours: 8,
          notes:
            'First three editions published successfully, positive employee engagement',
        },
      },
      {
        title: 'Competitor Analysis Q3',
        description:
          'Research and analyze competitor strategies and market positioning',
        status: 'in-progress',
        userId: user._id,
        extras: {
          priority: 'low',
          tags: ['competitor', 'analysis', 'market', 'research'],
          dueDate: new Date('2025-08-30'),
          estimatedHours: 10,
          actualHours: 6,
          notes:
            'Gathered data on top 5 competitors, analyzing pricing strategies',
        },
      },
    ];

    const tasks = await Task.insertMany(tasksData);
    console.log(`📋 Created ${tasks.length} tasks`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log(`👤 Users: 1`);
    console.log(`📋 Tasks: ${tasks.length}`);
    console.log('\n🔐 Test Login Credentials:');
    console.log(`Email: ${userData.email}`);
    console.log(`Password: ${userData.password}`);

    console.log('\n📈 Task Status Distribution:');
    const statusCount = tasks.reduce((acc: any, task: any) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    Object.entries(statusCount).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    console.log('\n⏰ Upcoming Deadlines (Next 7 Days):');
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingTasks = tasks.filter((task: any) => {
      const dueDate = new Date(task.extras.dueDate);
      return dueDate >= now && dueDate <= nextWeek;
    });

    upcomingTasks.forEach((task: any) => {
      console.log(
        `  📅 ${task.title} - Due: ${task.extras.dueDate.toDateString()}`
      );
    });
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

const runSeeder = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error('❌ Seeder execution failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

//  seeder only run if this file is executed directly
if (require.main === module) {
  runSeeder();
}

export { seedDatabase, runSeeder };
