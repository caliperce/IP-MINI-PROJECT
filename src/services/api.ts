import type {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  EventParticipation,
} from '../types';

const STUDENT_SERVICE_URL = 'http://localhost:8081/api';
const EVENT_SERVICE_URL = 'http://localhost:8082/api';

// Mock data for demo mode
export const MOCK_LOGIN_RESPONSE: LoginResponse = {
  rollNumber: 'CS2024001',
  name: 'Aishwarya Sharma',
  email: 'aishwarya@college.edu',
};

export const MOCK_EVENTS: EventParticipation[] = [
  {
    id: 1,
    studentName: 'Aishwarya Sharma',
    rollNumber: 'CS2024001',
    eventName: 'National Hackathon 2024',
    eventLocation: 'Innovation Hub, Bangalore',
    eventDate: '2024-03-15',
    eventDescription:
      'A 48-hour national-level hackathon focused on AI and sustainability. Students collaborate to build impactful solutions for real-world problems.',
  },
  {
    id: 2,
    studentName: 'Aishwarya Sharma',
    rollNumber: 'CS2024001',
    eventName: 'Tech Symposium — Future of Computing',
    eventLocation: 'Auditorium Block A, IIT Delhi',
    eventDate: '2024-04-02',
    eventDescription:
      'An annual symposium bringing together industry leaders and students to discuss the future of quantum computing, edge AI, and distributed systems.',
  },
  {
    id: 3,
    studentName: 'Aishwarya Sharma',
    rollNumber: 'CS2024001',
    eventName: 'Design Sprint Workshop',
    eventLocation: 'Design Lab, NIFT Campus',
    eventDate: '2024-04-20',
    eventDescription:
      'A hands-on design sprint workshop where students learn rapid prototyping, user research, and the Google Design Sprint methodology over five intensive days.',
  },
  {
    id: 4,
    studentName: 'Aishwarya Sharma',
    rollNumber: 'CS2024001',
    eventName: 'Open Source Summit',
    eventLocation: 'Tech Park Convention Center, Hyderabad',
    eventDate: '2024-05-10',
    eventDescription:
      'The largest open source conference in South Asia, featuring workshops, talks from core maintainers, and contribution sprints for major open source projects.',
  },
];

async function request<T>(
  baseUrl: string,
  path: string,
  options?: RequestInit
): Promise<{ data: T | null; isDemo: boolean; error?: string }> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }

    const data = (await response.json()) as T;
    return { data, isDemo: false };
  } catch (err) {
    if (
      err instanceof TypeError &&
      (err.message.includes('fetch') ||
        err.message.includes('Failed') ||
        err.message.includes('NetworkError') ||
        err.message.includes('network'))
    ) {
      return { data: null, isDemo: true };
    }
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { data: null, isDemo: false, error: message };
  }
}

export async function registerStudent(payload: RegisterPayload) {
  return request<{ message: string }>(STUDENT_SERVICE_URL, '/students/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginStudent(payload: LoginPayload) {
  return request<LoginResponse>(STUDENT_SERVICE_URL, '/students/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getStudentEvents(rollNumber: string) {
  return request<EventParticipation[]>(EVENT_SERVICE_URL, `/events/${rollNumber}`);
}
