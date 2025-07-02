import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createSampleEvents = async () => {
  const sampleEvents = [
    {
      title: "Advanced Web Application Security",
      description: "Deep dive into modern web security vulnerabilities and defense strategies. Learn about OWASP Top 10, secure coding practices, and how to implement security controls in web applications.",
      shortDescription: "Deep dive into modern web security vulnerabilities and defense strategies.",
      eventDate: Timestamp.fromDate(new Date('2025-07-15T18:30:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-07-15T20:30:00Z')),
      location: "Innovation Campus, Overland Park",
      virtualLink: "",
      isVirtual: false,
      isHybrid: true,
      maxAttendees: 100,
      registrationDeadline: Timestamp.fromDate(new Date('2025-07-14T23:59:59Z')),
      categoryId: "web-security",
      difficultyLevel: "advanced",
      speakerName: "Sarah Chen",
      speakerTitle: "Senior Security Engineer at Google",
      speakerBio: "Sarah has over 10 years of experience in web application security and has contributed to several open-source security tools.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Web Security", "OWASP", "Penetration Testing"],
      prerequisites: "Basic understanding of web technologies (HTML, CSS, JavaScript)",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      isPublished: true,
      isFeatured: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      attendeeCount: 47,
      isBookmarked: false
    },
    {
      title: "Incident Response Workshop",
      description: "Hands-on workshop covering incident response procedures and tools. Learn how to detect, analyze, and respond to security incidents effectively.",
      shortDescription: "Hands-on workshop covering incident response procedures and tools.",
      eventDate: Timestamp.fromDate(new Date('2025-07-22T18:00:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-07-22T21:00:00Z')),
      location: "UMKC Campus, Kansas City",
      virtualLink: "",
      isVirtual: false,
      isHybrid: false,
      maxAttendees: 50,
      registrationDeadline: Timestamp.fromDate(new Date('2025-07-21T23:59:59Z')),
      categoryId: "incident-response",
      difficultyLevel: "intermediate",
      speakerName: "Mike Rodriguez",
      speakerTitle: "DFIR Specialist at CrowdStrike",
      speakerBio: "Mike is a certified incident responder with experience in handling major security breaches and malware analysis.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Incident Response", "Digital Forensics", "Malware Analysis"],
      prerequisites: "Basic knowledge of networking and operating systems",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      isPublished: true,
      isFeatured: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      attendeeCount: 35,
      isBookmarked: false
    },
    {
      title: "Cloud Security Fundamentals",
      description: "Essential security considerations for cloud computing environments. Cover AWS, Azure, and GCP security best practices.",
      shortDescription: "Essential security considerations for cloud computing environments.",
      eventDate: Timestamp.fromDate(new Date('2025-08-05T18:30:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-08-05T20:00:00Z')),
      location: "",
      virtualLink: "https://zoom.us/j/123456789",
      isVirtual: true,
      isHybrid: false,
      maxAttendees: 200,
      registrationDeadline: Timestamp.fromDate(new Date('2025-08-04T23:59:59Z')),
      categoryId: "cloud-security",
      difficultyLevel: "beginner",
      speakerName: "Jennifer Park",
      speakerTitle: "Cloud Security Architect at Microsoft",
      speakerBio: "Jennifer specializes in cloud security architecture and has helped organizations migrate securely to the cloud.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Cloud Security", "AWS", "Azure", "GCP"],
      prerequisites: "Basic understanding of cloud computing concepts",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      isPublished: true,
      isFeatured: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      attendeeCount: 89,
      isBookmarked: false
    },
    {
      title: "Social Engineering Defense",
      description: "Understanding and defending against social engineering attacks. Learn to recognize manipulation tactics and implement awareness programs.",
      shortDescription: "Understanding and defending against social engineering attacks.",
      eventDate: Timestamp.fromDate(new Date('2025-06-10T18:30:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-06-10T20:30:00Z')),
      location: "Sprint Campus, Overland Park",
      virtualLink: "",
      isVirtual: false,
      isHybrid: false,
      maxAttendees: 75,
      registrationDeadline: Timestamp.fromDate(new Date('2025-06-09T23:59:59Z')),
      categoryId: "social-engineering",
      difficultyLevel: "intermediate",
      speakerName: "David Thompson",
      speakerTitle: "Security Awareness Consultant",
      speakerBio: "David has conducted social engineering assessments for Fortune 500 companies and specializes in security awareness training.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Social Engineering", "Security Awareness", "Human Factors"],
      prerequisites: "None - suitable for all experience levels",
      materialsUrl: "",
      recordingUrl: "https://youtube.com/watch?v=example",
      slidesUrl: "",
      isPublished: true,
      isFeatured: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      attendeeCount: 52,
      isBookmarked: false
    }
  ];

  try {
    for (const event of sampleEvents) {
      const docRef = await addDoc(collection(db, 'events'), event);
      console.log(`Created event: ${event.title} with ID: ${docRef.id}`);
    }
    console.log('Sample events created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating sample events:', error);
    return false;
  }
};

// Simple function to call from browser console
(window as any).createSampleEvents = createSampleEvents;