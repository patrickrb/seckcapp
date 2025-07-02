import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonBadge
} from '@ionic/react';
import {
  library,
  book,
  desktop,
  school,
  shield,
  code,
  hammer,
  globe,
  document,
  play,
  download,
  star,
  time,
  chevronForward,
  openOutline
} from 'ionicons/icons';
import './Resources.css';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'course' | 'tool' | 'document' | 'video' | 'website';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  duration?: string;
  url: string;
  isFree: boolean;
  author?: string;
}

const Resources: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  const resources: Resource[] = [
    {
      id: 1,
      title: "OWASP Top 10 - 2021",
      description: "The most critical security risks to web applications",
      type: "document",
      category: "Web Security",
      difficulty: "Beginner",
      rating: 4.9,
      url: "https://owasp.org/Top10/",
      isFree: true,
      author: "OWASP Foundation"
    },
    {
      id: 2,
      title: "Burp Suite Community Edition",
      description: "Essential toolkit for web application security testing",
      type: "tool",
      category: "Penetration Testing",
      difficulty: "Intermediate",
      rating: 4.8,
      url: "https://portswigger.net/burp/communitydownload",
      isFree: true,
      author: "PortSwigger"
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description: "Complete course covering cybersecurity basics and advanced topics",
      type: "course",
      category: "General Security",
      difficulty: "Beginner",
      rating: 4.7,
      duration: "40 hours",
      url: "https://www.coursera.org/learn/cyber-security-fundamentals",
      isFree: false,
      author: "University of Maryland"
    },
    {
      id: 4,
      title: "Nmap Network Discovery",
      description: "Network exploration and security auditing tool",
      type: "tool",
      category: "Network Security",
      difficulty: "Intermediate",
      rating: 4.9,
      url: "https://nmap.org/",
      isFree: true,
      author: "Nmap Project"
    },
    {
      id: 5,
      title: "Incident Response Playbook",
      description: "Step-by-step guide for handling security incidents",
      type: "document",
      category: "Incident Response",
      difficulty: "Advanced",
      rating: 4.6,
      url: "https://www.sans.org/white-papers/",
      isFree: true,
      author: "SANS Institute"
    },
    {
      id: 6,
      title: "Ethical Hacking Course",
      description: "Learn penetration testing and ethical hacking techniques",
      type: "video",
      category: "Penetration Testing",
      difficulty: "Advanced",
      rating: 4.5,
      duration: "25 hours",
      url: "https://www.udemy.com/course/ethical-hacking/",
      isFree: false,
      author: "Zaid Sabih"
    },
    {
      id: 7,
      title: "Wireshark Network Analyzer",
      description: "World's foremost network protocol analyzer",
      type: "tool",
      category: "Network Security",
      difficulty: "Intermediate",
      rating: 4.8,
      url: "https://www.wireshark.org/",
      isFree: true,
      author: "Wireshark Foundation"
    },
    {
      id: 8,
      title: "Cloud Security Best Practices",
      description: "Comprehensive guide to securing cloud environments",
      type: "document",
      category: "Cloud Security",
      difficulty: "Intermediate",
      rating: 4.4,
      url: "https://aws.amazon.com/security/",
      isFree: true,
      author: "AWS Security"
    }
  ];

  const categories = [
    { name: "Web Security", icon: globe, count: 2 },
    { name: "Penetration Testing", icon: hammer, count: 3 },
    { name: "Network Security", icon: shield, count: 2 },
    { name: "Incident Response", icon: document, count: 1 },
    { name: "Cloud Security", icon: desktop, count: 1 },
    { name: "General Security", icon: school, count: 1 }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return school;
      case 'tool': return hammer;
      case 'document': return document;
      case 'video': return play;
      case 'website': return globe;
      default: return library;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'medium';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSegment = selectedSegment === 'all' ||
                          (selectedSegment === 'free' && resource.isFree) ||
                          (selectedSegment === 'tools' && resource.type === 'tool') ||
                          (selectedSegment === 'courses' && resource.type === 'course');
    
    const matchesSearch = resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesSegment && matchesSearch;
  });

  const openResource = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="/images/bob.png" 
                alt="SecKC Logo" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '4px' 
                }}
              />
              Resources
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src="/images/bob.png" 
                  alt="SecKC Logo" 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '6px' 
                  }}
                />
                Resources
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="resources-container">
          {/* Search Bar */}
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search resources, tools, courses..."
            showClearButton="focus"
          />

          {/* Segment Control */}
          <IonSegment
            value={selectedSegment}
            onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
            className="resources-segment"
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="free">
              <IonLabel>Free</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="tools">
              <IonLabel>Tools</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="courses">
              <IonLabel>Courses</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Categories Overview */}
          <IonCard className="categories-card">
            <IonCardHeader>
              <IonCardTitle>Categories</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  {categories.map((category, index) => (
                    <IonCol size="6" key={index}>
                      <div className="category-item">
                        <IonIcon icon={category.icon} color="primary" size="large" />
                        <h4>{category.name}</h4>
                        <IonBadge color="medium">{category.count}</IonBadge>
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Featured Resources */}
          <IonAccordionGroup className="featured-section">
            <IonAccordion value="featured">
              <IonItem slot="header">
                <IonIcon icon={star} color="warning" slot="start" />
                <IonLabel>
                  <h2>Featured Resources</h2>
                  <p>Hand-picked by SECKC community</p>
                </IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                {resources.filter(r => r.rating >= 4.7).slice(0, 3).map(resource => (
                  <IonCard key={resource.id} className="featured-resource-card">
                    <IonCardContent>
                      <div className="featured-resource-header">
                        <IonIcon icon={getTypeIcon(resource.type)} color="primary" />
                        <div>
                          <h3>{resource.title}</h3>
                          <p>{resource.author}</p>
                        </div>
                        <div className="rating">
                          <IonIcon icon={star} color="warning" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <p className="featured-description">{resource.description}</p>
                      <div className="featured-meta">
                        <IonChip color={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </IonChip>
                        {resource.isFree && (
                          <IonChip color="success">Free</IonChip>
                        )}
                        {resource.duration && (
                          <IonChip color="medium" outline>
                            <IonIcon icon={time} size="small" />
                            {resource.duration}
                          </IonChip>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </IonAccordion>
          </IonAccordionGroup>

          {/* Resources List */}
          <IonList className="resources-list">
            {filteredResources.map((resource) => (
              <IonCard key={resource.id} className="resource-card">
                <IonCardContent>
                  <div className="resource-header">
                    <div className="resource-type">
                      <IonIcon icon={getTypeIcon(resource.type)} color="primary" />
                      <span className="type-label">{resource.type.toUpperCase()}</span>
                    </div>
                    <div className="resource-rating">
                      <IonIcon icon={star} color="warning" size="small" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>

                  <h3 className="resource-title">{resource.title}</h3>
                  {resource.author && (
                    <p className="resource-author">by {resource.author}</p>
                  )}
                  <p className="resource-description">{resource.description}</p>

                  <div className="resource-meta">
                    <IonChip color="primary" outline>
                      {resource.category}
                    </IonChip>
                    <IonChip color={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </IonChip>
                    {resource.isFree && (
                      <IonChip color="success">Free</IonChip>
                    )}
                    {resource.duration && (
                      <IonChip color="medium" outline>
                        <IonIcon icon={time} size="small" />
                        {resource.duration}
                      </IonChip>
                    )}
                  </div>

                  <div className="resource-actions">
                    <IonButton
                      expand="block"
                      fill="outline"
                      onClick={() => openResource(resource.url)}
                    >
                      <IonIcon 
                        icon={resource.type === 'tool' ? download : openOutline} 
                        slot="start" 
                      />
                      {resource.type === 'tool' ? 'Download' : 'Open Resource'}
                      <IonIcon icon={chevronForward} slot="end" />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>

          {filteredResources.length === 0 && (
            <div className="no-resources">
              <IonIcon icon={library} size="large" color="medium" />
              <h3>No resources found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;