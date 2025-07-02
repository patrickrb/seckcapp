import React from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel,
  IonItem,
  IonAvatar,
  IonBadge
} from '@ionic/react';
import { 
  shield, 
  calendar, 
  location, 
  time, 
  people,
  checkmark,
  notifications
} from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const nextEvent = {
    title: "Advanced Web Application Security",
    date: "July 15, 2025",
    time: "6:30 PM - 8:30 PM",
    location: "Innovation Campus, Overland Park",
    speaker: "Sarah Chen",
    attendees: 47,
    description: "Deep dive into modern web security vulnerabilities and defense strategies.",
    topics: ["OWASP Top 10", "Authentication", "API Security"]
  };

  const handleRSVP = () => {
    // RSVP functionality would integrate with backend
    console.log('RSVP clicked');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IonIcon icon={shield} />
              SECKC
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IonIcon icon={shield} />
                SECKC
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="home-container">
          {/* Welcome Section */}
          <IonCard className="welcome-card">
            <IonCardHeader>
              <IonCardTitle color="primary">Welcome to SECKC</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Join Kansas City's premier cybersecurity community. Connect with professionals, learn cutting-edge techniques, and advance your security career.</p>
            </IonCardContent>
          </IonCard>

          {/* Next Event Preview */}
          <IonCard className="event-preview-card">
            <IonCardHeader>
              <div className="event-header">
                <IonCardTitle>Next Event</IonCardTitle>
                <IonBadge color="success">
                  <IonIcon icon={notifications} size="small" />
                  New
                </IonBadge>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <h2 className="event-title">{nextEvent.title}</h2>
              
              <IonGrid className="event-details">
                <IonRow>
                  <IonCol size="12">
                    <IonItem lines="none" className="event-detail-item">
                      <IonIcon icon={calendar} slot="start" color="primary" />
                      <IonLabel>
                        <h3>{nextEvent.date}</h3>
                        <p>{nextEvent.time}</p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
                
                <IonRow>
                  <IonCol size="12">
                    <IonItem lines="none" className="event-detail-item">
                      <IonIcon icon={location} slot="start" color="primary" />
                      <IonLabel>
                        <h3>{nextEvent.location}</h3>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem lines="none" className="event-detail-item">
                      <IonAvatar slot="start">
                        <div className="speaker-avatar">{nextEvent.speaker.charAt(0)}</div>
                      </IonAvatar>
                      <IonLabel>
                        <h3>Speaker: {nextEvent.speaker}</h3>
                        <p>Security Architect</p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem lines="none" className="event-detail-item">
                      <IonIcon icon={people} slot="start" color="primary" />
                      <IonLabel>
                        <h3>{nextEvent.attendees} attending</h3>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <div className="event-description">
                <p>{nextEvent.description}</p>
              </div>

              <div className="event-topics">
                <h4>Topics Covered:</h4>
                <div className="topics-chips">
                  {nextEvent.topics.map((topic, index) => (
                    <IonChip key={index} color="primary" outline>
                      <IonLabel>{topic}</IonLabel>
                    </IonChip>
                  ))}
                </div>
              </div>

              <div className="rsvp-section">
                <IonButton 
                  expand="block" 
                  size="large" 
                  color="success"
                  onClick={handleRSVP}
                  className="rsvp-button"
                >
                  <IonIcon icon={checkmark} slot="start" />
                  RSVP for This Event
                </IonButton>
                <p className="rsvp-note">Free for all members • Light refreshments provided</p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Quick Stats */}
          <IonCard className="stats-card">
            <IonCardContent>
              <IonGrid>
                <IonRow className="stats-row">
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>500+</h2>
                      <p>Members</p>
                    </div>
                  </IonCol>
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>50+</h2>
                      <p>Events</p>
                    </div>
                  </IonCol>
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>12+</h2>
                      <p>Years</p>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;