/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  password?: string; // Stored securely on server-side only
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  author: string;
  authorAvatar: string;
  createdAt: string;
  views: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedCaseStudy?: string;
  client?: string;
  category: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  launchDate?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  imageUrl: string;
  featured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  replyContent?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface AnalyticsStats {
  viewsCount: number;
  messagesCount: number;
  subscribersCount: number;
  projectsCount: number;
  unreadMessagesCount: number;
  trafficSource: { source: string; count: number }[];
  leadsByDay: { date: string; count: number }[];
  categoryDistribution: { category: string; count: number }[];
}
