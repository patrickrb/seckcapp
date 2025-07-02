import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createSampleEventsWithMultipleSpeakers = async () => {
  const sampleEvents = [
    {
      title: "Advanced Web Application Security",
      description: "Deep dive into modern web security vulnerabilities and defense strategies. Learn about OWASP Top 10, secure coding practices, and how to implement security controls in web applications.",
      shortDescription: "Deep dive into modern web security vulnerabilities and defense strategies.",
      eventDate: Timestamp.fromDate(new Date('2025-07-15T18:30:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-07-15T20:30:00Z')),
      location: "Innovation Campus, Overland Park",
      address: "13200 Metcalf Ave, Overland Park, KS 66213",
      virtualLink: "",
      isVirtual: false,
      isHybrid: true,
      maxAttendees: 100,
      registrationDeadline: Timestamp.fromDate(new Date('2025-07-14T23:59:59Z')),
      categoryId: "web-security",
      sponsorLinks: {
        "Google": "https://www.google.com",
        "Microsoft": "https://www.microsoft.com"
      },
      sponsorOrder: ["Google", "Microsoft"],
      speakerNames: ["Sarah Chen", "Mike Rodriguez"],
      speakerTitle: "Security Engineers",
      speakerBio: "Sarah and Mike have over 15 years combined experience in web application security.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Web Security", "OWASP", "Penetration Testing"],
      prerequisites: "Basic understanding of web technologies (HTML, CSS, JavaScript)",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      eventUrl: "https://seckc.org/meetings/2025-07-15/",
      isPublished: true,
      isFeatured: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      rsvpCount: 47,
      isBookmarked: false
    },
    {
      title: "Incident Response Workshop",
      description: "Hands-on workshop covering incident response procedures and tools. Learn how to detect, analyze, and respond to security incidents effectively.",
      shortDescription: "Hands-on workshop covering incident response procedures and tools.",
      eventDate: Timestamp.fromDate(new Date('2025-07-22T18:00:00Z')),
      endDate: Timestamp.fromDate(new Date('2025-07-22T21:00:00Z')),
      location: "UMKC Campus, Kansas City",
      address: "5100 Rockhill Rd, Kansas City, MO 64110",
      virtualLink: "",
      isVirtual: false,
      isHybrid: false,
      maxAttendees: 50,
      registrationDeadline: Timestamp.fromDate(new Date('2025-07-21T23:59:59Z')),
      categoryId: "incident-response",
      sponsorLinks: {
        "CrowdStrike": "https://www.crowdstrike.com",
        "SecKC": "https://seckc.org"
      },
      sponsorOrder: ["SecKC", "CrowdStrike"],
      speakerNames: ["Jennifer Park", "David Thompson", "Alex Johnson"],
      speakerTitle: "DFIR Specialists",
      speakerBio: "Team of certified incident responders with experience in handling major security breaches.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Incident Response", "Digital Forensics", "Malware Analysis"],
      prerequisites: "Basic knowledge of networking and operating systems",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      eventUrl: "https://seckc.org/meetings/2025-07-22/",
      isPublished: true,
      isFeatured: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      rsvpCount: 35,
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
      sponsorLinks: {
        "Amazon": "https://aws.amazon.com",
        "Azure": "https://azure.microsoft.com"
      },
      sponsorOrder: ["Azure", "Amazon"],
      speakerNames: ["Jessica Williams"],
      speakerTitle: "Cloud Security Architect",
      speakerBio: "Jessica specializes in cloud security architecture and has helped organizations migrate securely to the cloud.",
      speakerImageUrl: "",
      eventImageUrl: "",
      topics: ["Cloud Security", "AWS", "Azure", "GCP"],
      prerequisites: "Basic understanding of cloud computing concepts",
      materialsUrl: "",
      recordingUrl: "",
      slidesUrl: "",
      eventUrl: "https://seckc.org/meetings/2025-08-05/",
      isPublished: true,
      isFeatured: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      rsvpCount: 89,
      isBookmarked: false
    }
  ];

  try {
    for (const event of sampleEvents) {
      const docRef = await addDoc(collection(db, 'events'), event);
      console.log(`Created event: ${event.title} with ID: ${docRef.id}`);
    }
    console.log('Sample events with multiple speakers created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating sample events:', error);
    return false;
  }
};

// Make it available globally
(window as any).createSampleEventsWithMultipleSpeakers = createSampleEventsWithMultipleSpeakers;