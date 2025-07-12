import { users, swapRequests, type User, type InsertUser, type SwapRequest, type InsertSwapRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPublicUsers(): Promise<User[]>;
  createSwapRequest(request: InsertSwapRequest): Promise<SwapRequest>;
  getSwapRequestsByUser(userId: number): Promise<SwapRequest[]>;
  updateSwapRequestStatus(id: number, status: string): Promise<SwapRequest | undefined>;
  deleteSwapRequest(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private swapRequests: Map<number, SwapRequest>;
  private currentUserId: number;
  private currentSwapRequestId: number;

  constructor() {
    this.users = new Map();
    this.swapRequests = new Map();
    this.currentUserId = 1;
    this.currentSwapRequestId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockUsers = [
      {
        id: 1,
        username: "sarah_chen",
        password: "password123",
        name: "Sarah Chen",
        email: "sarah@example.com",
        location: "San Francisco, CA",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["UI/UX Design", "Figma", "Prototyping"],
        skillsWanted: ["React", "Node.js"],
        availability: "weekends",
        rating: 48,
        isPublic: true
      },
      {
        id: 2,
        username: "michael_torres",
        password: "password123",
        name: "Michael Torres",
        email: "michael@example.com",
        location: "Austin, TX",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["JavaScript", "Python", "Web Development"],
        skillsWanted: ["Digital Marketing", "SEO"],
        availability: "evenings",
        rating: 42,
        isPublic: true
      },
      {
        id: 3,
        username: "emily_rodriguez",
        password: "password123",
        name: "Emily Rodriguez",
        email: "emily@example.com",
        location: "New York, NY",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["Photography", "Photoshop", "Video Editing"],
        skillsWanted: ["Graphic Design", "Illustration"],
        availability: "flexible",
        rating: 49,
        isPublic: true
      },
      {
        id: 4,
        username: "david_kim",
        password: "password123",
        name: "David Kim",
        email: "david@example.com",
        location: "Seattle, WA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["Data Analysis", "Excel", "SQL"],
        skillsWanted: ["Machine Learning", "Statistics"],
        availability: "weekends",
        rating: 46,
        isPublic: true
      },
      {
        id: 5,
        username: "lisa_johnson",
        password: "password123",
        name: "Lisa Johnson",
        email: "lisa@example.com",
        location: "Chicago, IL",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["Content Writing", "Copywriting", "Blog Writing"],
        skillsWanted: ["SEO", "Marketing"],
        availability: "evenings",
        rating: 47,
        isPublic: true
      },
      {
        id: 6,
        username: "alex_thompson",
        password: "password123",
        name: "Alex Thompson",
        email: "alex@example.com",
        location: "Denver, CO",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150",
        skillsOffered: ["Guitar", "Music Theory", "Audio Production"],
        skillsWanted: ["Piano", "Singing"],
        availability: "flexible",
        rating: 43,
        isPublic: true
      }
    ];

    mockUsers.forEach(user => {
      this.users.set(user.id, user);
    });
    
    this.currentUserId = 7;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, rating: 0 };
    this.users.set(id, user);
    return user;
  }

  async getPublicUsers(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.isPublic);
  }

  async createSwapRequest(insertRequest: InsertSwapRequest): Promise<SwapRequest> {
    const id = this.currentSwapRequestId++;
    const request: SwapRequest = { ...insertRequest, id, status: "pending" };
    this.swapRequests.set(id, request);
    return request;
  }

  async getSwapRequestsByUser(userId: number): Promise<SwapRequest[]> {
    return Array.from(this.swapRequests.values()).filter(
      request => request.fromUserId === userId || request.toUserId === userId
    );
  }

  async updateSwapRequestStatus(id: number, status: string): Promise<SwapRequest | undefined> {
    const request = this.swapRequests.get(id);
    if (request) {
      request.status = status;
      this.swapRequests.set(id, request);
      return request;
    }
    return undefined;
  }

  async deleteSwapRequest(id: number): Promise<boolean> {
    return this.swapRequests.delete(id);
  }
}

export const storage = new MemStorage();
